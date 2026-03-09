import type { Config } from "drizzle-kit";

export default {
    schema: "./src/backend/db/schema.ts",
    out: "./src/backend/drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
} satisfies Config;
