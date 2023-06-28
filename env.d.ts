namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        DB_URI: string;
        GITHUB_ID: string;
        GITHUB_SECRET: string;
        NEXT_PUBLIC_SECRET: string;
        NEXTAUTH_URL: string;
        FIREBASE_API_KEY: string;
        FIREBASE_AUTH_DOMAIN: string;
        FIREBASE_PROJECT_ID: string;
        FIREBASE_APP_ID: string;
    }
}
