import React from 'react';
import { Loader2, Plane } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Searching for flights..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative mb-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <Plane className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600" />
      </div>
      <p className="text-muted-foreground text-center">{message}</p>
    </div>
  );
};