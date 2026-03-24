
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const concepts = await db.concept.findMany();
        return NextResponse.json(concepts);
    } catch (error) {
        console.error("[CONCEPTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
