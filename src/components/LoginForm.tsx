import React from "react";
import Input from "./Input";
import { TfiEmail, TfiLock } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";

function LoginForm() {
  return (
    <div className="flex h-full flex-col lg:px-20 py-14 lg:py-0 mx-auto justify-center">
      <div className="flex mb-12 flex-col gap-5">
        <h1 className="text-white text-5xl">
          Let&apos;s get <span className="gr-text">creative!</span>
        </h1>
        <p className="text-gray-500">
          Log in to Artificium to start creating magic.
        </p>
      </div>
      <form className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <Input inpType={"email"} Icon={<TfiEmail />} placeHolder={"Email"} />
          <Input
            inpType={"password"}
            Icon={<TfiLock />}
            placeHolder={"Password"}
          />
        </div>
        <div className="flex justify-between items-center">
        <div className="text-white flex items-center gap-3">
          <input className="checkbox border-[#363A3D] bg-[#1A1D21]" name="check" type="checkbox" />
          <label htmlFor="check">Remember me</label>
        </div>
        <Link href={"/login"} className="gr-text">Forgot Password?</Link>
        </div>
        <button className="btn hover:bg-[#b7f09ce4] bg-[#B6F09C]" type="submit">Log in</button>
      </form>
      <div className="divider divider-neutral py-5">OR</div>
      <div className="flex gap-10 justify-between items-center">
        <button className="w-full flex items-center justify-center gap-3 font-semibold p-4 rounded-lg bg-[#1A1D21] text-gray-400 hover:bg-[#1A1D21] border-[#1A1D21]">
          <FcGoogle size={25} /> Google
        </button>
        <button className="w-full flex items-center justify-center gap-3 font-semibold p-4 rounded-lg bg-[#1A1D21] text-gray-400 hover:bg-[#1A1D21] border-[#1A1D21]">
         <BsGithub size={25}/> Github
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
