import { Fraction } from "../game-state";

export const FractionComponent = ({ fraction, size = 'small' }: { fraction: Fraction, size?: 'large' | 'small' }) => {
  return (
    <div className={`flex flex-col items-center ${size === 'large' ? 'w-24' : 'w-8'}`}>
      <div className={`${size === 'large' ? 'text-5xl' : 'text-2xl'} font-bold`}>{fraction.numerator}</div>
      <div className={`border-t-4 border-black ${size === 'large' ? 'w-20' : 'w-8'}`}></div>
      <div className={`${size === 'large' ? 'text-5xl' : 'text-2xl'} font-bold`}>{fraction.denominator}</div>
    </div>
  )
}