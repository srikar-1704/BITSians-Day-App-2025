export interface Event {
  city: string;
  organizer: string;
  email: string;
  phone: string;
  geography: string;
  timeAndDate: string;
  venueDetails: string;
  registrationLink: string;
  otherDetails: string;
  // Computed fields for map display
  lat?: number;
  lng?: number;
  color?: string;
}

export interface GeographyColors {
  [key: string]: string;
}

export const GEOGRAPHY_COLORS: GeographyColors = {
  'North America': '#FF6B6B',
  'South America': '#4ECDC4',
  'Europe': '#45B7D1',
  'Asia': '#96CEB4',
  'Africa': '#FFEAA7',
  'Oceania': '#DDA0DD',
  'Middle East': '#FFB347',
  // Add more as needed
};