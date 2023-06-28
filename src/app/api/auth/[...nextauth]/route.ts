import userModel from "@/models/user.model";
import connect from "@/utils/db";
import bcrypt from "bcrypt";
import NextAuth, { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials, req) {
                await connect();
                try {
                    const user = await userModel.findOne({
                        email: credentials?.email,
                    });

                    if (user && credentials?.password) {
                        const isValidPassword = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );
                        if (!isValidPassword) return null;
                        const { password, ...userForClient } = user.toObject();
                        return { ...userForClient, name: user.username };
                    } else {
                        return null;
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            },
        }),

        // ...add more providers here
    ],
    pages: {
        signIn: "/login", // for custom sign in page
        error: "/login", // show login page if has error
    },
    callbacks: {
        async signIn({ user, email, profile }) {
            console.log({ userX: user });
            try {
                const userExist = await userModel.findOne({
                    email: email ? email : user.email,
                });

                if (!userExist) {
                    const newUser = await new userModel({
                        username: profile?.name || user.name,
                        email: email || user.email,
                        imgURL: profile?.image || user.image,
                    });
                    await newUser.save();
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async session({
            session,
            token,
            user,
        }: {
            session: Session;
            token: JWT;
            user: AdapterUser;
        }) {
            const userInfo = await userModel.findOne(
                {
                    email: session.user.email ? session.user.email : user.email,
                },
                { password: 0 }
            );

            session.user = { ...session.user, ...userInfo.toObject() };
            token._id = userInfo._id;
            token.isAdmin = userInfo.isAdmin;
            return session;
        },
    },
    secret: process.env.NEXT_PUBLIC_SECRET,
});

export { handler as GET, handler as POST };
