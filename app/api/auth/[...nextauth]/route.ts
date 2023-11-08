import authOptions from "@/app/auth/authOptions";
import NextAuth from "next-auth";


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
// TODO: deep dive into the next.auth mechanism (route.ts)