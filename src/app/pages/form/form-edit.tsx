import { ArrowLeftIcon, Cog6ToothIcon, EyeIcon } from "@heroicons/react/24/outline";
import { MoonIcon, SunIcon, TvIcon } from "@heroicons/react/24/solid";
import Dropdown from "rc-dropdown";
import Menu, { MenuItem } from "rc-menu";
import Tooltip from "rc-tooltip";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/common/button";
import confirm from "../../components/common/confirm/confirm";
import ChatGPTIcon from "../../components/icons/chatgpt-icon";
import FormBuilder from "../../features/form-builder";
import useFormDetail from "../../hooks/form/useFormDetail";
import usePublishForm from "../../hooks/form/usePublishForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { changeTheme, selectTheme } from "../../slices/app-config";
import { showErrorIgnore403 } from "../../util/common";
import AIFormBuilderModal from "./components/ai-form-builder-modal";
import CustomizeEndingModal from "./components/customize-ending-modal";
import { selectForm } from "../../features/form-builder/slice";
import { useHotkeys } from "react-hotkeys-hook";

function FormEdit() {

    const params = useParams();
    const { data: formDetail, refetch } = useFormDetail(params.formCode);
    const [title, setTitle] = useState<string>();
    const { mutateAsync: publish } = usePublishForm();
    const [customizeEndingVisible, setCustomizeEndingVisible] = useState(false);
    const [aiFormBuilderVisible, setAIFormBuilderVisible] = useState(false);
    const navigate = useNavigate();
    const currentForm = useAppSelector(selectForm);

    const currentTheme = useAppSelector(selectTheme);
    const [theme, setTheme] = useState<'dark' | 'light'>(currentTheme);

    const dispatch = useAppDispatch();
    useHotkeys('ctrl+enter, control+enter', () => setAIFormBuilderVisible(true), { preventDefault: true, enabled: true });

    const onThemeSelect = () => {
        if (theme === 'dark') {
            setTheme('light');
            dispatch(changeTheme('light'));
        } else {
            setTheme('dark');
            dispatch(changeTheme('dark'));
        }
    }

    useEffect(() => {
        setTitle(formDetail?.title);
    }, [formDetail])

    const onTitleChange = (title?: string) => {
        setTitle(title);
    }

    const onPublish = (): Promise<any> => {
        if (!formDetail) {
            return Promise.resolve();
        }
        return publish(formDetail.id, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => {
                toast.success('Published form successfully!');
                refetch();
            }
        })
    }

    const showPublishConfirm = () => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure you want to publish this form?',
            onOkAsync: onPublish
        })
    }

    const formTitle = (
        <div className='flex items-center justify-center gap-3 w-full overflow-hidden'>
            <div className="flex items-center justify-center">
                <Tooltip overlay={<div className="max-w-[300px]">{title}</div>} placement="bottom">
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</span>
                </Tooltip>
            </div>
            <div className="flex items-center justify-center gap-3">
                <span className={
                    `text-xs font-normal px-2 py-1 rounded text-white`
                    + ` ${formDetail?.status === 'Draft' ? 'bg-yellow-500 dark:bg-yellow-600' : ''}`
                    + ` ${formDetail?.status === 'Published' ? 'bg-green-700' : ''}`
                    + ` ${formDetail?.status === 'Archived' ? 'bg-rose-700' : ''}`
                }>
                    {formDetail?.status}
                </span>
                {
                    formDetail?.status === 'Archived' &&
                    <Tooltip overlay="Can not edit archived form">
                        <span className="flex items-center gap-1 text-sm text-rose-700">
                            <i className="fi fi-rr-lock"></i>
                        </span>
                    </Tooltip>
                }
            </div>
        </div >
    )

    const settingsMenu = (
        <Menu className="text-sm">
            <MenuItem key="endingPage" onClick={() => setCustomizeEndingVisible(true)}>
                <div className="flex gap-2 items-center">
                    <TvIcon className="w-5 h-5" />
                    <span>Customize ending page</span>
                </div>
            </MenuItem>
        </Menu>
    )

    const back = () => {
        if (!formDetail) {
            return;
        }
        if (formDetail.scope === 'Team') {
            navigate(`/${formDetail?.workspace?.code}/t/${formDetail.team?.code}/f/${formDetail?.code}`);
            return;
        }
        navigate(`/${formDetail?.workspace?.code}/p/f/${formDetail?.code}`);
    }

    return (
        <>
            <div className="px-10 min-h-[55px] flex items-center justify-between sticky top-0 z-50 bg-white border-b border-slate-900/10 dark:border-transparent dark:bg-steel-gray-950">
                <div className="flex items-center flex-1">
                    <span onClick={back} className="py-3 pr-5 flex items-center cursor-pointer">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </span>
                </div>
                <div className="hidden md:flex items-center justify-center flex-1 w-full overflow-hidden">
                    <div className="w-full flex items-center justify-center overflow-hidden">
                        {formTitle}
                    </div>
                </div>
                <div className="flex items-center justify-end flex-1 gap-5">
                    {
                        formDetail?.status === 'Draft' &&
                        <Button onClick={showPublishConfirm}>Publish</Button>
                    }
                    <Link to={`/f/${formDetail?.code}/preview`} target="_blank">
                        <button className="flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
                            <EyeIcon className="w-5 h-5" />
                            <span>Preview</span>
                        </button>
                    </Link>
                    <div
                        onClick={onThemeSelect}
                        className="w-9 h-9 p-2 text-lg rounded-full flex items-center justify-center transition cursor-pointer bg-slate-400/10 dark:bg-slate-800/70 hover:bg-slate-400/20 dark:hover:bg-slate-800 group"
                    >
                        {theme !== 'dark' && <MoonIcon className="w-5 h-5" />}
                        {theme === 'dark' && <SunIcon className="w-5 h-5" />}
                    </div>
                    <Dropdown overlay={settingsMenu} trigger={['click']} placement="bottomRight">
                        <button className="flex items-center gap-1 text-sm opacity-80 hover:opacity-100 h-12" aria-label="Config">
                            <Cog6ToothIcon className="w-5 h-5" />
                        </button>
                    </Dropdown>
                </div>
            </div>
            <div className="flex-1 w-full flex flex-col bg-white dark:bg-steel-gray-950">
                {
                    formDetail &&
                    <FormBuilder initForm={formDetail} onTitleChange={onTitleChange} />
                }
            </div>
            <div className="fixed bottom-20 right-20 flex items-center justify-center flex-col gap-2">
                <div
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-[#4aa181] p-2 cursor-pointer shadow-lg hover:rotate-180 transition"
                    onClick={() => setAIFormBuilderVisible(true)}
                >
                    <ChatGPTIcon className="fill-white text-white" />
                </div>
                <span className="text-xs bg-slate-200 dark:bg-steel-gray-500 px-2 py-1 rounded">Ctrl+Enter</span>
            </div>
            {
                formDetail &&
                <CustomizeEndingModal
                    visible={customizeEndingVisible}
                    formId={formDetail.id}
                    formTitle={formDetail.title}
                    onClose={() => setCustomizeEndingVisible(false)}
                />
            }
            {
                currentForm &&
                <AIFormBuilderModal
                    visible={aiFormBuilderVisible}
                    formDetail={currentForm}
                    onClose={() => setAIFormBuilderVisible(false)}
                />
            }
        </>
    );
}

export default FormEdit;
