import { Skeleton } from "./ui/skeleton";

function IdeasSkeletons({ count }: { count: number }) {
  const res: React.ReactNode[] = [];
  for (let index = 0; index < count; index++) {
    res.push(
      <div className="space-y-2" key={index}>
        <Skeleton className="w-full h-10 rounded-full" />
        <Skeleton className="w-3/4 h-5 rounded-full" />
        <Skeleton className="w-3/4 h-5 rounded-full" />
      </div>
    );
  }
  return <div className="p-6 space-y-6">{res}</div>;
}

export default IdeasSkeletons;
