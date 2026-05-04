
import { NextResponse } from 'next/server';
import { notifications } from '@/lib/db/data';

export async function GET(req: Request) {
    try {
        // In a real app, you'd fetch notifications for the logged-in user.
        // For this mock, we'll return all notifications for user1.
        const userNotifications = notifications.filter(n => n.userId === 'user1');
        return NextResponse.json(userNotifications);
    } catch (error) {
        console.error("[NOTIFICATIONS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
