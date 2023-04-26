import { Outlet } from "react-router-dom";
import Drawer from "../../components/drawer/drawer";
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { selectMenuVisible, setMenuVisible } from '../../slices/app-config';
import Footer from "./footer";
import Header from "./header";
import SideBar from "./sidebar";

export default function PrimaryLayout() {

    const menuVisible = useAppSelector(selectMenuVisible);
    const dispatch = useAppDispatch();

    const closeMenu = () => {
        dispatch(setMenuVisible(false));
    }

    return (
        <>
            <div className="flex min-h-[100vh] items-stretch">
                <div className="w-[320px] hidden md:flex min-h-screen bg-gray-950 sticky top-0">
                    <SideBar />
                </div>
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
            <Drawer
                open={menuVisible}
                closeIcon={null}
                placement="left"
                bodyWrapperClassName="!p-0"
                className="!bg-gray-950"
                onClose={closeMenu}
            >
                <SideBar />
            </Drawer>
        </>
    );
}
