import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl bg-[#151922] border border-[#293241]">
      <div className="w-14 h-14 rounded-2xl bg-[#0B0D12] border border-[#293241] flex items-center justify-center text-[#4F8CFF] mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold font-heading text-white mb-2">{title}</h3>
      <p className="text-sm text-[#A5ADBA] max-w-md mb-6">{description}</p>
      {action}
    </div>
  );
}
