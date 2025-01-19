import React from 'react';
import { cn } from '@/lib/utils';

interface RedBoxProps {
  children: React.ReactNode;
  className?: string;
}

const RedBox: React.FC<RedBoxProps> = ({ children, className='' }) => {
  return (
    <div className={cn('h-full bg-[#FF497C] p-2 inline-flex flex-col items-center', className)}>
      <div className='bg-white text-[#FF497C] text-xl p-3 font-bold inline-flex flex-col items-center'>
        {children}
      </div>
    </div>
  );
};    

export default RedBox;
