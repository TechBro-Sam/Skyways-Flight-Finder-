import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter, X } from 'lucide-react';
import { FilterOptions } from '@/types/flight';
import { mockAirlines } from '@/data/mockData';

interface FlightFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
}

export const FlightFiltersContent: React.FC<FlightFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const handleAirlineChange = (airlineCode: string, checked: boolean) => {
    const updatedAirlines = checked
      ? [...filters.airlines, airlineCode]
      : filters.airlines.filter(code => code !== airlineCode);
    
    onFiltersChange({
      ...filters,
      airlines: updatedAirlines
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: {
        min: values[0],
        max: values[1]
      }
    });
  };

  const handleStopsChange = (stops: number, checked: boolean) => {
    const updatedStops = checked
      ? [...filters.stops, stops]
      : filters.stops.filter(s => s !== stops);
    
    onFiltersChange({
      ...filters,
      stops: updatedStops
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={[filters.priceRange.min, filters.priceRange.max]}
              onValueChange={handlePriceRangeChange}
              max={2000}
              min={100}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange.min}</span>
              <span>${filters.priceRange.max}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Airlines */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Airlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAirlines.map((airline) => (
              <div key={airline.code} className="flex items-center space-x-2">
                <Checkbox
                  id={airline.code}
                  checked={filters.airlines.includes(airline.code)}
                  onCheckedChange={(checked) => 
                    handleAirlineChange(airline.code, checked as boolean)
                  }
                />
                <Label htmlFor={airline.code} className="text-sm cursor-pointer">
                  {airline.name}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stops */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Stops</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { value: 0, label: 'Direct' },
              { value: 1, label: '1 Stop' },
              { value: 2, label: '2+ Stops' }
            ].map((stop) => (
              <div key={stop.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`stops-${stop.value}`}
                  checked={filters.stops.includes(stop.value)}
                  onCheckedChange={(checked) => 
                    handleStopsChange(stop.value, checked as boolean)
                  }
                />
                <Label htmlFor={`stops-${stop.value}`} className="text-sm cursor-pointer">
                  {stop.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const FlightFilters: React.FC<FlightFiltersProps & { isMobile?: boolean }> = ({
  isMobile = false,
  ...props
}) => {
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Filter Flights</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FlightFiltersContent {...props} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return <FlightFiltersContent {...props} />;
};