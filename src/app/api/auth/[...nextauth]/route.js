import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await User.findOne({ email: credentials.email })

        if (!user) throw new Error("User not found")
        if (!user.isEmailVerified)
          throw new Error("Email not verified")

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isValid) throw new Error("Invalid password")

        return user
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id
        token.onboardingCompleted = user.onboardingCompleted
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.onboardingCompleted = token.onboardingCompleted
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
