import Banner from "@/components/banner/Banner";
import BlogList from "@/components/blog/BlogList";
import { PostsProvider } from "@/contexts/post.context";
import { useSession } from "next-auth/react";

export default function Home() {
    return (
        <main className="w-full h-full ">
            <Banner></Banner>
            <PostsProvider>
                <BlogList type="type-1"></BlogList>
            </PostsProvider>
        </main>
    );
}
