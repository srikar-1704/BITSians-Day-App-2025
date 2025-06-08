// Mapbox GL JS type definitions
declare global {
  interface Window {
    mapboxgl: {
      accessToken: string;
      Map: new (options: any) => any;
      Marker: new (element?: HTMLElement) => any;
      NavigationControl: new () => any;
      LngLatBounds: new () => any;
    };
  }
}

export {};