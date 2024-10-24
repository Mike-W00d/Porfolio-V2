import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const PortfolioCarosel = () => {
  return (
    <div>
      <div className="flex bg-white w-full rounded-lg shadow-xl flex-col p-6">
        <span className="text-fedblue text-4xl font-bold">Next Portfolio</span>{" "}
        <span className="text-honblue text-2xl font-bold">
          Primary Language - TypeScript
        </span>{" "}
        <span className="text-honblue text-lg">
          <span className="font-semibold"> Tech Stack - </span> Next.js, React,
          TailwindCSS, TypeScript
          <br />
          <span className="font-semibold">Image Handling - </span>Cloudinary
        </span>
        <span className="text-fedblue">
          {" "}
          My own developer Portfolio built in Next.js to show off my projects
          and Images{" "}
        </span>
        <div className="flex w-full justify-center">
          <Image
            src="/nextHome.png"
            alt="Screenshot of Portfolio Home Page"
            width={700}
            height={700}
            className="rounded-lg"
          />
        </div>
        <div className="flex justify-center align-middle space-x-4 items-center m-5">
          <a
            href="https://github.com/Mike-W00d/Porfolio-V2"
            className="text-blue-500"
          >
            <Image
              src="/github.png"
              height={50}
              width={40}
              className="hover:cursor-pointer hover:scale-110"
              alt="GitHub logo and link to my Next-Portfolio GitHub repository"
            />
          </a>
          <a href="/projects/portfolio">
            <Button className="bg-fedblue hover:bg-honblue">
              Learn more about this project
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCarosel;
