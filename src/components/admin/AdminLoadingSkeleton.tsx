import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const AdminLoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Card with table */}
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-20" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Table header skeleton */}
            <div className="grid grid-cols-5 gap-4 pb-4 border-b">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20 ml-auto" />
            </div>

            {/* Table rows skeleton */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-5 gap-4 py-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
