import { db } from "@/backend/db";
import { users } from "@/backend/db/schema";
import { eq } from "drizzle-orm";

type UpsertUserParams = {
    email: string;
    name?: string | null;
    image?: string | null;
    provider?: string;
    providerId?: string;
};

export class UserLogic {
    static async findByEmail(email: string) {
        const result = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        return result[0] ?? null;
    }

    static async createUser(data: UpsertUserParams) {
        const [user] = await db
            .insert(users)
            .values({
                email: data.email,
                name: data.name,
                image: data.image,
                provider: data.provider,
                providerId: data.providerId,
            })
            .returning();

        return user;
    }

    static async updateUser(email: string, data: Partial<UpsertUserParams>) {
        const [user] = await db
            .update(users)
            .set({
                name: data.name,
                image: data.image,
            })
            .where(eq(users.email, email))
            .returning();

        return user;
    }

    static async upsertOAuthUser(data: UpsertUserParams) {
        const existing = await this.findByEmail(data.email);

        if (!existing) {
            return this.createUser(data);
        }

        return this.updateUser(data.email, data);
    }
}
