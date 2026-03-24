
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // In a real app, you'd validate the password. Here, we'll just find the user.
        const users = await db.user.findMany();
        const user = users.find(u => u.name.toLowerCase() === email.split('@')[0]); // Simple mock lookup

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        // In a real app, you would generate a real JWT.
        const token = `mock-jwt-for-${user.id}`;

        return NextResponse.json({ user, token });

    } catch (error) {
        console.error("[LOGIN_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
