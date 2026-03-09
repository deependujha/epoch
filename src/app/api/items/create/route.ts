import { ItemLogic } from "@/backend/logic/item";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../authoptions";

export async function POST(req: Request) {
    const session = await getServerSession(AuthOptions);

    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const item = await ItemLogic.createItemWithHierarchy({
        userId: session.user.id,
        ...body,
    });

    return Response.json(item);
}
