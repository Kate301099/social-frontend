import React from "react";
import LoginForm from "@/components/login/LoginForm";
import type {Route} from "@/.react-router/types/app/routes/+types/home";


export function meta({}: Route.MetaArgs) {
    return [
        { title: "Login Page" },
        { name: "description", content: "Welcome to Social Media" },
    ];
}
export default function LoginPage() {
    return (
        <LoginForm />
    )
}