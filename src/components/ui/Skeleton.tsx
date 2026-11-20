export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl bg-[#151922] border border-[#293241] p-4 animate-pulse">
      <div className="aspect-[4/3] w-full rounded-xl bg-[#0B0D12] mb-4" />
      <div className="h-3 w-20 bg-[#293241] rounded mb-2" />
      <div className="h-5 w-3/4 bg-[#293241] rounded mb-2" />
      <div className="h-4 w-1/2 bg-[#293241] rounded mb-4" />
      <div className="flex items-center justify-between pt-3 border-t border-[#293241]">
        <div className="h-6 w-24 bg-[#293241] rounded" />
        <div className="h-9 w-28 bg-[#293241] rounded-xl" />
      </div>
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
      <div className="aspect-square rounded-2xl bg-[#151922] border border-[#293241]" />
      <div className="space-y-5 py-4">
        <div className="h-4 w-28 bg-[#293241] rounded" />
        <div className="h-10 w-3/4 bg-[#293241] rounded" />
        <div className="h-6 w-40 bg-[#293241] rounded" />
        <div className="h-24 w-full bg-[#293241] rounded" />
        <div className="h-12 w-full bg-[#293241] rounded-xl" />
      </div>
    </div>
  );
}
