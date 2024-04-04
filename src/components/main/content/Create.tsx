"use client";
import Input from "@/components/Input";
import Instagram from "@/components/mockups/Instagram";
import { useProject, useTab } from "@/store/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TbFileDescription, TbPrompt, TbUserCircle } from "react-icons/tb";
import { z } from "zod";
import { toPng } from "html-to-image";
import { useEffect, useRef, useState } from "react";
import UploadBtn from "./UploadBtn";
import Twitter from "@/components/mockups/Twitter";
import Youtube from "@/components/mockups/Youtube";

const createSchema = z.object({
  prompt: z
    .string()
    .min(6, { message: "Prompt must be at least 6 chars" })
    .max(77, { message: "Prompt should be less than 77 chars" }),
});

function Create() {
  const tab = useTab((state) => state.tab);
  const project = useProject((state) => state.project);
  const [description, setDescription] = useState<string>();
  const [username, setUsername] = useState<string>();
  const ref = useRef<HTMLDivElement>(null);
  const [avatar, setAvatar] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(createSchema) });

  const [img, setImg] = useState();

  const onSubmit: SubmitHandler<FieldValues> = async (d) => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: d.prompt,
        width: project?.social== "Instagram" ? 1080 : 1280,
        height: project?.social== "Instagram" ? 1344 : 720,
      }),
    });
    const data = await res.json();
    console.log(data[0]);

    setImg(data[0]);
  };

  function handleClick() {
    if (ref.current) {
      toPng(ref.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "myImage.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log("there is an error: ", err);
        });
    } else {
      console.log("Element not found");
    }
  }

  return (
    tab == "create" && (
      <div>
        <div className="flex flex-col lg:flex-row justify-around items-center gap-5 p-5">
          <form
            className="flex flex-col w-full max-w-2xl glass p-5 rounded-lg gap-5"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-end gap-3 w-full">
              <div className="w-3/4">
                <label className="label text-white">Write your username</label>
                <div className="w-full relative">
                  <input
                    className="w-full text-white caret-green-500 focus:outline-green-500 bg-[#1A1D21] border border-[#363A3D] p-3 rounded placeholder:text-[#9B9C9E]"
                    placeholder={"Write your username."}
                    type={"text"}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <UploadBtn setAvatar={setAvatar} />
            </div>
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
              <div>
                <div className="w-full relative">
                  <input
                    className="w-full text-white caret-green-500 focus:outline-green-500 bg-[#1A1D21] border border-[#363A3D] pl-12 p-3 rounded placeholder:text-[#9B9C9E]"
                    placeholder={"Write a description for your post."}
                    type={"text"}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className=" text-[#686B6E] text-xl centered-left">
                    <TbFileDescription />
                  </div>
                </div>
                {/* @ts-ignore: Unreachable code error */}
                {!description && (
                  <p className="text-red-500 text-sm">
                    fill out the input you can get help in chat tab.
                  </p>
                )}
              </div>
            </div>

            <button type="submit" className="btn" disabled={isSubmitting}>
              Apply the Changes
            </button>
            <button
              type="button"
              onClick={handleClick}
              className="btn btn-primary">
              Download
            </button>
          </form>
          <div ref={ref}>
            {project?.social == "Instagram" && (
              <Instagram
                image={img}
                description={description}
                username={username}
                avatar={avatar}
                isSubmiting={isSubmitting}
              />
            )}
            {project?.social == "X" && (
              <Twitter
                image={img}
                description={description}
                username={username}
                avatar={avatar}
                isSubmiting={isSubmitting}
              />
            )}
            {project?.social == "Youtube" && (
              <Youtube
                image={img}
                description={description}
                username={username}
                avatar={avatar}
                isSubmiting={isSubmitting}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Create;
