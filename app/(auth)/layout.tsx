import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="ml-10 mt-8">

            <div>


                {children}
            </div>
        </div>
    )

}
