import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z, ZodType } from "zod";

type FormData = {
  content: string,
};

const schema: ZodType<FormData> = z.object({
  content: z.string().min(1, "note must be at least 1 character long").max(255),
});

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ authenticated: !!session });
  }

  try {
    const body = await req.json();
    const { content } = schema.parse(body);
    
    await prisma.notes.create({
        data: {
            user_id: Number(session.user.id),
            content: content,
        },
    });

    return NextResponse.json(
        { message: "Note created successfully" },
        { status: 201 }
      );
  } catch (e: any) {
    return NextResponse.json(
        { message: e.message },
        { status: 500 }
      );
  }
};
