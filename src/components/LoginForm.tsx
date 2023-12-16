"use client";
import React from "react";
import Input from "./Input";
import { TfiEmail, TfiLock } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@supabase/supabase-js";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <Input
            error={errors.email?.message}
            name="email"
            register={register}
            inpType={"email"}
            Icon={<TfiEmail />}
            placeHolder={"Email"}
          />
          <Input
            error={errors.password?.message}
            name="password"
            register={register}
            inpType={"password"}
            Icon={<TfiLock />}
            placeHolder={"Password"}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-white flex items-center gap-3">
            <input
              className="checkbox border-[#363A3D] bg-[#1A1D21]"
              name="check"
              type="checkbox"
            />
            <label htmlFor="check">Remember me</label>
          </div>
          <Link href={"/login"} className="gr-text">
            Forgot Password?
          </Link>
        </div>
        <button className="btn hover:bg-[#b7f09ce4] bg-[#B6F09C]" type="submit">
          Log in
        </button>
      </form>
      <div className="divider divider-neutral py-5">OR</div>
      <div className="flex gap-10 justify-between items-center">
        <button onClick={()=>supabase.auth.signInWithOAuth({ provider: "google" ,options: { redirectTo: "/" }})} className="w-full flex items-center justify-center gap-3 font-semibold p-4 rounded-lg bg-[#1A1D21] text-gray-400 hover:bg-[#1A1D21] border-[#1A1D21]">
          <FcGoogle size={25} /> Google
        </button>
        <button onClick={()=>supabase.auth.signInWithOAuth({ provider: "github" ,options: { redirectTo: "http://localhost:3000" }})} className="w-full flex items-center justify-center gap-3 font-semibold p-4 rounded-lg bg-[#1A1D21] text-gray-400 hover:bg-[#1A1D21] border-[#1A1D21]">
          <BsGithub size={25} /> Github
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
