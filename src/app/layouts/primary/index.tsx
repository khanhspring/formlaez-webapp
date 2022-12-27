import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import SideBar from "./sidebar";

export default function PrimaryLayout() {
    return (
        <>
            <div className="flex min-h-[100vh] items-stretch">
                <SideBar />
                <div className="flex-1 flex flex-col dark:bg-cinder-900">
                    <Header />
                    <main className="flex-1 w-full py-7 px-7">
                        <Outlet />
                    </main>
                    <div className="w-full">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}
