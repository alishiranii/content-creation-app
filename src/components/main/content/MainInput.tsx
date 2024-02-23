import React from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { FiSend } from "react-icons/fi";

function MainInput() {
  return (
    <form className="w-full relative p-3 flex items-center shadow-lg mt-auto">
      <input
        className="p-5 pl-14 rounded-xl w-full bg-[#0D0F10] placeholder:text-[#686B6E] placeholder:text-sm text-white"
        placeholder="You can ask me anything!"
      />
      <button
        type="button"
        className="absolute left-4 btn btn-ghost btn-circle text-2xl text-[#686B6E]">
        <CiMicrophoneOn />
      </button>
      <button
        type="submit"
        className="absolute right-8 btn btn-ghost text-2xl text-white">
        <FiSend />
      </button>
    </form>
  );
}

export default MainInput;
