import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import MixedFraction from '../components/mixedFraction';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import QuestionDescription from '../components/questionDescription';
import Intro from '../components/intro';
import Proceed from '../components/proceed';
import DragDropPizza from '../components/dragDropPizza';
import { goToStep, nextStep } from '../utils/helper';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {fraction1, fraction2} = gameStateRef.current.questions.question1;
  const { step } = gameStateRef.current.state1;

  return (
    <div className="">
      <Header fraction1={fraction1} fraction2={fraction2} type='addition' version={step === 1 ? 1 : 2} />
      {
        step === 1 ?
          <Step1 sendAdminMessage={sendAdminMessage} />
        : step === 2 ?
          <Step2 sendAdminMessage={sendAdminMessage} />
        : <Step3 sendAdminMessage={sendAdminMessage} />
      }
    </div>
  );
}

const Step1 = ({ sendAdminMessage }: BaseProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.questions.question1;
  return (
    <div className="flex gap-8 flex-col w-full">
      <Intro text="Let us solve this by imagining a pizza factory! Suppose the question is nothing but a pizza order like this" />
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-lime-200 py-4 mb-[2px] border-2 font-extrabold border-gray-800 px-4 rounded-t-lg text-center">
          Total Order
        </div>
        <div className="flex items-center justify-center gap-4 p-8 border-2 border-gray-800 rounded-b-lg">
          <div className="flex items-center gap-2 border-2 border-gray-800 rounded-lg">
            <span className='bg-pink-100 rounded-lg'>
              <MixedFraction
                whole={fraction1.whole}
                numerator={fraction1.numerator}
                denominator={fraction1.denominator}
                className='text-xl font-extrabold p-3'
              />
            </span>
            <p className='text-xl font-extrabold p-3'>Pepperoni Pizza</p>
          </div>  
          <span className="text-5xl font-bold text-red-500">+</span>
          <div className="flex items-center gap-2 rounded-lg border-2 border-gray-800">
            <span className='bg-yellow-100 rounded-lg'>
              <MixedFraction
                whole={fraction2.whole}
                numerator={fraction2.numerator}
                denominator={fraction2.denominator}
                className='text-xl font-extrabold p-3'
              />
            </span>
            <p className='text-xl font-extrabold p-3'>Cheese Pizza</p>
          </div>
        </div>
      </div>
      <Button onClick={() => goToStep(1, setGameStateRef, 2)} className='m-2 mx-auto bg-lime-500 hover:bg-lime-600 max-w-3xl'>Next Step</Button>
    </div>
  );
};

const Step2 = ({ sendAdminMessage }: BaseProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.questions.question1;
  const complete = gameStateRef.current.state1.step2Substep
  const {question1description, question2description} = gameStateRef.current.state1;

  const setComplete = (value: number) => {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step2Substep: value } }));
  }

  useEffect(() => {
    if (complete === 1) {
      sendAdminMessage('agent', "Awesome! The pepperoni pizza order is complete, let's revise the mushroom pizza order too");
    } else if (complete === 2) {
      sendAdminMessage('agent', "That is done! You have revised the order, now click on next to move to the most important step");
    }
  }, [complete])

  return (
    <div className="flex p-8 gap-8 flex-col w-full">
    {/* explaining inital pizzas */}
    { complete >= 0 &&
        <QuestionDescription 
          showFirstRow={question1description.showFirstRow}
          setShowFirstRow={(value) => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, question1description: { ...prev.state1.question1description, showFirstRow: value } } }))}
          showSecondRow={question1description.showSecondRow}
          setShowSecondRow={(value) => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, question1description: { ...prev.state1.question1description, showSecondRow: value } } }))}
          showThirdRow={question1description.showThirdRow}
          setShowThirdRow={(value) => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, question1description: { ...prev.state1.question1description, showThirdRow: value } } }))}

          inputWhole={question1description.inputWhole}
          setInputWhole={(value) => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, question1description: { ...prev.state1.question1description, inputWhole: value } } }))}
          inputNumerator={question1description.inputNumerator}
          setInputNumerator={(value) => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, question1description: { ...prev.state1.question1description, inputNumerator: value } } }))}
          inputDenominator={question1description.inputDenominator}
          setInputDenominator={(value) => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, question1description: { ...prev.state1.question1description, inputDenominator: value } } }))}

          whole={fraction1.whole} 
          numerator={fraction1.numerator} 
          denominator={fraction1.denominator} 
          pizzaName='pepperoni' 
          color='pink' 

          onComplete={() => {
            setComplete(1)
            setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, question2description: { ...prev.state1.question2description, showFirstRow: true } } }))
          }} 
        />
    }
    { complete >= 1 &&
        <QuestionDescription 
          showFirstRow={question2description.showFirstRow}
          setShowFirstRow={(value) => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, question2description: { ...prev.state1.question2description, showFirstRow: value } } }))}
          showSecondRow={question2description.showSecondRow}
          setShowSecondRow={(value) => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, question2description: { ...prev.state1.question2description, showSecondRow: value } } }))}
          showThirdRow={question2description.showThirdRow}
          setShowThirdRow={(value) => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, question2description: { ...prev.state1.question2description, showThirdRow: value } } }))}

          inputWhole={question2description.inputWhole}
          setInputWhole={(value) => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, question2description: { ...prev.state1.question2description, inputWhole: value } } }))}
          inputNumerator={question2description.inputNumerator}
          setInputNumerator={(value) => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, question2description: { ...prev.state1.question2description, inputNumerator: value } } }))}
          inputDenominator={question2description.inputDenominator}
          setInputDenominator={(value) => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, question2description: { ...prev.state1.question2description, inputDenominator: value } } }))}

          whole={fraction2.whole} 
          numerator={fraction2.numerator} 
          denominator={fraction2.denominator} 
          pizzaName='mushroom' 
          color='yellow' 

          onComplete={() => setComplete(2)} 
        />
    }
    { complete >= 2 && 
      <div className='flex flex-col gap-4 max-w-3xl mx-auto'>
          <p className='text-xl font-bold'>
            Perfect, let's rearrange the wholes and slices to add them together
          </p>
          <Button 
            onClick={() => goToStep(1, setGameStateRef, 3)}
            className='bg-lime-500 text-white font-bold w-16 mx-auto hover:bg-lime-600'
        >
          Next
          </Button> 
      </div>
    }

    </div>
  )
};

