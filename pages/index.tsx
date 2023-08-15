import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useEffect, useRef } from "react";

export default function Home() {
  const zuckRef = useRef<HTMLImageElement>(null);
  const elonRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let zuck = zuckRef.current as unknown as HTMLImageElement;
    let elon = elonRef.current as unknown as HTMLImageElement;

    window.addEventListener("scroll", () => {
      let value = window.scrollY;
      if (zuck && elon) {
        zuck.style.bottom = value * 0.2 + "px";
        elon.style.bottom = value * 0.2 + "px";
      }
    });
  }, [zuckRef.current, elonRef.current]);

  return (
    <>
      <div className="bg w-screen h-screen absolute flex flex-row">
        <img ref={zuckRef} className="zuck" src="zuck.png" alt="" />
        <img ref={elonRef} src="elon.png" className="elon" alt="" />
      </div>

      <main className="flex flex-col items-center justify-center">
        <Navbar />
        <div className="texts flex flex-col justify-center items-center text-white">
          <div className=" header">Zuckerberg</div>
          <div className="text-lg">vs.</div>
          <div className=" header">Musk</div>
        </div>
        <img
          className="down-arrow h-8 border-white rounded-full border-2 p-2 mt-[10rem]"
          src="down-arrow.svg"
          alt=""
        />
        <div className="text-white mt-[10rem] flex flex-col items-center h-screen about">
          <div className="header-2 mt-[10rem]">
            Fight?{" "}
            <span className="underline underline-offset-3">
              of the century
              <span className="text-red-500">.</span>
            </span>
          </div>
          <div className="text-xl mx-[10rem] text-center my-5">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
            recusandae quia pariatur laudantium quam aliquam quasi quidem qui,
            dolorum exercitationem laboriosam? Doloribus consequatur iste
            provident obcaecati dicta explicabo, culpa odio tempore facilis
            quaerat neque, ea ratione ab impedit debitis tenetur magnam
            repellendus expedita et accusantium aspernatur. Quia labore rem
            velit explicabo quod eos quidem odio. Atque quidem blanditiis
            reprehenderit aspernatur similique quaerat, illum quasi! Quasi aut
            earum quas ullam animi cum, illum, maiores laborum vel, sit
            dignissimos fugit possimus et. Temporibus, tempore nesciunt. Fugit
            facilis quis, quia beatae ut cumque minima saepe voluptatibus
            tempora. Vel nisi labore quaerat omnis ducimus?
          </div>
        </div>
      </main>
    </>
  );
}
