import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ authenticated: !!session });
  }

  try {
    const res = await req.json();
    const id = res?.id;

    if (!res.id) {
      return NextResponse.json(
        { message: "No id given" },
        { status: 400 }
      );
    }
    
    const note = await prisma.notes.findUnique({
      where: {
        id: id,
      },
    });

    if (note?.user_id != Number(session?.user.id)) {
      return NextResponse.json({ authenticated: null });
    }

    await prisma.notes.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
        { message: "Note deleted" },
        { status: 201 }
      );
  } catch (e: any) {
    return NextResponse.json(
        { message: e.message },
        { status: 500 }
      );
  }
};
