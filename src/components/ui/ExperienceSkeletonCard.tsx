import { Skeleton } from "@nextui-org/skeleton";

const ExperienceSkeletonCard = () => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <Skeleton className="rounded-lg">
        <div className="h-48 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3 mt-3">
        <Skeleton className="w-3/4 rounded-lg">
          <div className="h-4 w-3/4 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-full rounded-lg">
          <div className="h-3 w-full rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-4 w-1/4 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  );
};

export default ExperienceSkeletonCard;