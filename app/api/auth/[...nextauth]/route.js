import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Define the authOptions
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "admin@gmail.com" },
                password: { label: "Password", type: "password", placeholder: "admin" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                return { 
                    name: "TFT", 
                    email: "tft@gmail.com", 
                    image: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/12210015038f15148d157c5a4facdd8bd5cb5e78-1232x978.png" 
                }
            }
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    pages: {
        signIn: '/auth/signin', // Custom sign-in page
        error: '/auth/error', // Custom error page
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
          // Always redirect to the homepage on login
          return baseUrl; // This will redirect to your site's root ("/")
        },
      },
}

// Create a NextAuth handler
const handler = NextAuth(authOptions)

// Export the handler for GET and POST methods
export { handler as GET, handler as POST }
