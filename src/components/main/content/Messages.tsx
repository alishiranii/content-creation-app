"use client"
import { useTab } from '@/store/useStore';
import React from 'react'

function Messages() {
    const tab = useTab((state: any) => state.tab);

  return tab == "chat" && (
    <div className='mb-auto mt-10 flex flex-col gap-5'>
      <div className="chat chat-start">
        <div className="chat-bubble">
          Its over Anakin, <br />I have the high ground.
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble">You underestimate my power!</div>
      </div>
    </div>
  );
}

export default Messages