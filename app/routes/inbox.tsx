import ChatSection from "@/components/inbox/ChatSection";
import Layout from "~/layouts";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export function meta() {
    return [
        {title: "Inbox"},
        {name: "description", content: "View inbox"},
    ];
}

export default function Inbox() {
    return (
        <Layout>
            <main className="w-full p-6 ">
                <ChatSection/>
            </main>
        </Layout>

    )
}