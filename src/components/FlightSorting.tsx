import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SortOption } from '@/types/flight';
import { ArrowUpDown } from 'lucide-react';

interface FlightSortingProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const FlightSorting: React.FC<FlightSortingProps> = ({
  sortBy,
  onSortChange
}) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <Select value={sortBy} onValueChange={(value: SortOption) => onSortChange(value)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price">Lowest Price</SelectItem>
          <SelectItem value="duration">Shortest Duration</SelectItem>
          <SelectItem value="departure">Earliest Departure</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};