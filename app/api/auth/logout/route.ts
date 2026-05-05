
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        cookies().delete('session');
        return new NextResponse("Logged out", { status: 200 });
    } catch (error) {
        console.error("[LOGOUT_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
