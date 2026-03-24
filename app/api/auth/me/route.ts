
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { UserRole } from '@/lib/pcdc-types';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const role = searchParams.get('role');

        let userId = 'user1'; // Default to student
        if (role === UserRole.TEACHER) {
            userId = 'user3';
        } else if (role === UserRole.PARENT) {
            userId = 'user4';
        }

        const user = await db.user.findUnique({ where: { id: userId } });

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        return NextResponse.json(user);

    } catch (error) {
        console.error("[ME_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
