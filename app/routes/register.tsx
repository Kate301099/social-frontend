import type {Route} from "@/.react-router/types/app/routes/+types/home";
import RegisterCard from "@/components/register/RegisterCard";
import React from "react";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Register Page" },
        { name: "description", content: "Welcome to Social Media" },
    ];
}

export default function RegisterPage() {
    return (
        <RegisterCard />
    )
}