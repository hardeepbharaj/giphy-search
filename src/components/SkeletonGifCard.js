const SkeletonGifCard = () => {
    return (
      <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
        <div className="relative aspect-square">
          <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
        </div>
        <div className="p-3 w-32">
          <div className="h-4 bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>
    );
};

export default SkeletonGifCard;