import Image from 'next/image';

export default function Intro({ text }: { text: string }) {
  return (
    <div className='flex max-w-5xl mx-auto items-center gap-4 mt-10'>
      <Image src='/img/pizzaboy.png' alt='pizzaboy' width={100} height={100} />
      <div className='flex flex-col p-8 border-2 border-black text-3xl rounded-lg'>
        {text}
      </div>
    </div>
  )
}