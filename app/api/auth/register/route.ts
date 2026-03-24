import { NextResponse } from 'next/server';
import { users } from '@/lib/db/data';
import { UserRole, type User } from '@/lib/pcdc-types';

export async function POST(req: Request) {
    try {
        const { name, email } = await req.json();

        const existingUser = users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
        if (existingUser) {
            return new NextResponse("User already exists", { status: 409 });
        }

        const newUser: User = {
            id: `user${users.length + 1}`,
            name,
            email,
            role: UserRole.STUDENT,
        };
        users.push(newUser);

        const token = `mock-jwt-for-${newUser.id}`;

        return NextResponse.json({ user: newUser, token });
    } catch (error) {
        console.error("[REGISTER_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
