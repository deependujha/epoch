import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../authoptions";

export async function POST(req: Request) {
    const session = await getServerSession(AuthOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, amount, categoryId } = body;

    if (!title || !amount || !categoryId) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // TODO: Database functionality removed. Implement with your own database solution.
    return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
