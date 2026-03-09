import { EventLogic } from "@/backend/logic/event";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../authoptions";

export async function DELETE(req: Request) {
    const session = await getServerSession(AuthOptions);

    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const event = await EventLogic.deleteEvent(session.user.id, body.eventId);

    return Response.json(event);
}
