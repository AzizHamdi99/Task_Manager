"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/useUser";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { CircularProgress } from "@mui/material";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
    const { fetchUser, user, loading } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        fetchUser();
    }, []);

    // Redirection si pas d'utilisateur
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading]);

    if (loading || !user) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="bg-[#f9f9f9] w-screen w-4/5">
                    {children}
                </div>
            </div>
        </div>
    );
}
