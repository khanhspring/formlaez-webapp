import { useState } from "react";
import { Outlet } from "react-router-dom";
import Drawer from "../../components/drawer/drawer";
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { selectMenuVisible, selectSidebarCollapsed, setMenuVisible, setSidebarCollapsed } from '../../slices/app-config';
import Footer from "./footer";
import Header from "./header";
import SideBar from "./sidebar";

export default function PrimaryLayout() {

    const menuVisible = useAppSelector(selectMenuVisible);
    const dispatch = useAppDispatch();
    const collapsed = useAppSelector(selectSidebarCollapsed);

    const closeMenu = () => {
        dispatch(setMenuVisible(false));
    }

    const setCollapsed = (collapsed: boolean) => {
        dispatch(setSidebarCollapsed(collapsed))
    }

    return (
        <>
            <div className="flex min-h-[100vh] items-stretch">
                <div className={`hidden md:flex h-screen border-r border-r-slate-900/10 bg-zinc-50 dark:bg-cinder-950 dark:border-r-transparent sticky top-0 ${collapsed ? 'w-[80px]' : 'w-[300px]'}`}>
                    <SideBar collapsed={collapsed} setCollapsed={setCollapsed}/>
                </div>
                <div className={`w-full flex flex-col dark:bg-steel-gray-950 ${collapsed ? 'md:w-[calc(100%_-_80px)]' : ' md:w-[calc(100%_-_300px)]'}`}>
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
                className="!bg-zinc-50 dark:!bg-gray-950"
                onClose={closeMenu}
            >
                <SideBar hideCollapse/>
            </Drawer>
        </>
    );
}
