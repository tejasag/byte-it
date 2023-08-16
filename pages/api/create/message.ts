import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, message, fighter } = req.body;

  const result = await prisma.message.create({
    data: {
      room: fighter,
      content: message,
      user: { connect: { email } },
    },
  });

  return res.json(result);
}
