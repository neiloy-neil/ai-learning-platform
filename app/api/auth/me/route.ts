
import { NextResponse } from 'next/server';
import { users } from '@/lib/db/data';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const session = cookies().get('session');
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = users.find(user => user.id === session.value);
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        return NextResponse.json({ user });

    } catch (error) {
        console.error("[ME_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
