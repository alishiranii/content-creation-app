"use client";
import React, { useState } from "react";
import Input from "./Input";
import { TfiEmail, TfiLock } from "react-icons/tfi";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



const SignupSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
    cpassword:z.string()
}).refine((data)=>data.password == data.cpassword ,{
  message: "Passwords don't match",
  path: ["cpassword"],
})


function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(SignupSchema) });
  const [checked,setChecked]=useState(false);

  const router=useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )


  const onSubmit: SubmitHandler<FieldValues> = async (d) => {
    await supabase.auth.signUp({email: d.email,
    password: d.password})
    const {data:{session}}=await supabase.auth.getSession();
    if(session){
      toast.success('Your account has been created.')
      router.refresh();
    }else{
      console.error("there was an error in signing the user in!");
    }
  };
  




  return (
    <div className="flex h-full flex-col lg:px-20 py-14 lg:py-0 mx-auto justify-center">
      <div className="flex mb-12 flex-col gap-5">
        <h1 className="text-white text-5xl">
          Hello, <span className="gr-text font-semibold">Mikotaj!</span>
        </h1>
        <p className="text-gray-500">
        Connect with others by joining an existing workspace or create a new one to collaborate with your team.
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
          <Input
            error={errors.cpassword?.message}
            name="cpassword"
            register={register}
            inpType={"password"}
            Icon={<TfiLock />}
            placeHolder={"Confirm Password"}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-white flex items-center gap-3">
            <input
              className="checkbox border-[#363A3D] bg-[#1A1D21]"
              name="check"
              type="checkbox"
              checked={checked}
              onClick={()=>setChecked(!checked)}
            />
            <label htmlFor="check">I agree with <span className="gr-text">Terms and conditions</span></label>
          </div>
          <button className={`btn hover:bg-[#b7f09ce4] bg-[#B6F09C] ${!checked && "btn-disabled !text-gray-300"} ${isSubmitting && "!btn-disabled"}`} type="submit">
          {isSubmitting ? <span className="loading loading-spinner loading-md text-gray-200"></span> : "Sign Up"}
        </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
