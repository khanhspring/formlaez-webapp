import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { changeTheme, selectTheme, setMenuVisible } from "../../slices/app-config";

function Header() {

    const currentTheme = useAppSelector(selectTheme);
    const [theme, setTheme] = useState<'dark' | 'light'>(currentTheme);

    const dispatch = useAppDispatch();

    const onThemeSelect = () => {
        if (theme === 'dark') {
            setTheme('light');
            dispatch(changeTheme('light'));
        } else {
            setTheme('dark');
            dispatch(changeTheme('dark'));
        }
    }

    const openMenu = () => {
        dispatch(setMenuVisible(true));
    }

    return (
        <>
            <div className="sticky top-0 z-40 w-full h-[65px] bg-white dark:bg-steel-gray-950">
                <div className="flex h-full items-center justify-between">
                    <Breadcrumb />
                    <div className="flex flex-1 gap-2 items-center justify-end px-7">
                        <div className="flex-1 flex gap-2 items-center justify-end">
                            <div
                                onClick={onThemeSelect}
                                className="w-9 h-9 p-2 text-lg rounded-full flex items-center justify-center transition cursor-pointer bg-slate-400/10 dark:bg-slate-800/70 hover:bg-slate-400/20 dark:hover:bg-slate-800 group"
                            >
                                {theme !== 'dark' && <MoonIcon className="w-5 h-5"/>}
                                {theme === 'dark' && <SunIcon className="w-5 h-5"/>}
                            </div>
                            <div
                                onClick={openMenu}
                                className="md:hidden flex w-9 h-9 p-2 text-lg rounded-full items-center justify-center transition cursor-pointer bg-slate-400/10 dark:bg-slate-800/70 hover:bg-slate-400/20 dark:hover:bg-slate-800 group"
                            >
                                <Bars3Icon className="w-5 h-5"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
