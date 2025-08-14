import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plane, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { SearchParams } from '@/types/flight';
import { mockAirports } from '@/data/mockData';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  loading?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading = false }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  });
  
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchParams.from || !searchParams.to || !departureDate) return;
    
    const params: SearchParams = {
      ...searchParams,
      departureDate: format(departureDate, 'yyyy-MM-dd'),
      returnDate: returnDate ? format(returnDate, 'yyyy-MM-dd') : undefined
    };
    
    onSearch(params);
  };

  const swapCities = () => {
    setSearchParams(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Plane className="h-6 w-6 text-blue-600" />
          Find Your Perfect Flight
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Button
              type="button"
              variant={!isRoundTrip ? "default" : "outline"}
              size="sm"
              onClick={() => setIsRoundTrip(false)}
            >
              One Way
            </Button>
            <Button
              type="button"
              variant={isRoundTrip ? "default" : "outline"}
              size="sm"
              onClick={() => setIsRoundTrip(true)}
            >
              Round Trip
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* From */}
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Select onValueChange={(value) => setSearchParams(prev => ({ ...prev, from: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Departure city" />
                </SelectTrigger>
                <SelectContent>
                  {mockAirports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.city} ({airport.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Swap Button */}
            <div className="flex items-end justify-center lg:justify-start">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={swapCities}
                className="mb-2"
              >
                ⇄
              </Button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Select onValueChange={(value) => setSearchParams(prev => ({ ...prev, to: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Destination city" />
                </SelectTrigger>
                <SelectContent>
                  {mockAirports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.city} ({airport.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Departure Date */}
            <div className="space-y-2">
              <Label>Departure</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !departureDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departureDate ? format(departureDate, "MMM dd, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            {isRoundTrip && (
              <div className="space-y-2">
                <Label>Return</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !returnDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "MMM dd, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      disabled={(date) => date < (departureDate || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Passengers */}
            <div className="space-y-2">
              <Label>Passengers</Label>
              <Select onValueChange={(value) => setSearchParams(prev => ({ ...prev, passengers: parseInt(value) }))}>
                <SelectTrigger>
                  <SelectValue placeholder="1 passenger" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'passenger' : 'passengers'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Class */}
            <div className="space-y-2">
              <Label>Class</Label>
              <Select onValueChange={(value: 'economy' | 'premium' | 'business' | 'first') => setSearchParams(prev => ({ ...prev, class: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Economy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="premium">Premium Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            size="lg"
            disabled={loading || !searchParams.from || !searchParams.to || !departureDate}
          >
            <Search className="mr-2 h-4 w-4" />
            {loading ? 'Searching Flights...' : 'Search Flights'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};