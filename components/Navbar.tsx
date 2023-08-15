import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

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
  const { data: session } = useSession();

  return (
    <div className="w-screen items-center flex flex-row justify-center z-40">
      <div className="m-2 text-white flex flex-row justify-between max-w-2xl items-center">
        {items.map((x, i) => (
          <div className="relative nav m-6 cursor-pointer" key={i}>
            <Link href={x.link}>{x.name}</Link>
          </div>
        ))}
        <div className="relative m-6 cursor-pointer">
          {session ? (
            <Link href="/profile">
              <img
                className="h-10 rounded-full"
                src={session.user!.image!}
                alt=""
              />
            </Link>
          ) : (
            <Link className="nav" href="/api/auth/signin">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
