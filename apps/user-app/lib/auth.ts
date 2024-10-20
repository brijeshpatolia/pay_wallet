import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: { label: "Name", type: "text", placeholder: "Your name" },  // New field for name
                phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                // If logging in with existing user, name isn't needed
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        };
                    }
                    return null;  // Return null if password is invalid
                }

                // If signing up a new user, `name` is required
                if (!credentials.name) {
                    throw new Error("Name is required for new users");
                }

                try {
                    // Create new user with name, phone, and hashed password
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);
                    const user = await db.user.create({
                        data: {
                            name: credentials.name,  // Store name
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    };
                } catch (e) {
                    console.error(e);
                    return null;
                }
            }
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.name = user.name;  // Include the user's name in the token
            }
            return token;
        },
        async session({ token, session }: any) {
            session.user.id = token.id;
            session.user.name = token.name;  // Include the name in the session
            return session;
        }
    }
};
