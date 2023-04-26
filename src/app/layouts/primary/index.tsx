import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import SideBar from "./sidebar";

export default function PrimaryLayout() {

    return (
        <>
            <div className="flex min-h-[100vh] items-stretch">
                <SideBar />
                <div className="w-full md:w-[calc(100%_-_320px)] flex flex-col dark:bg-gray-900">
                    <Header />
                    <main className="w-full flex-1 py-7 px-7 flex flex-col">
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
