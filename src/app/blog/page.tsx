import BlogList from "@/components/blog/BlogList";
import { PostsProvider } from "@/contexts/post.context";

export const metadata = {
    title: "Explore Blogs - Find Inspiring and Informative Posts on mh-blog",
    description:
        "Dive into a collection of engaging blog posts on mh-blog. Discover diverse topics, unique perspectives, and thought-provoking content shared by our vibrant community.",
};

const Blog = async () => {
    return (
        <PostsProvider>
            <BlogList type="type-2"></BlogList>
        </PostsProvider>
    );
};

export default Blog;
