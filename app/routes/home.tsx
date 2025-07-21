import type {Route} from "./+types/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "~/layouts";
import * as React from "react";
import NewsFeedList from "@/components/homepage/NewsFeedList";


export function meta({}: Route.MetaArgs) {
    return [
        {title: "Social Media"},
        {name: "description", content: "Welcome to React Router!"},
    ];
}

export default function Home() {
    return (
        <Layout>
            <NewsFeedList/>
        </Layout>
    );
}
