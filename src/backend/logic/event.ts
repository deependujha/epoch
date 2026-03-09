import { db } from "@/backend/db";
import { events, items } from "@/backend/db/schema";
import { eq, desc } from "drizzle-orm";

export class EventLogic {
    /** Log a new event */
    static async logEvent(userId: string, itemId: string) {
        const [event] = await db
            .insert(events)
            .values({
                userId,
                itemId,
            })
            .returning();

        return event;
    }

    /** Delete an event */
    static async deleteEvent(userId: string, eventId: string) {
        const [event] = await db
            .delete(events)
            .where(eq(events.id, eventId))
            .returning();

        if (!event) {
            throw new Error("Event not found");
        }

        // Optional safety check
        if (event.userId !== userId) {
            throw new Error("Unauthorized");
        }

        return event;
    }

    /** Timeline (latest events first) */
    static async getTimeline(userId: string) {
        return db
            .select({
                eventId: events.id,
                itemId: items.id,
                itemName: items.name,
                createdAt: events.createdAt,
            })
            .from(events)
            .leftJoin(items, eq(events.itemId, items.id))
            .where(eq(events.userId, userId))
            .orderBy(desc(events.createdAt));
    }

    /** History for a single item */
    static async getItemHistory(userId: string, itemId: string) {
        const rows = await db
            .select()
            .from(events)
            .where(eq(events.itemId, itemId))
            .orderBy(desc(events.createdAt));

        return rows.map((e) =>
            new Date(e.createdAt).toLocaleString("en-IN", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
            }),
        );
    }
}
