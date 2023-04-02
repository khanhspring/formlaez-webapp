import { Outlet } from "react-router-dom";
import Footer from "./footer";

export default function OnlyFooterLayout() {
    return (
        <div className="flex flex-col min-h-[100vh] w-full">
            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
