import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonCard({ className = '', glow = false }) {
  return (
    <div
      className={`w-full p-0.5 bg-gradient-to-tr from-primary-dark to-accent-base rounded-lg ${
        glow
          ? 'relative before:absolute before:inset-0 before:bg-gradient-to-bl before:from-secondary-base before:to-primary-dark before:blur-[300px] before:-z-10'
          : ''
      } ${className}`}
    >
      <div className="h-full w-full bg-primary-base dark:bg-secondary-dark text-secondary-dark dark:text-primary-base rounded-lg p-4 flex flex-col">
        {/* Image/Icon Skeleton */}
        <div className="flex justify-center p-8 rounded-lg">
          <Skeleton className="h-32 w-32 rounded-lg" /> {/* Size like Image */}
        </div>

        {/* Title Skeleton */}
        <div className="flex items-center justify-center">
          <Skeleton className="h-6 w-48" /> {/* Mimicking Title */}
        </div>

        {/* Content Skeleton */}
        <div className="flex h-full items-center justify-center p-4">
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      </div>
    </div>
  )
}
