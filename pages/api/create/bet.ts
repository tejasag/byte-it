import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fighter, amount, email } = req.body;

  const result = await prisma.bets.create({
    data: {
      amount,
      fighter,
      user: { connect: { email } },
    },
  });
  res.json(result);
}
