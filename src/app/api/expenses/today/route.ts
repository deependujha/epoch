import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "@/app/api/authoptions";

const startOfToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
};

const endOfToday = () => {
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    return d;
};

export async function GET() {
    const session = await getServerSession(AuthOptions);
    if (!session?.user?.email) {
        return NextResponse.json([], { status: 401 });
    }

    // TODO: Database functionality removed. Implement with your own database solution.
    return NextResponse.json([]);
}