const Step3 = ({ sendAdminMessage }: BaseProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.questions.question1;
  const {screen} = gameStateRef.current;

  // States for first section (Whole Pizzas)
  const [wholeInputs, setWholeInputs] = useState({
    input: '',
    isCorrect: false
  });

  // States for second section (Slices)
  const [fractionInputs, setFractionInputs] = useState({
    numerator: '',
    denominator: '',
    isCorrect: false
  });

  // States for mixed form
  const [mixedFormInputs, setMixedFormInputs] = useState({
    whole: '',
    numerator: '',
    denominator: '',
    isCorrect: false
  });

  // Computed values
  const totalWhole = fraction1.whole + fraction2.whole;
  const totalNumerator = fraction1.numerator + fraction2.numerator;
  const commonDenominator = fraction1.denominator; // Assuming same denominator

  // Handle whole number input
  const handleWholeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isCorrect = parseInt(value) === totalWhole;
    setWholeInputs({
      input: value,
      isCorrect
    });
  };

  // Handle fraction inputs
  const handleFractionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newInputs = {
      ...fractionInputs,
      [name]: value
    };

    const isCorrect = 
      parseInt(newInputs.numerator || '0') === totalNumerator && 
      parseInt(newInputs.denominator || '0') === commonDenominator;

    setFractionInputs({
      ...newInputs,
      isCorrect
    });
  };

  // Handle mixed form inputs
  const handleMixedFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newInputs = {
      ...mixedFormInputs,
      [name]: value
    };

    const isCorrect = 
      parseInt(newInputs.whole || '0') === totalWhole &&
      parseInt(newInputs.numerator || '0') === totalNumerator &&
      parseInt(newInputs.denominator || '0') === commonDenominator;

    setMixedFormInputs({
      ...newInputs,
      isCorrect
    });
  };

  const [showMixedForm, setShowMixedForm] = useState(false);

  // Show proceed button when mixed form is correct
  const showProceedButton = mixedFormInputs.isCorrect;

  const handleProceed = () => {
    setGameStateRef(prev => ({ ...prev, screen: 2 }));
  };

  // Helper function to get input style based on correctness
  const getInputStyle = (isCorrect: boolean, baseColor: string) => {
    return `border-2 text-center font-extrabold rounded p-2 w-12 h-12 text-xl
      ${isCorrect ? 'border-green-600 bg-green-100' : `border-${baseColor}-600`}
      ${isCorrect ? 'text-green-800' : `text-${baseColor}-800`}`;
  };

  return (
    <div className='flex flex-col pb-16'>
      <DragDropPizza
        fraction1={{
          whole: fraction1.whole,
          numerator: fraction1.numerator,
          denominator: fraction1.denominator,
          color: 'pink',
          name: 'Pepperoni'
        }}
        fraction2={{
          whole: fraction2.whole,
          numerator: fraction2.numerator,
          denominator: fraction2.denominator,
          color: 'yellow',
          name: 'Mushroom'
        }}
        onComplete={() => {
          setShowMixedForm(true);
        }}
      />

      {showMixedForm && (
        <div className='flex flex-col py-16 items-center gap-4 p-4 bg-green-100'>
            <div className="text-3xl font-bold text-green-600">Write in mixed form</div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="whole"
                value={mixedFormInputs.whole}
                onChange={handleMixedFormChange}
                className={getInputStyle(mixedFormInputs.isCorrect, 'green')}
                placeholder="?"
              />
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  name="numerator"
                  value={mixedFormInputs.numerator}
                  onChange={handleMixedFormChange}
                  className={getInputStyle(mixedFormInputs.isCorrect, 'pink')}
                  placeholder="?"
                />
                <div className="w-full my-2 h-[2px] bg-green-800" />
                <input
                  type="text"
                  name="denominator"
                  value={mixedFormInputs.denominator}
                  onChange={handleMixedFormChange}
                  className={getInputStyle(mixedFormInputs.isCorrect, 'pink')}
                  placeholder="?"
                />
              </div>
            </div>
        </div>
      )}

      {showProceedButton && <Proceed onComplete={handleProceed} />}
    </div>
  );
};


