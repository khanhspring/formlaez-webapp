import { useState } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { changeTheme, selectTheme } from "../../slices/app-config";

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

    return (
        <>
            <div className="sticky top-0 z-40 w-full h-[65px] bg-white border-b border-slate-900/10 dark:bg-gray-900 dark:border-gray-800">
                <div className="flex h-full items-center justify-between">
                    <Breadcrumb />
                    <div className="flex flex-1 gap-2 items-center justify-end px-7">
                        <div className="hidden md:flex flex-1 gap-2 items-center justify-end">
                            <div
                                onClick={onThemeSelect}
                                className="w-9 h-9 p-2 text-lg rounded-full flex items-center justify-center transition cursor-pointer bg-slate-400/10 dark:bg-slate-800/70 hover:bg-slate-400/20 dark:hover:bg-slate-800 group"
                            >
                                {
                                    theme === 'dark' &&
                                    <i className="fi fi-rr-brightness text-slate-500 group-hover:text-blue-500 dark:text-gray-400 dark:group-hover:text-gray-100 transition"></i>
                                }
                                {
                                    theme !== 'dark' &&
                                    <i className="fi fi-rr-moon-stars text-slate-500 group-hover:text-blue-500 dark:text-gray-400 dark:group-hover:text-gray-100 transition"></i>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
