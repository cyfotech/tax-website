import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="rounded-3xl border-2 border-[#172554]/10 bg-white dark:bg-[#172554] p-8 animate-pulse shadow-sm">
      <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/15 mb-6" />
      <div className="h-6 w-2/3 bg-[#172554]/20 rounded-xl mb-3" />
      <div className="h-4 w-full bg-[#172554]/10 rounded-lg mb-2" />
      <div className="h-4 w-4/5 bg-[#172554]/10 rounded-lg" />
    </div>
  );
};

export const ImageSkeleton: React.FC<{ aspectRatio?: string }> = ({ aspectRatio = 'aspect-video' }) => {
  return (
    <div className={`w-full ${aspectRatio} rounded-3xl bg-[#172554]/5 border-2 border-[#172554]/10 animate-pulse flex items-center justify-center`}>
      <div className="w-10 h-10 rounded-full bg-[#2563EB]/20" />
    </div>
  );
};

export const PageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-6xl mx-auto space-y-12 bg-[#FFFFFF] dark:bg-[#0B1220]">
      <div className="space-y-4 max-w-xl mx-auto text-center animate-pulse pt-8">
        <div className="h-4 w-32 bg-[#2563EB]/20 rounded-full mx-auto" />
        <div className="h-10 w-full bg-[#172554]/15 rounded-2xl" />
        <div className="h-5 w-4/5 bg-[#172554]/10 rounded-xl mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
};
