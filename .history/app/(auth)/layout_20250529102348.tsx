import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="mr-10">

            <div>


                {children}
            </div>
        </div>
    )

}
