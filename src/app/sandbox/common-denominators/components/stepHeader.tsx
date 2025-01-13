interface StepModuleProps {
    color: string;
    stepNumber: number;
    numerator1?: number;
    denominator1?: number;
    numerator2?: number;
    denominator2?: number;
    stepText: string;
  }
  
  export const StepModule = ({ color, stepNumber, numerator1, denominator1, numerator2, denominator2, stepText }: StepModuleProps) => {
    return (
      <div className="flex items-stretch justify-center gap-4">
        <div className={`bg-white border-8 px-6 py-2 flex items-center justify-center`} style={{ color: color, borderColor: color }}>
          <span className="text-2xl font-bold">STEP {stepNumber}</span>
        </div>
        <div className={`flex-1 border-8 flex items-center max-w-xl`} style={{ color: color, borderColor: color, backgroundColor: color }}>
          <h2 className="text-white text-2xl font-bold flex items-center gap-4 mx-auto">
            <div className="flex items-center justify-center my-2 mx-2">
              <span>{stepText}</span>
            </div>
            {numerator1 && denominator1 && numerator2 && denominator2 &&
              <>
                <div className="bg-white text-black px-3 py-1 inline-flex flex-col items-center">
                  <span>{numerator1}</span>
                  <div className="w-3 h-px bg-black" />
                  <span>{denominator1}</span>
                </div>
                &
                <div className="bg-white text-black px-3 py-1 inline-flex flex-col items-center">
                  <span>{numerator2}</span>
                  <div className="w-3 h-px bg-black" />
                  <span>{denominator2}</span>
                </div>
              </>
            }
          </h2>
        </div>
      </div>
    )
  }