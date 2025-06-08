import { useState, useEffect } from 'react';
import { Event, GEOGRAPHY_COLORS } from '../types/Event';
import { geocodeCity } from '../utils/mapUtils';

// Replace this with your actual Google Sheet ID
const SHEET_ID = '1UvLfj-Bjuqoafe6sxzYnalNrvc0FAfB5Ewc1rj2o24o';
const OPENSHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/1`;

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // Fetch data from Google Sheets via OpenSheet API
        const response = await fetch(OPENSHEET_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch events data');
        }
        
        const rawData = await response.json();
        
        // Process the data and add coordinates
        const processedEvents: Event[] = await Promise.all(
          rawData.map(async (row: any) => {
            const event: Event = {
              city: row.City || '',
              organizer: row.Organizer || '',
              email: row.Email || '',
              phone: row.Phone || '',
              geography: row.GEOGRAPHY || '',
              timeAndDate: row['Time and Date of the event'] || '',
              venueDetails: row['Venue Details'] || '',
              registrationLink: row['Registration Link'] || '',
              otherDetails: row['Other details'] || '',
              color: GEOGRAPHY_COLORS[row.GEOGRAPHY] || '#666666'
            };

            // Geocode the city to get coordinates
            try {
              const coords = await geocodeCity(event.city);
              event.lat = coords.lat;
              event.lng = coords.lng;
            } catch (geocodeError) {
              console.warn(`Failed to geocode ${event.city}:`, geocodeError);
              // Set default coordinates if geocoding fails
              event.lat = 0;
              event.lng = 0;
            }

            return event;
          })
        );

        setEvents(processedEvents);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};