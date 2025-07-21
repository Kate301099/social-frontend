import UserProfileCard from "@/components/profile/UserProfileCard";
import Layout from "~/layouts";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export function meta() {
    return [
        { title: "My Profile" },
        { name: "description", content: "View your personal profile and settings" },
    ];
}

export  default function Profile() {
    return (
        <Layout>
            <main className="w-full p-6 ">
                <UserProfileCard />
            </main>
        </Layout>
    )
}