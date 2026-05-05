
import { NextResponse } from 'next/server';
import { users } from '@/lib/db/data';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return new NextResponse("User already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: `user${users.length + 1}`,
            name,
            email,
            password: hashedPassword,
            role: 'student', // default role
        };

        // @ts-ignore
        users.push(newUser);

        return NextResponse.json(newUser, { status: 201 });

    } catch (error) {
        console.error("[REGISTER_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
