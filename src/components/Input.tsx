"use client"
import React, { ReactElement } from 'react';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';

interface InputProps{
  Icon:ReactElement,
  placeHolder:string,
  inpType:string,
  register:UseFormRegister<FieldValues>,
  name:string,
  error?:string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
}

function Input({Icon,placeHolder,inpType,register,name,error}:InputProps) {
  return (
    <>
    <div className='w-full relative'>
        <input {...register(name)} className='w-full text-white caret-green-500 focus:outline-green-500 bg-[#1A1D21] border border-[#363A3D] pl-12 p-3 rounded placeholder:text-[#9B9C9E]' placeholder={placeHolder} type={inpType}/>
        <div className=' text-[#686B6E] text-xl centered-left'>
          {Icon}
        </div>
        
    </div>
    {error && <p className='text-red-500 text-sm'>{error}</p>}
    </>
  )
}

export default Input