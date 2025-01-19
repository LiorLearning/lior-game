interface StepHeaderProps {
  step: number;
  title: string;
}

export const StepHeader = ({ step, title }: StepHeaderProps) => (
  <div className="flex items-center gap-4 h-14">
    <div className="border-2 border-[#FF497C] px-6 flex items-center h-full">
      <span className="text-[#FF497C] font-bold text-xl">
        STEP {step}
      </span>
    </div>
    <div className="bg-[#FF497C] px-6 flex items-center h-full">
      <span className="text-white font-bold text-xl">{title}</span>
    </div>
  </div>
) 