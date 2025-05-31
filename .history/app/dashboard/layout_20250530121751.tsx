import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {

    return (

        <div >
            <Navbar />
            <div className="flex gap-8">
                <Sidebar />



                {children}
            </div>
        </div>
    )

}
