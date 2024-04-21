import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { z, ZodType } from "zod";

type FormData = {
    username: string,
    email: string,
    password: string,
  };

const schema: ZodType<FormData> = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(32),
  email: z.string().email(),
  password: z.string().min(8, 'Password must have more than 8 characters').max(20),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, email, password } = schema.parse(body);

        const existingUser = await prisma.accounts.findUnique({
            where: { username: username },
        });
        if (existingUser) {
            return NextResponse.json({ user: null, message: "User with this username already exists" }, { status: 409 });
        }

        const existingEmail = await prisma.accounts.findUnique({
            where: { email: email },
        });
        if (existingUser) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.accounts.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                role: "user",
            }
        })

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}