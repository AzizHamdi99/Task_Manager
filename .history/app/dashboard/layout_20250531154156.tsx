"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/useUser";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { CircularProgress } from "@mui/material";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    const { fetchUser, loading } = useAuthStore();

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="flex gap-8">
                <Sidebar />
                <div className="bg-[#f9f9f9] w-screen m-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
