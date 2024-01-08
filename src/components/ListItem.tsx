import Image from 'next/image'
import React from 'react';
import Instagram from "@/assets/logos/instagram.svg"

function ListItem() {
  return (
    <div className='btn btn-ghost justify-start text-white'>
      <Image src={Instagram} width={30} alt='logo' className='drop'/>
      <p className='font-medium'>Project number1</p>
    </div>
  )
}

export default ListItem