"use client"
import React, { ReactElement } from 'react';

interface InputProps{
  Icon:ReactElement,
  placeHolder:string,
  inpType:string
}

function Input({Icon,placeHolder,inpType}:InputProps) {
  return (
    <div className='w-full relative'>
        <input className='w-full text-white caret-green-500 focus:outline-green-500 bg-[#1A1D21] border border-[#363A3D] pl-12 p-3 rounded placeholder:text-[#9B9C9E]' placeholder={placeHolder} type={inpType}/>
        <div className=' text-[#686B6E] text-xl centered-left'>
          {Icon}
        </div>
    </div>
  )
}

export default Input