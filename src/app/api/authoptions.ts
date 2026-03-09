import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

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

            // TODO: Database functionality removed. Implement with your own database solution.
            return true;
        },

        async jwt({ token, profile }) {
            // Persist email on token
            if (profile?.email) {
                token.email = profile.email;
            }
            return token;
        },

        async session({ session, token }) {
            if (token.email && session.user) {
                session.user.email = token.email as string;
            }
            return session;
        },
    },
};
