// Free geocoding using OpenStreetMap Nominatim API
export const geocodeCity = async (city: string): Promise<{ lat: number; lng: number }> => {
  try {
    // Using OpenStreetMap Nominatim API (completely free)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'Alumni-Events-App/1.0' // Required by Nominatim
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }
    
    const data = await response.json();
    
    if (data.length === 0) {
      throw new Error('City not found');
    }
    
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };
  } catch (error) {
    console.error(`Error geocoding ${city}:`, error);
    
    // Fallback: Try with country if not already included
    if (!city.includes(',')) {
      try {
        return await geocodeCity(`${city}, World`);
      } catch (fallbackError) {
        throw error;
      }
    }
    
    throw error;
  }
};

// Alternative geocoding using Mapbox (if you want to use the same provider)
export const geocodeCityMapbox = async (city: string, accessToken: string): Promise<{ lat: number; lng: number }> => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${accessToken}&limit=1`
    );
    
    if (!response.ok) {
      throw new Error('Mapbox geocoding request failed');
    }
    
    const data = await response.json();
    
    if (!data.features || data.features.length === 0) {
      throw new Error('City not found');
    }
    
    const [lng, lat] = data.features[0].center;
    
    return { lat, lng };
  } catch (error) {
    console.error(`Error geocoding ${city} with Mapbox:`, error);
    throw error;
  }
};

// Helper function to create map bounds from events
export const getMapBounds = (events: Array<{ lat?: number; lng?: number }>) => {
  const validEvents = events.filter(event => event.lat && event.lng);
  
  if (validEvents.length === 0) {
    return null;
  }
  
  const lats = validEvents.map(event => event.lat!);
  const lngs = validEvents.map(event => event.lng!);
  
  return {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs)
  };
};

// Rate limiting helper for geocoding requests
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Batch geocoding with rate limiting (for Nominatim's 1 request per second limit)
export const batchGeocode = async (cities: string[]): Promise<Array<{ city: string; lat: number; lng: number } | null>> => {
  const results: Array<{ city: string; lat: number; lng: number } | null> = [];
  
  for (let i = 0; i < cities.length; i++) {
    try {
      const coords = await geocodeCity(cities[i]);
      results.push({ city: cities[i], ...coords });
      
      // Rate limiting: wait 1 second between requests for Nominatim
      if (i < cities.length - 1) {
        await delay(1000);
      }
    } catch (error) {
      console.warn(`Failed to geocode ${cities[i]}:`, error);
      results.push(null);
    }
  }
  
  return results;
};