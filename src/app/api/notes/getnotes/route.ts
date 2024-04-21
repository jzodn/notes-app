import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession, Session } from "next-auth";
import { NextResponse } from "next/server";
import { z, ZodType } from "zod";

export const getNotes = async (session: Session) => {   
  const notes = await prisma.notes.findMany({
    where: { user_id: Number(session.user.id) }
  });

  return notes;
}

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ authenticated: !!session });
  }

  try {    
    const notes = await getNotes(session);

    return NextResponse.json(
        { notes: notes },
        { status: 201 }
      );
  } catch (e: any) {
    return NextResponse.json(
        { message: e.message },
        { status: 500 }
      );
  }
};
