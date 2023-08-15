import Navbar from "@/components/Navbar";
import { useState } from "react";

const data: {
  [name: string]: {
    name: string;
    stats: {
      [key: string]: string;
    };
  };
} = {
  zuck: {
    name: "Mark Zuckerberg",
    stats: {
      height: "170cm",
      weight: "70kg",
      reach: '70"',
      legReach: '40"',
    },
  },
  musk: {
    name: "Elon Musk",
    stats: {
      height: "175cm",
      weight: "80kg",
      reach: '74"',
      legReach: '41"',
    },
  },
};

type Fighter = "musk" | "zuck";

function BetBox({ fighter }: { fighter: Fighter }) {
  let accent = { musk: "#ff1b51", zuck: "#50ff81" }[fighter];

  return (
    <div className="tilt flex flex-row justify-center items-center mt-7">
      <div className="border-gray-700 bg-gray-600 rounded-md m-5  flex flex-row">
        <div className="text-white border-gray-800 border-solid border-r-2 p-4">
          $
        </div>
        <input
          type="number"
          placeholder={`Bet on ${fighter}`}
          className="p-4 bg-inherit rounded-md text-white focus:outline-none"
        />
      </div>
      <div
        className={`p-4 rounded-md`}
        style={{
          backgroundColor: accent,
        }}
      >
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            fill={fighter === "musk" && "#ffffff"}
            d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
          />
        </svg>
      </div>
    </div>
  );
}

export default function Bet() {
  const [selected, setSelected] = useState<"zuck" | "musk" | "">("");
  const text =
    selected === "" ? "Select your fighter!" : data[selected]["name"];

  return (
    <div className="bet">
      <Navbar />
      <div
        className={`flex flex-col justify-center m-10 items-center ${
          selected === "musk"
            ? "ml-[20rem]"
            : selected === "zuck"
            ? "mr-[20rem]"
            : ""
        }`}
        style={{
          transition: "all 0.5s ease",
        }}
      >
        <div className="header-2 text-white transition-all">{text}</div>
        {selected != "" && (
          <>
            <div className="tilt text-white items-center flex flex-row">
              {Object.keys(data[selected].stats).map((x: any, i) => (
                <div className="items-center flex flex-col mx-4" key={i}>
                  <div className="text-md text-gray-600">{x}</div>
                  <div className="text-xl text-white">
                    {data[selected]["stats"][x]}
                  </div>
                </div>
              ))}
            </div>
            <BetBox fighter={selected} />
          </>
        )}
      </div>
      <div className="images">
        <img
          className={`musk-laugh ${selected === "musk" ? "musk-selected" : ""}`}
          aria-select={selected}
          src={selected === "musk" ? "musk-laugh.png" : "musk-laugh-red.png"}
          alt=""
          onClick={() => setSelected(selected === "musk" ? "" : "musk")}
        />
        <img
          className={`zuck-laugh ${selected === "zuck" ? "zuck-selected" : ""}`}
          aria-select={selected}
          src={selected === "zuck" ? "zuck-laugh.png" : "zuck-laugh-green.png"}
          alt=""
          onClick={() => setSelected(selected === "zuck" ? "" : "zuck")}
        />
      </div>
    </div>
  );
}
