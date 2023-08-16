import Navbar from "@/components/Navbar";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export default function Profile({ bet }: { bet: any }) {
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

        <div className="flex flex-col my-10 justify-center items-center">
          <div className="text-md text-gray-600">Current bets on:</div>
          {bet ? (
            <div className="text-2xl text-white">
              {bet.fighter === "zuck" ? "Mark Zuckerberg" : "Elon Musk"} of $
              {bet.amount}
            </div>
          ) : (
            <div className="text-white">No one</div>
          )}
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

export const getServerSideProps = async ({ req }: { req: any }) => {
  const session = await getSession({ req });

  let prev = await prisma.bets.findMany({
    where: {
      user: {
        is: {
          email: session?.user!.email,
        },
      },
    },
  });

  if (prev.length > 0) {
    return {
      props: {
        bet: prev[0],
      },
    };
  } else {
    return {
      props: {
        bet: null,
      },
    };
  }
};
