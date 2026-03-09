import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { UserLogic } from "@/backend/logic/user";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const AuthOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },

    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async signIn({ account, profile }) {
            if (!profile?.email || !account?.providerAccountId) {
                throw new Error("Invalid Google profile");
            }

            // Create or update user
            const user = await UserLogic.upsertOAuthUser({
                email: profile.email,
                name: profile.name,
                image: (profile as any).picture,
                provider: account.provider,
                providerId: account.providerAccountId,
            });

            return true;
        },

        async jwt({ token, account, profile }) {
            /**
             * This block runs only on login.
             * Afterwards the token is reused.
             */
            if (account && profile?.email) {
                const user = await UserLogic.findByEmail(profile.email);

                if (user) {
                    token.userId = user.id;
                    token.email = user.email;
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email as string;
                (session.user as any).id = token.userId as string;
            }

            return session;
        },
    },
};
