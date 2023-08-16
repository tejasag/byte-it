import Navbar from "@/components/Navbar";
import { getSession, useSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import ChatRoom from "@/components/ChatRoom";
import Link from "next/link";

export default function Club({ bet, messages }: { bet: any; messages: any[] }) {
  const { data: session } = useSession();
  console.log(messages);

  if (!session)
    return (
      <div>
        <Navbar />
        <div className="h-[66vh]  flex flex-col justify-center items-center">
          <div className="text-white text-3xl max-w-[90vw] text-center">
            Oops! <br /> Looks like you need to be logged in to use this.
          </div>
          <Link href="/api/auth/signin">
            <div className="m-5 px-7 py-4 text-xl rounded-md bg-gray-600 text-white">
              Sign In
            </div>
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-full mx-10">
        <div className="header-2 text-white h-full">
          {bet ? (bet.fighter === "zuck" ? "Zuck" : "Musk") : "No"} Fan Club
        </div>
        {bet && (
          <ChatRoom
            fighter={bet.fighter}
            image={bet.user.image}
            messages={messages}
            email={bet.user.email}
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async ({ req }: { req: any }) => {
  const session = await getSession({ req });
  console.log(session?.user);
  let result = await prisma.bets.findMany({
    where: {
      user: {
        is: {
          email: session?.user!.email,
        },
      },
    },
    include: {
      user: true,
    },
  });

  if (result.length === 0) {
    return {
      props: {
        bet: null,
      },
    };
  } else {
    let fighter = result[0].fighter;

    let messages = await prisma.message.findMany({
      where: {
        room: fighter,
      },
      include: {
        user: true,
      },
    });

    messages = messages.map((x: any) => {
      // @ts-ignore
      x.createdAt = x.createdAt.toString();
      return x;
    });

    return {
      props: {
        bet: result[0],
        messages,
      },
    };
  }
};
