import Navbar from "@/components/Navbar";
import { useState } from "react";

const data: {
  [name: string]: {
    name: string;
    stats: {
      height: string;
      weight: string;
      reach: string;
      legReach: string;
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
        {selected != "" ? (
          <div className="tilt text-white items-center flex flex-row">
            {Object.keys(data[selected].stats).map((x, i) => (
              <div className="items-center flex flex-col mx-4">
                <div className="text-md text-gray-600">{x}</div>
                <div className="text-xl text-white">
                  {data[selected].stats[x] as string}
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
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
