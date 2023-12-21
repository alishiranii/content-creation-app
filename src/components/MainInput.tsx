import React from 'react'
import { CiMicrophoneOn } from "react-icons/ci";


function MainInput() {
  return (
    <div className='w-full relative p-3 flex items-center'>
       <input className='p-5 pl-14 rounded-xl w-full bg-[#0D0F10] placeholder:text-[#686B6E] placeholder:text-sm text-white' placeholder='You can ask me anything!'/>
       <button className='absolute left-0 btn btn-ghost btn-circle text-2xl text-[#686B6E]'>
        <CiMicrophoneOn/>
       </button>
    </div>
  )
}

export default MainInput