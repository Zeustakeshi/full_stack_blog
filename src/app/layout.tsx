import Navbar from "@/components/navbar/Navbar";
import "../styles/globals.css";
import { Poppins } from "next/font/google";
import Footer from "@/components/footer/Footer";
import AuthProvider from "@/contexts/auth.conext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
    subsets: ["devanagari"],
    weight: ["400", "500", "600", "700"],
});

export const metadata = {
    title: "mh-blog - Share and Explore Engaging Blog Posts",
    description:
        "Discover a platform where you can write, share, and engage with captivating blog posts. Join mh-blog to unleash your creativity and connect with like-minded individuals",
};

export function generateImageMetadata() {
    return [
        {
            contentType: "/robot.png",
            size: { width: 48, height: 48 },
            id: "small",
        },
        {
            contentType: "/robot.png",
            size: { width: 72, height: 72 },
            id: "medium",
        },
    ];
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <div className="main dark:text-slate-100 dark:bg-slate-900">
                    <ToastContainer
                        position={"top-right"}
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <AuthProvider>
                        <Navbar></Navbar>
                        <div className="app-container py-5 min-h-[calc(100vh-195px)] ">
                            {children}
                        </div>
                    </AuthProvider>
                    <Footer></Footer>
                </div>
            </body>
        </html>
    );
}
