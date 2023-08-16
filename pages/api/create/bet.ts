import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fighter, amount, email } = req.body;

  let prev2 = await prisma.bets.findMany({
    where: {
      user: {
        is: {
          email: email,
        },
      },
    },
  });

  if (prev2.length != 0) {
    let prev = prev2[0];
    if (fighter === prev.fighter) {
      await prisma.bets.update({
        where: {
          id: prev.id,
        },
        data: {
          amount: prev.amount + amount,
        },
      });
      return res.json({
        message: `You have successfully added $${amount} to your bet on ${fighter} making your total bet ${
          prev.amount + amount
        }`,
        status: "success",
      });
    } else if (prev.amount * 1.5 > amount) {
      return res.json({
        message: `You are trying to switch bets from ${prev.fighter} to ${fighter}. You need to bet atleast 1.5x of your previous bet ($${prev.amount}) to switch fighters.`,
        status: "warn",
      });
    } else {
      await prisma.bets.update({
        where: {
          id: prev.id,
        },
        data: {
          amount: prev.amount + amount,
          fighter: fighter,
        },
      });
      return res.json({
        message: `Congrats! You have successfully switched bets from ${prev.fighter} to ${fighter}. Your previous bet has been shifted as well.`,
        status: "success",
      });
    }
  } else {
    const result = await prisma.bets.create({
      data: {
        amount,
        fighter,
        user: { connect: { email } },
      },
    });
    return res.json({
      message: `Congrats! You bet $${amount} on ${fighter}`,
      status: "success",
    });
  }
}
