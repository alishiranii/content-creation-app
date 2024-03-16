"use client";
import Input from "@/components/Input";
import Instagram from "@/components/mockups/Instagram";
import { useTab } from "@/store/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TbFileDescription, TbPrompt } from "react-icons/tb";
import { z } from "zod";

const createSchema = z.object({
  prompt: z
    .string()
    .min(6, { message: "Prompt must be at least 6 chars" })
    .max(77, { message: "Prompt should be less than 77 chars" }),
});

function Create() {
  const tab = useTab((state: any) => state.tab);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(createSchema) });

  const onSubmit: SubmitHandler<FieldValues> = async (d) => {
    console.log(d);
  };

  return (
    tab == "create" && (
      <div>
        <div className="flex flex-col lg:flex-row justify-around items-center gap-5 p-5">
          <form
            className="flex flex-col max-w-lg w-full glass p-5 rounded-lg"
            onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="label text-white">Describe your image.</label>
              <Input
                Icon={<TbPrompt />}
                inpType="text"
                name="prompt"
                placeHolder="Enter your prompt"
                register={register}
                error={errors.prompt?.message}
              />
            </div>
            <div>
              <label className="label text-white">
                Write a description for your post.
              </label>
              <Input
                Icon={<TbFileDescription />}
                inpType="text"
                name="description"
                placeHolder="Enter your description"
                register={register}
                error={errors.description?.message}
              />
            </div>
          </form>
          <Instagram />
        </div>
      </div>
    )
  );
}

export default Create;
