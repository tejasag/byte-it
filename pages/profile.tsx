import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-5 h-full">
        <img className="rounded-full" src={session?.user!.image!} alt="" />
        <div className="header-2 text-white">{session?.user!.name}</div>
        <div className="mt-2 text-2xl text-gray-500">
          {session?.user!.email}
        </div>

        <Link href="/api/auth/signout">
          <div className="m-5 px-7 py-4 text-xl rounded-md bg-gray-600 text-white">
            Sign Out
          </div>
        </Link>
      </div>
    </>
  );
}
