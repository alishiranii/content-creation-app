import React from 'react'

function loading() {
  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 min-h-screen w-full bg-[#131619] flex items-center justify-center'>
        <div className="loading loading-dots w-24 text-green-700"></div>
    </div>
  )
}

export default loading