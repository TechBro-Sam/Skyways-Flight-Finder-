import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plane, Clock, Users, MapPin } from 'lucide-react';
import { Flight } from '@/types/flight';
import { format } from 'date-fns';

interface FlightCardProps {
  flight: Flight;
  onViewDetails: (flight: Flight) => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onViewDetails }) => {
  const segment = flight.segments[0];
  const departureTime = format(new Date(segment.departure.time), 'HH:mm');
  const arrivalTime = format(new Date(segment.arrival.time), 'HH:mm');
  
  const getStopsText = (stops: number) => {
    if (stops === 0) return 'Direct';
    if (stops === 1) return '1 Stop';
    return `${stops} Stops`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Flight Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Plane className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-lg">{segment.airline.name}</span>
              </div>
              <Badge variant="outline">{segment.flightNumber}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Departure */}
              <div className="text-center md:text-left">
                <div className="text-2xl font-bold">{departureTime}</div>
                <div className="text-sm text-muted-foreground">
                  {segment.departure.airport.code}
                </div>
                <div className="text-xs text-muted-foreground">
                  {segment.departure.airport.city}
                </div>
              </div>
              
              {/* Duration & Stops */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{flight.duration}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {getStopsText(flight.stops)}
                </div>
                <div className="w-full bg-muted h-0.5 mt-2 relative">
                  <div className="absolute inset-y-0 left-0 w-full bg-blue-200"></div>
                  <Plane className="h-3 w-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600" />
                </div>
              </div>
              
              {/* Arrival */}
              <div className="text-center md:text-right">
                <div className="text-2xl font-bold">{arrivalTime}</div>
                <div className="text-sm text-muted-foreground">
                  {segment.arrival.airport.code}
                </div>
                <div className="text-xs text-muted-foreground">
                  {segment.arrival.airport.city}
                </div>
              </div>
            </div>
          </div>
          
          {/* Price & Action */}
          <div className="text-center lg:text-right lg:min-w-[200px]">
            <div className="mb-3">
              <div className="text-3xl font-bold text-green-600">
                ${flight.price.total}
              </div>
              <div className="text-sm text-muted-foreground">
                per person
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 justify-center lg:justify-end mb-3">
              {flight.refundable && (
                <Badge variant="secondary" className="text-xs">Refundable</Badge>
              )}
              {flight.changeable && (
                <Badge variant="secondary" className="text-xs">Changeable</Badge>
              )}
            </div>
            
            <Button 
              onClick={() => onViewDetails(flight)}
              className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700"
            >
              View Details
            </Button>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{flight.baggage.carry} carry-on</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{flight.baggage.checked} checked</span>
          </div>
          <div>Aircraft: {segment.aircraft}</div>
        </div>
      </CardContent>
    </Card>
  );
};