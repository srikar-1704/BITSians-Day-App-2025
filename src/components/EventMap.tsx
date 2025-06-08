import { useState, useEffect, useRef } from 'react';
import { Event } from '../types/Event';
import { EventPopup } from './EventPopup';

interface EventMapProps {
  events: Event[];
}

// Mapbox component using their GL JS library
export const EventMap = ({ events }: EventMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Load Mapbox GL JS
    const loadMapbox = async () => {
      if (!mapContainerRef.current) return;

      // Load Mapbox GL JS and CSS
      if (!window.mapboxgl) {
        // Load CSS
        const link = document.createElement('link');
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // Load JS
        const script = document.createElement('script');
        script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!mapContainerRef.current || !window.mapboxgl) return;

      // Replace with your Mapbox access token
      window.mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN_HERE';

      const map = new window.mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/light-v11', // Light theme
        center: [0, 20], // Center of the world
        zoom: 1.5,
        projection: 'globe' // Nice globe view
      });

      // Add navigation controls
      map.addControl(new window.mapboxgl.NavigationControl(), 'top-right');

      map.on('load', () => {
        setMapLoaded(true);
        mapRef.current = map;
        
        // Add atmosphere for globe view
        map.setFog({
          color: 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.02,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.6
        });
      });
    };

    loadMapbox();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Add markers when events change
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !events.length) return;

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.mapbox-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add new markers
    events
      .filter(event => event.lat && event.lng)
      .forEach(event => {
        // Create marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'mapbox-marker';
        markerElement.style.cssText = `
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: ${event.color || '#666666'};
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: transform 0.2s ease;
        `;

        // Add hover effect
        markerElement.addEventListener('mouseenter', () => {
          markerElement.style.transform = 'scale(1.2)';
        });
        markerElement.addEventListener('mouseleave', () => {
          markerElement.style.transform = 'scale(1)';
        });

        // Add click handler
        markerElement.addEventListener('click', () => {
          setSelectedEvent(event);
        });

        // Create and add marker to map
        new window.mapboxgl.Marker(markerElement)
          .setLngLat([event.lng!, event.lat!])
          .addTo(mapRef.current);
      });

    // Fit map to show all markers
    if (events.length > 0) {
      const validEvents = events.filter(event => event.lat && event.lng);
      if (validEvents.length > 0) {
        const bounds = new window.mapboxgl.LngLatBounds();
        validEvents.forEach(event => {
          bounds.extend([event.lng!, event.lat!]);
        });
        mapRef.current.fitBounds(bounds, { padding: 50 });
      }
    }
  }, [events, mapLoaded]);

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full rounded-lg shadow-lg" />

      {/* Loading State */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {/* Event Popup */}
      {selectedEvent && (
        <EventPopup
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-xs">
        <h3 className="font-semibold text-gray-800 mb-2">Regions</h3>
        <div className="space-y-1">
          {Object.entries(
            events.reduce((acc, event) => {
              if (event.geography && event.color) {
                acc[event.geography] = event.color;
              }
              return acc;
            }, {} as Record<string, string>)
          ).map(([geography, color]) => (
            <div key={geography} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-sm text-gray-700">{geography}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mapbox Attribution (Required) */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white bg-opacity-75 px-2 py-1 rounded">
        © <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer">Mapbox</a>
      </div>
    </div>
  );
};