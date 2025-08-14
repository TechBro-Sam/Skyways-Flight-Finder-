import React, { useState, useEffect, useMemo } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { FlightCard } from '@/components/FlightCard';
import { FlightFilters } from '@/components/FlightFilters';
import { FlightDetails } from '@/components/FlightDetails';
import { FlightSorting } from '@/components/FlightSorting';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Flight, SearchParams, FilterOptions, SortOption } from '@/types/flight';
import { generateMockFlights } from '@/data/mockData';

export const FlightSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('price');
  const [filters, setFilters] = useState<FilterOptions>({
    airlines: [],
    priceRange: { min: 100, max: 2000 },
    stops: []
  });

  // Handle search
  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setSearchParams(params);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockFlights = generateMockFlights(params.from, params.to, params.departureDate);
    setFlights(mockFlights);
    setLoading(false);
  };

  // Filter and sort flights
  const filteredAndSortedFlights = useMemo(() => {
    const filtered = flights.filter(flight => {
      // Price filter
      if (flight.price.total < filters.priceRange.min || flight.price.total > filters.priceRange.max) {
        return false;
      }
      
      // Airline filter
      if (filters.airlines.length > 0 && !filters.airlines.includes(flight.segments[0].airline.code)) {
        return false;
      }
      
      // Stops filter
      if (filters.stops.length > 0 && !filters.stops.includes(flight.stops)) {
        return false;
      }
      
      return true;
    });

    // Sort flights
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price.total - b.price.total;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'departure':
          return new Date(a.segments[0].departure.time).getTime() - 
                 new Date(b.segments[0].departure.time).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [flights, filters, sortBy]);

  const handleViewDetails = (flight: Flight) => {
    setSelectedFlight(flight);
    setShowDetails(true);
  };

  const handleBackToSearch = () => {
    setSearchParams(null);
    setFlights([]);
    setSelectedFlight(null);
  };

  const clearFilters = () => {
    setFilters({
      airlines: [],
      priceRange: { min: 100, max: 2000 },
      stops: []
    });
  };

  // Show search form if no search has been made
  if (!searchParams) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="container mx-auto pt-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SkyWays Flight Finder
            </h1>
            <p className="text-muted-foreground text-lg">
              Find and compare flights across airlines
            </p>
          </div>
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToSearch}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                New Search
              </Button>
              <div className="text-sm text-muted-foreground">
                {searchParams.from} → {searchParams.to} • {searchParams.departureDate}
              </div>
            </div>
            {!loading && flights.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {filteredAndSortedFlights.length} of {flights.length} flights
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <LoadingSpinner message="Searching for the best flights..." />
        ) : flights.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No flights found. Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:hidden mb-4">
                <FlightFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={clearFilters}
                  isMobile={true}
                />
              </div>
              <div className="hidden lg:block">
                <FlightFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={clearFilters}
                />
              </div>
            </div>

            {/* Flight Results */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  Available Flights ({filteredAndSortedFlights.length})
                </h2>
                <FlightSorting sortBy={sortBy} onSortChange={setSortBy} />
              </div>

              <div className="space-y-4">
                {filteredAndSortedFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              {filteredAndSortedFlights.length === 0 && flights.length > 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No flights match your current filters. Try adjusting them.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Flight Details Modal */}
      <FlightDetails
        flight={selectedFlight}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </div>
  );
};