export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Airline {
  code: string;
  name: string;
  logo?: string;
}

export interface FlightSegment {
  airline: Airline;
  flightNumber: string;
  departure: {
    airport: Airport;
    time: string;
    terminal?: string;
  };
  arrival: {
    airport: Airport;
    time: string;
    terminal?: string;
  };
  duration: string;
  aircraft: string;
}

export interface Flight {
  id: string;
  segments: FlightSegment[];
  price: {
    total: number;
    currency: string;
    breakdown?: {
      base: number;
      taxes: number;
      fees: number;
    };
  };
  duration: string;
  stops: number;
  baggage: {
    carry: string;
    checked: string;
  };
  refundable: boolean;
  changeable: boolean;
  class: 'economy' | 'premium' | 'business' | 'first';
}

export interface SearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  class: 'economy' | 'premium' | 'business' | 'first';
}

export interface FilterOptions {
  airlines: string[];
  priceRange: {
    min: number;
    max: number;
  };
  stops: number[];
}

export type SortOption = 'price' | 'duration' | 'departure';