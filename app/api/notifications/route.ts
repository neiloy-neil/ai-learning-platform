
import { NextResponse } from 'next/server';
import { notifications, users } from '@/lib/db/data';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
    try {
        const session = cookies().get('session');
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = users.find(user => user.id === session.value);
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userNotifications = notifications.filter(n => n.userId === user.id);
        return NextResponse.json(userNotifications);
    } catch (error) {
        console.error("[NOTIFICATIONS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
