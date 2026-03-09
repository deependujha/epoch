import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../authoptions";

export async function GET() {
    const session = await getServerSession(AuthOptions);

    if (!session?.user?.email) {
        return NextResponse.json([], { status: 401 });
    }

    // TODO: Database functionality removed. Implement with your own database solution.
    return NextResponse.json([]);
}
