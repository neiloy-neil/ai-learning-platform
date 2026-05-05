
import { NextResponse } from 'next/server';
import { users } from '@/lib/db/data';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const user = users.find(user => user.email === email);
        if (!user) {
            return new NextResponse("Invalid credentials", { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new NextResponse("Invalid credentials", { status: 401 });
        }

        // Set a session cookie
        cookies().set('session', user.id, { httpOnly: true, path: '/' });

        return NextResponse.json(user);

    } catch (error) {
        console.error("[LOGIN_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
