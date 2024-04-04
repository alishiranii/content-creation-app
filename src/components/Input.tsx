"use client"
import { InputProps } from '@/types/components';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import React, { ReactElement, ReactNode } from 'react';



function Input({Icon,placeHolder,inpType,register,name,error}:InputProps) {
  const [parent]=useAutoAnimate()
  return (
    <div ref={parent} >
    <div className='w-full relative'>
        <input {...register(name)} className='w-full text-white caret-green-500 focus:outline-green-500 bg-[#1A1D21] border border-[#363A3D] pl-12 p-3 rounded placeholder:text-[#9B9C9E]' placeholder={placeHolder} type={inpType}/>
        <div className=' text-[#686B6E] text-xl centered-left'>
          {Icon}
        </div>
        
    </div>
     {/* @ts-ignore: Unreachable code error */}
    {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  )
}

export default Input