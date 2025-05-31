import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div >
            <Navbar />

            <div>


                {children}
            </div>
        </div>
    )

}
