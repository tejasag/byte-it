import { useState } from "react";

export default function ChatRoom({
  fighter,
  image,
  messages,
  email,
}: {
  fighter: "zuck" | "musk";
  image: string;
  messages: any;
  email: string;
}) {
  const [message, setMessage] = useState<string>();
  console.log(messages);

  const handleSubmit = async () => {
    let res = await fetch("/api/create/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        message: message,
        fighter: fighter,
      }),
    }).then((res) => res.json());

    setMessage("");
  };

  return (
    <>
      <div className="bg-gray-900 rounded-xl min-h-[70vh] w-full max-w-[80vw] flex-1 mx-10 border-4 border-solid border-gray-600 flex flex-col">
        <div className="chat flex-1 overflow-y-scroll">
          {messages.map((x: any, i: number) => (
            <div
              key={i}
              className="flex flex-row justify-center items-center my-3"
            >
              <img
                src={x.user.image}
                alt=""
                className="rounded-full h-10 m-2"
              />
              <div className="flex flex-col">
                <div className="flex flex-row justify-center items-center">
                  <div className="text-white font-bold text-md">
                    {x.user.name}
                  </div>
                  <div className="text-gray-500 text-sm mx-2">
                    {x.createdAt}
                  </div>
                </div>
                <div className="text-white text-md">{x.content}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-center items-center">
          <img src={image} className="rounded-full ml-2 h-8" alt="" />
          <input
            type="text"
            value={message}
            className="flex-1 m-2 bg-gray-700 rounded-lg h-6 p-5 focus:outline-none text-white"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-orange-300 rounded-lg p-2 mr-2"
            onClick={() => handleSubmit()}
          >
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                fill={fighter === "musk" ? "#ffffff" : ""}
                d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
