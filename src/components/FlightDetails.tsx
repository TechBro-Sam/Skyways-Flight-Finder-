import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
  Plane, 
  Clock, 
  MapPin, 
  Luggage, 
  CreditCard, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  Building
} from 'lucide-react';
import { Flight } from '@/types/flight';
import { format } from 'date-fns';

interface FlightDetailsProps {
  flight: Flight | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FlightDetails: React.FC<FlightDetailsProps> = ({
  flight,
  isOpen,
  onClose
}) => {
  if (!flight) return null;

  const segment = flight.segments[0];
  const departureTime = format(new Date(segment.departure.time), 'HH:mm');
  const arrivalTime = format(new Date(segment.arrival.time), 'HH:mm');
  const departureDate = format(new Date(segment.departure.time), 'MMM dd, yyyy');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-blue-600" />
            Flight Details - {segment.flightNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Flight Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{segment.airline.name}</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ${flight.price.total}
                  </div>
                  <div className="text-sm text-muted-foreground">per person</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{departureTime}</div>
                  <div className="font-medium">{segment.departure.airport.code}</div>
                  <div className="text-sm text-muted-foreground">
                    {segment.departure.airport.name}
                  </div>
                  {segment.departure.terminal && (
                    <Badge variant="outline" className="mt-1">
                      Terminal {segment.departure.terminal}
                    </Badge>
                  )}
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-4 w-4" />
                    <span>{flight.duration}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {flight.stops === 0 ? 'Direct' : `${flight.stops} stop(s)`}
                  </div>
                  <div className="w-full bg-muted h-1 relative rounded">
                    <div className="absolute inset-y-0 left-0 w-full bg-blue-200 rounded"></div>
                    <Plane className="h-3 w-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600" />
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold">{arrivalTime}</div>
                  <div className="font-medium">{segment.arrival.airport.code}</div>
                  <div className="text-sm text-muted-foreground">
                    {segment.arrival.airport.name}
                  </div>
                  {segment.arrival.terminal && (
                    <Badge variant="outline" className="mt-1">
                      Terminal {segment.arrival.terminal}
                    </Badge>
                  )}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Date:</span> {departureDate}
                </div>
                <div>
                  <span className="text-muted-foreground">Aircraft:</span> {segment.aircraft}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Breakdown */}
          {flight.price.breakdown && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Price Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Fare</span>
                    <span>${flight.price.breakdown.base}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>${flight.price.breakdown.taxes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fees</span>
                    <span>${flight.price.breakdown.fees}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">${flight.price.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Baggage Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Luggage className="h-4 w-4" />
                Baggage Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">Carry-on Baggage</div>
                    <div className="text-sm text-muted-foreground">{flight.baggage.carry}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">Checked Baggage</div>
                    <div className="text-sm text-muted-foreground">{flight.baggage.checked}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Policies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Booking Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    {flight.refundable ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <div className="font-medium">Refundable</div>
                      <div className="text-sm text-muted-foreground">
                        {flight.refundable ? 
                          'Full refund available up to 24h before departure' : 
                          'Non-refundable ticket'
                        }
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {flight.changeable ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <div className="font-medium">Changes Allowed</div>
                      <div className="text-sm text-muted-foreground">
                        {flight.changeable ? 
                          'Changes allowed with fees' : 
                          'No changes permitted'
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="text-sm text-muted-foreground">
                  <p>• Check-in opens 24 hours before departure</p>
                  <p>• Arrive at airport 2 hours before international flights</p>
                  <p>• Valid passport required for international travel</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Book This Flight
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};