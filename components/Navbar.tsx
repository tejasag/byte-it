import Link from "next/link";

const items = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/",
  },
  { name: "Place Bets", link: "/bet" },
  {
    name: "Fan Club",
    link: "/club",
  },
];

export default function Navbar() {
  return (
    <div className="w-screen items-center flex flex-row justify-center z-40">
      <div className="m-2 text-white flex flex-row justify-between max-w-lg">
        {items.map((x, i) => (
          <div className="relative nav m-6 cursor-pointer" key={i}>
            <Link href={x.link}>{x.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
