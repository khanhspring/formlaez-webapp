import { ArrowRightOnRectangleIcon, FingerPrintIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import Dropdown from 'rc-dropdown';
import Menu, { MenuItem } from 'rc-menu';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux-hook';
import { selectUserInfo } from '../../../slices/auth';
import ChangePasswordModal from './change-password-modal';
import SetupOpenAIApiKeyModal from './setup-openai-api-key-modal';
import SidebarAvatar from './sidebar-avatar';

type Props = {
    collapsed?: boolean;
}

const UserMenu: FC<Props> = ({ collapsed }) => {
    const userInfo = useAppSelector(selectUserInfo);
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
    const [setupOpenAIApiKeyVisible, setSetupOpenAIApiKeyVisible] = useState(false);
    const navigate = useNavigate();

    const onLogout = () => {
        navigate("/logout");
    }

    const userMenu = (
        <Menu className="text-sm">
            <MenuItem key="setUpOpenAIApiKey" onClick={() => setSetupOpenAIApiKeyVisible(true)}>
                <div className="flex gap-3 items-center">
                    <LightBulbIcon className='w-5 h-5' />
                    <span>Setup OpenAI API Key</span>
                </div>
            </MenuItem>
            <MenuItem key="changePassword" onClick={() => setChangePasswordVisible(true)}>
                <div className="flex gap-3 items-center">
                    <FingerPrintIcon className='w-5 h-5' />
                    <span>Change password</span>
                </div>
            </MenuItem>
            <MenuItem key="logout" onClick={onLogout}>
                <div className="flex gap-3 items-center">
                    <ArrowRightOnRectangleIcon className='w-5 h-5' />
                    <span>Logout</span>
                </div>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Dropdown overlay={userMenu}>
                <div className="p-3 rounded flex items-center gap-2 group cursor-pointer border border-zinc-300 dark:border-neutral-800">
                    <SidebarAvatar name={userInfo?.firstName + ' ' + userInfo?.lastName} className="ring-cyan-400/50 group-hover:ring-2" />
                    {
                        !collapsed &&
                        <div className='flex flex-col'>
                            <span className="text-sm font-semibold">{userInfo?.firstName + ' ' + userInfo?.lastName}</span>
                            <span className="text-xs font-light text-zinc-700 dark:text-zinc-400">{userInfo?.email}</span>
                        </div>
                    }
                </div>
            </Dropdown>
            <ChangePasswordModal
                visible={changePasswordVisible}
                onClose={() => setChangePasswordVisible(false)}
            />
            <SetupOpenAIApiKeyModal
                visible={setupOpenAIApiKeyVisible}
                onClose={() => setSetupOpenAIApiKeyVisible(false)}
            />
        </>
    );
}

export default UserMenu;
