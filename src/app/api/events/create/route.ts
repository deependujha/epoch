import { EventLogic } from "@/backend/logic/event";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../authoptions";

export async function POST(req: Request) {
    const session = await getServerSession(AuthOptions);

    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const event = await EventLogic.logEvent(session.user.id, body.itemId);

    return Response.json(event);
}
