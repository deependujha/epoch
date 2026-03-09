import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../authoptions";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const year = Number(searchParams.get("year"));
    const month = Number(searchParams.get("month"));

    if (Number.isNaN(year) || Number.isNaN(month)) {
        return NextResponse.json([], { status: 400 });
    }

    const session = await getServerSession(AuthOptions);
    if (!session?.user?.email) {
        return NextResponse.json([], { status: 401 });
    }

    // TODO: Database functionality removed. Implement with your own database solution.
    return NextResponse.json([]);
}
