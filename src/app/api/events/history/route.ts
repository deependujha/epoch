import { getServerSession } from "next-auth";
import { AuthOptions } from "../../authoptions";
import { EventLogic } from "@/backend/logic/event";

export async function GET(req: Request) {
    const session = await getServerSession(AuthOptions);

    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("itemId");

    if (!itemId) {
        return new Response("Missing itemId", { status: 400 });
    }

    try {
        const history = await EventLogic.getItemHistory(
            session.user.id,
            itemId,
        );

        return Response.json(history);
    } catch (err) {
        console.error("History fetch error:", err);
        return new Response("Failed to fetch history", { status: 500 });
    }
}
