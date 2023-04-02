import Dropdown from "rc-dropdown";
import Menu, { MenuItem } from "rc-menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../components/common/avatar";
import Breadcrumb from "../../components/common/breadcrumb";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { changeTheme, selectTheme } from "../../slices/app-config";
import { selectUserInfo } from "../../slices/auth";
import ChangePasswordModal from "./components/change-password-modal";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function Header() {

    const currentTheme = useAppSelector(selectTheme);
    const userInfo = useAppSelector(selectUserInfo);
    const [theme, setTheme] = useState<'dark' | 'light'>(currentTheme);
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onThemeSelect = () => {
        if (theme === 'dark') {
            setTheme('light');
            dispatch(changeTheme('light'));
        } else {
            setTheme('dark');
            dispatch(changeTheme('dark'));
        }
    }

    const onLogout = () => {
        navigate("/logout");
    }

    const userMenu = (
        <div className="flex flex-col rounded bg-slate-50 dark:bg-gray-800">
            <div className="w-full px-4 py-3 flex flex-col gap-1">
                <span className="font-bold text-sm">{userInfo?.firstName} {userInfo?.lastName}</span>
                {
                    userInfo?.email &&
                    <span className="text-xs">{userInfo?.email}</span>
                }
            </div>
            <div className="w-full border-t border-slate-900/10 dark:border-slate-700">
                <Menu className="text-sm box-shadow-none">
                    <MenuItem key="changePassword" onClick={() => setChangePasswordVisible(true)}>
                        <div className="flex gap-3 items-center">
                            <i className="fi fi-rr-fingerprint"></i>
                            <span>Change password</span>
                        </div>
                    </MenuItem>
                    <MenuItem key="logout" onClick={onLogout}>
                        <div className="flex gap-3 items-center">
                            <i className="fi fi-rr-sign-out-alt"></i>
                            <span>Logout</span>
                        </div>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )

    return (
        <>
            <div className="sticky top-0 z-40 w-full h-[65px] bg-white border-b border-slate-900/10 dark:bg-gray-900 dark:border-gray-800">
                <div className="flex h-full items-center justify-between">
                    <Breadcrumb />
                    <div className="flex flex-1 gap-2 items-center justify-end px-7">
                        <div className="hidden md:flex flex-1 gap-2 items-center justify-end pr-4 border-r border-slate-900/10 dark:border-gray-700">
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
                        <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
                            <div className="p-1 rounded ml-2 flex items-center gap-1.5 group cursor-pointer">
                                <Avatar name={userInfo?.firstName + ' ' + userInfo?.lastName} className="w-8 h-8 group-hover:ring-2" />
                                <span className="text-sm font-semibold">{userInfo?.firstName + ' ' + userInfo?.lastName}</span>
                                <ChevronDownIcon className="w-4 h-4"/>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <ChangePasswordModal
                visible={changePasswordVisible}
                onClose={() => setChangePasswordVisible(false)}
            />
        </>
    );
}

export default Header;
