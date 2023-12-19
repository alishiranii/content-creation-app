import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Banner from "@/assets/banner1.png";
import SignupForm from '@/components/SignupForm';

function page() {
  return (
    <div className='bg-[#131619] min-h-screen w-screen'>
        <div className="flex flex-col lg:flex-row justify-between gap-2">
        {/* Login form */}
        <div className="lg:w-1/2  p-5 lg:pl-10 lg:py-10 flex flex-col justify-between">
          <Link href={"/"} className="w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
            >
              <path
                d="M23.0838 8.6578L32.6099 27.7157C33.8235 30.1435 32.0586 33 29.345 33H23.0838M23.0838 8.6578L20.2649 3.0184C18.9197 0.327197 15.0803 0.327199 13.7351 3.01841L1.39008 27.7157C0.176548 30.1435 1.94143 33 4.65496 33H10.9162M23.0838 8.6578L17 14.7434M10.9162 33H23.0838M10.9162 33L4.83249 26.9145M23.0838 33L10.9162 20.8289M17 14.7434L32.5136 30.2615M17 14.7434L10.9162 20.8289M1.48642 30.2615L4.83249 26.9145M4.83249 26.9145L10.9162 20.8289"
                stroke="url(#paint0_linear_301_294)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_301_294"
                  x1="1"
                  y1="33"
                  x2="33"
                  y2="1"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#82DBF7" />
                  <stop offset="1" stop-color="#B6F09C" />
                </linearGradient>
              </defs>
            </svg>
          </Link>
          <SignupForm />
        <p className="text-gray-500">Already have an account?<Link href={"/login"} className="gr-text"> Log in</Link></p>  
        </div>

        {/* image */}
        <div className="lg:w-1/2 hidden lg:block">
          <Image
            className="max-w-full ml-auto max-h-screen object-cover rounded-l-3xl"
            src={Banner}
            alt="banner"
          />
        </div>
      </div>
    </div>
  )
}

export default page