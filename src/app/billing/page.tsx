import PricingCard from "@/components/billing/PricingCard";
import React from "react";

function page() {
  return (
    <div className="bg-[#131619] min-h-screen flex items-center justify-center">
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
              Designed for business teams like yours
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Here at Flowbite we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
            </p>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            <PricingCard
              title={"Starter"}
              description={
                "Best option for personal use & for your next project."
              }
              price={3}
              features={["unlimited chat with our chatbot", "get 500 coins"]}
            />
            <PricingCard
              title={"Company"}
              description={
                "Relevant for multiple users, extended & premium support."
              }
              price={10}
              features={["unlimited chat with our chatbot", "get 1600 coins"]}
            />
            <PricingCard
              title={"Enterprise"}
              description={
                "Best for large scale uses and extended redistribution rights."
              }
              price={25}
              features={["unlimited chat with our chatbot", "get 4000 coins"]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
