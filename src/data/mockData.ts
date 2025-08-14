import { Flight, Airport, Airline } from '@/types/flight';

export const mockAirports: Airport[] = [
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
  { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'USA' },
  { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'UK' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan' },
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
  { code: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'USA' },
  { code: 'ORD', name: 'O\'Hare International Airport', city: 'Chicago', country: 'USA' },
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', country: 'USA' }
];

export const mockAirlines: Airline[] = [
  { code: 'AA', name: 'American Airlines' },
  { code: 'UA', name: 'United Airlines' },
  { code: 'DL', name: 'Delta Air Lines' },
  { code: 'BA', name: 'British Airways' },
  { code: 'LH', name: 'Lufthansa' },
  { code: 'AF', name: 'Air France' },
  { code: 'JL', name: 'Japan Airlines' },
  { code: 'SQ', name: 'Singapore Airlines' },
  { code: 'EK', name: 'Emirates' }
];

export const generateMockFlights = (from: string, to: string, date: string): Flight[] => {
  const fromAirport = mockAirports.find(a => a.code === from || a.city.toLowerCase().includes(from.toLowerCase()));
  const toAirport = mockAirports.find(a => a.code === to || a.city.toLowerCase().includes(to.toLowerCase()));
  
  if (!fromAirport || !toAirport) return [];

  const flights: Flight[] = [];
  
  for (let i = 0; i < 15; i++) {
    const airline = mockAirlines[Math.floor(Math.random() * mockAirlines.length)];
    const departureHour = 6 + Math.floor(Math.random() * 16);
    const departureMinute = Math.floor(Math.random() * 4) * 15;
    const flightDuration = 2 + Math.floor(Math.random() * 12);
    const arrivalHour = (departureHour + flightDuration) % 24;
    const stops = Math.random() < 0.6 ? 0 : Math.random() < 0.8 ? 1 : 2;
    
    const basePrice = 200 + Math.random() * 800;
    const taxes = basePrice * 0.15;
    const fees = 25 + Math.random() * 50;
    
    const flight: Flight = {
      id: `${airline.code}${Math.floor(Math.random() * 9000) + 1000}`,
      segments: [{
        airline,
        flightNumber: `${airline.code} ${Math.floor(Math.random() * 9000) + 1000}`,
        departure: {
          airport: fromAirport,
          time: `${date}T${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}:00`,
          terminal: Math.random() < 0.7 ? `T${Math.floor(Math.random() * 3) + 1}` : undefined
        },
        arrival: {
          airport: toAirport,
          time: `${date}T${arrivalHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}:00`,
          terminal: Math.random() < 0.7 ? `T${Math.floor(Math.random() * 3) + 1}` : undefined
        },
        duration: `${flightDuration}h ${Math.floor(Math.random() * 60)}m`,
        aircraft: ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A350'][Math.floor(Math.random() * 4)]
      }],
      price: {
        total: Math.round(basePrice + taxes + fees),
        currency: 'USD',
        breakdown: {
          base: Math.round(basePrice),
          taxes: Math.round(taxes),
          fees: Math.round(fees)
        }
      },
      duration: `${flightDuration}h ${Math.floor(Math.random() * 60)}m`,
      stops,
      baggage: {
        carry: '1 x 8kg',
        checked: stops === 0 ? '1 x 23kg' : '2 x 23kg'
      },
      refundable: Math.random() < 0.3,
      changeable: Math.random() < 0.7,
      class: 'economy'
    };
    
    flights.push(flight);
  }
  
  return flights.sort((a, b) => a.price.total - b.price.total);
};