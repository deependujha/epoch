import { ItemLogic } from "@/backend/logic/item";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../authoptions";

export async function GET() {
    const session = await getServerSession(AuthOptions);

    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    const tree = await ItemLogic.getItemTree(session.user.id);
    return Response.json(tree);
}
