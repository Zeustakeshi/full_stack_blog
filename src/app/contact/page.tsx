import Button from "@/components/button/Button";
import Image from "next/image";
import React from "react";

export const metadata = {
    title: "Contact Us - Get in Touch with mh-blog",
    description:
        "Have a question, suggestion, or collaboration opportunity? Contact mh-blog and let us know. We're here to assist you and value your feedback.",
};

const Contact = () => {
    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-5">
            <h2 className="text-3xl font-semibold">Let&#39s Keep in Touch</h2>
            <div className="mt-8 flex justify-between items-center w-full h-full">
                <div className="animation-scale  relative flex-1 flex justify-center items-center">
                    <Image
                        src="/contact.png"
                        alt="contact-image"
                        height={400}
                        width={400}
                    ></Image>
                </div>
                <form className="flex-1 flex flex-col justify-center items-start gap-4">
                    <input
                        className="w-full border border-slate-300 outline-blue-600 px-5 py-4 rounded-md dark:bg-slate-800 dark:border-none dark:outline-none"
                        type="text"
                        placeholder="name"
                        required
                    />
                    <input
                        className="w-full border border-slate-300 outline-blue-600 px-5 py-4 rounded-md dark:bg-slate-800 dark:border-none dark:outline-none"
                        type="email"
                        placeholder="email"
                        required
                    />
                    <textarea
                        rows={6}
                        className="w-full border border-slate-300 outline-blue-600 px-5 py-4 rounded-md dark:bg-slate-800 dark:border-none dark:outline-none"
                        name="message"
                        placeholder="message"
                    ></textarea>
                    <Button className="px-5 py-3 rounded-lg bg-blue-600 font-medium text-white">
                        Send
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
