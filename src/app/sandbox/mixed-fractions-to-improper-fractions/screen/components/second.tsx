import { useState } from "react";
import { useGameState } from "../../state-utils";
import { Input } from "@/components/custom_ui/input";
import { Button } from "@/components/custom_ui/button";
import { ChooseHolder } from "../../components/choose-holder";


// Footer components
export const VerifyPiecesAndDivisions = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction } = gameStateRef.current.state2;
  const denominator = fraction.denominator;
  const numerator = fraction.numerator;
  const [answer, setAnswer] = useState({numLego: '', numDiv: ''});

  const verifyPiecesAndDivisions = () => {
    if (parseInt(answer.numLego) === numerator && parseInt(answer.numDiv) === denominator) {
      setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step + 1 } }));
    }
  }
  return (
    <div className="flex flex-col items-center justify-center mt-4 space-y-4">
      <div className="flex justify-center space-x-4">
        <div className="flex flex-col items-center">
          <label className="text-3xl mb-2">Number of Lego Pieces</label>
          <Input 
            type="text" 
            placeholder="?"
            className="w-12 text-center border-2 border-black text-3xl"
            value={answer.numLego}
            onChange={(e) => setAnswer(prev => ({ ...prev, numLego: e.target.value }))}
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="text-3xl mb-2">Number of Divisions</label>
          <Input 
            type="text" 
            placeholder="?"
            className="w-12 text-center border-2 border-black text-3xl"
            value={answer.numDiv}
            onChange={(e) => setAnswer(prev => ({ ...prev, numDiv: e.target.value }))}
          />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button 
          className="bg-green-500 text-white px-6 py-3 mx-2 shadow-lg text-3xl rounded-none"
          onClick={verifyPiecesAndDivisions}
        >
          VERIFY
        </Button>
      </div>
    </div>
  )
}

// export const ChooseHolder = () => {
//   const { gameStateRef, setGameStateRef } = useGameState();
//   const { denomOptions, fraction } = gameStateRef.current.state2;


//   const handleDenomOptionClick = (option: number) => {
//     if (option === fraction.denominator) {
//       setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step + 1 } }));
//     } else {
//       // TODO: Show error message
//     }
//   };


//   return (
//     <div className="flex flex-col items-center justify-center mt-4 space-y-2">
//       <div className="flex justify-center space-x-4">
//         {denomOptions.map((option, index) => (
//           <Button 
//             key={index} 
//             className="bg-blue-500 text-white px-4 py-2 text-xl rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md"
//             onClick={() => handleDenomOptionClick(option)}
//           >
//             {option}
//           </Button>
//         ))}
//       </div>
//       <div className="text-center">
//         <span className="text-3xl font-bold block mb-2">Now choose the holder</span>
//         <span className="text-2xl text-gray-600">Hint: Number of Divisions should be same as denominator</span>
//       </div>
//     </div>
//   )
// }

export const CreateBlocks = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction } = gameStateRef.current.state2;
  const denominator = fraction.denominator;
  const numerator = fraction.numerator;
  
  const [answer, setAnswer] = useState({count: '', numerator: '', denominator: ''});

  const verifyMixedFraction = () => {
    const answerNumerator = parseInt(answer.count) * parseInt(answer.numerator);
    const answerDenominator = parseInt(answer.denominator);
    if (answerNumerator === numerator && answerDenominator === denominator) {
      setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step + 1 } }));
    }
  };

  return (
    <>
      <div className="flex justify-center mt-4 items-center space-x-4">
        <span className="text-3xl">I need </span>
        <div className="text-3xl font-bold text-center">
          <Input 
              type="text" 
              value={answer.count} 
              placeholder="?"
              onChange={(e) => setAnswer(prev => ({ ...prev, count: e.target.value }))}
              className="w-12 text-3xl text-center border-2 border-black"
            />
        </div>
        <span className="text-3xl"> legos X size </span>
        <div className="text-3xl font-bold text-center">
          <Input 
            type="text" 
            value={answer.numerator} 
            placeholder="?"
            onChange={(e) => setAnswer(prev => ({ ...prev, numerator: e.target.value }))} 
            className="w-12 text-center border-2 border-black"
          />
          <div className="w-full h-px bg-black my-2" />
          <Input 
            type="text" 
            value={answer.denominator}
            placeholder="?"
            onChange={(e) => setAnswer(prev => ({ ...prev, denominator: e.target.value }))}
            className="w-12 text-center border-2 border-black"
          />
        </div>
        <span className="text-3xl"> to create </span>
        <span className="text-3xl font-bold text-center w-6">
          <span>{numerator}</span>
            <div className="w-full h-px bg-black my-1" />
          <span>{denominator}</span>
        </span>
      </div>

      <div className="flex justify-center mt-4">
        <Button className="bg-pink-400 text-white px-6 py-3 mx-2 shadow-lg text-xl rounded-none" onClick={verifyMixedFraction}>
          CREATE
        </Button>
      </div>
    </>
  )
}