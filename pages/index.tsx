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
        zuck.style.bottom = value * 0.5 + "px";
        elon.style.bottom = value * 0.5 + "px";
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
              of the century.
            </span>
          </div>
          <div className="about text-xl mx-[10rem] text-center my-5" id="about">
            What started as a mere joke has become one of the biggest rivalries
            on the internet. Elon Musk and Mark Zuckerberg, two of the
            world&apos;s biggest businessmen have decided to have a real life
            boxing match. While both our champions train hard for the upcoming
            fight, we need the event organised well in advance. The world loves
            gambling, and so a legal betting system is needed, the arena where
            these two billionaires fight has to be prepared for seating
            thousands of people. Fans need a place to talk to each other, and
            all of this needs to be done fast. Here comes our company, EZ to
            provide all these necessities as fast as possible (3 days to be
            exact)
          </div>
        </div>
      </main>
    </>
  );
}
