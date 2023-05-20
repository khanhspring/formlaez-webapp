import copy from "copy-to-clipboard";
import { QRCodeSVG } from 'qrcode.react';
import Dropdown from "rc-dropdown";
import Menu, { MenuItem } from "rc-menu";
import Switch from "rc-switch";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/common/button";
import confirm from "../../components/common/confirm/confirm";
import PageTitle from "../../components/layout/page-title";
import useArchiveForm from "../../hooks/form/useArchiveForm";
import useForm from "../../hooks/form/useForm";
import usePublishForm from "../../hooks/form/usePublishForm";
import useRemoveForm from "../../hooks/form/useRemoveForm";
import useUpdateFormSettings from "../../hooks/form/useUpdateFormSettings";
import { UpdateFormSettingsRequest } from "../../models/form";
import { showErrorIgnore403 } from "../../util/common";
import { firstLetters } from "../../util/string-utils";
import FormPageMenu from "./components/form-page-menu";
import FormPageTitle from "./components/form-page-title";
import FormPageTitlePrefix from "./components/form-page-title-prefix";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import Tooltip from "rc-tooltip";
import { Workspace } from "../../models/workspace";
import { Team } from "../../models/team";

type Settings = {
    acceptResponses?: boolean;
    allowPrinting?: boolean;
    allowResponseEditing?: boolean;
    sharingScope?: 'Private' | 'Public' | 'Authenticated'
}

function FormSettings() {

    const params = useParams();
    const navigate = useNavigate();
    const { data: form, refetch } = useForm(params.formCode);
    const { mutateAsync: archive } = useArchiveForm();
    const { mutateAsync: publish } = usePublishForm();
    const { mutateAsync: remove } = useRemoveForm();
    const { mutateAsync: updateSettings } = useUpdateFormSettings();

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const team = useRouteLoaderData("team") as Team;

    const [settings, setSettings] = useState<Settings>();

    useEffect(() => {
        setSettings({
            acceptResponses: form?.acceptResponses,
            allowPrinting: form?.allowPrinting,
            allowResponseEditing: form?.allowResponseEditing,
            sharingScope: form?.sharingScope
        });
    }, [form]);

    const onSettingChange = (setting: any) => {
        if (!form) {
            return;
        }
        setSettings({ ...settings, ...setting });
        const request: UpdateFormSettingsRequest = {
            id: form.id,
            ...settings,
            ...setting,
        }
        updateSettings({ ...request, ...setting }, {
            onError: (e) => showErrorIgnore403(e)
        })
    }

    const updateSharingScope = (sharingScope: 'Private' | 'Public' | 'Authenticated') => {
        setSettings({ ...settings, sharingScope });
        onSettingChange({ sharingScope });
    }

    const onArchive = (): Promise<any> => {
        if (!form) {
            return Promise.resolve();
        }
        return archive(form.id, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => {
                toast.success('Archived form successfully!');
                refetch();
            }
        })
    }

    const showArchiveConfirm = () => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure you want to archive this form?',
            onOkAsync: onArchive
        })
    }

    const onUnarchive = (): Promise<any> => {
        if (!form) {
            return Promise.resolve();
        }
        return publish(form.id, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => {
                toast.success('Unarchived form successfully!');
                refetch();
            }
        })
    }

    const showUnarchiveConfirm = () => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure you want to unarchive this form?',
            onOkAsync: onUnarchive
        })
    }

    const onConfirmRemove = (): Promise<any> => {
        if (!form) {
            return Promise.resolve();
        }
        return remove(form.id, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => {
                toast.success('Deleted form successfully!');
                if (form.scope === 'Team') {
                    navigate(`/${workspace?.code}/t/${team?.code}`);
                    return;
                }
                navigate(`/${workspace?.code}/p`);
            }
        })
    }

    const showRemoveDoubleConfirm = () => {
        confirm({
            title: 'Continue',
            content: <>This action cannot be undone. This will delete the <strong>{form?.title}</strong> form and remove all submissions of the form.</>,
            onOkAsync: onConfirmRemove,
            okText: 'I understand the consequences, delete this repository',
            width: 550,
            danger: true
        })
    }

    const showRemoveConfirm = () => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure you want to delete this form?',
            onOk: showRemoveDoubleConfirm
        })
    }

    const sharingScopeMenu = (
        <Menu className="text-sm">
            <MenuItem key="public" onClick={() => updateSharingScope('Public')}>
                <div className="flex gap-2 items-start">
                    <div className="pt-1">
                        <i className="fi fi-rr-world"></i>
                    </div>
                    <div className="flex flex-col">
                        <span>Public</span>
                        <span className="italic text-xs font-light">
                            Everyone can access and submit this form
                        </span>
                    </div>
                </div>
            </MenuItem>
            <MenuItem key="authenticated" onClick={() => updateSharingScope('Authenticated')}>
                <div className="flex gap-2 items-start">
                    <div className="pt-1">
                        <i className="fi fi-rr-users-alt"></i>
                    </div>
                    <div className="flex flex-col">
                        <span>Authenticated</span>
                        <span className="italic text-xs font-light">
                            Only logged in users can access and submit this form
                        </span>
                    </div>
                </div>
            </MenuItem>
            <MenuItem key="private" onClick={() => updateSharingScope('Private')}>
                <div className="flex gap-2 items-start">
                    <div className="pt-1">
                        <i className="fi fi-rr-user"></i>
                    </div>
                    <div className="flex flex-col">
                        <span>Private</span>
                        {
                            form?.scope === 'Team' &&
                            <span className="italic text-xs font-light">
                                Only owner or the team member can access and submit this form
                            </span>
                        }
                        {
                            form?.scope === 'Private' &&
                            <span className="italic text-xs font-light">
                                Only owner can access and submit this form
                            </span>
                        }
                    </div>
                </div>
            </MenuItem>
        </Menu>
    )

    const sharingScopeDropdownContent = (disabled: boolean) => (
        <>
            <button className={
                `flex items-center gap-1 px-2.5 h-8 rounded bg-slate-200 dark:bg-steel-gray-800 text-sm`
                + ` ${disabled ? 'cursor-not-allowed opacity-90' : ''}`
            }>
                {
                    settings?.sharingScope === 'Public' &&
                    <div className="flex justify-center items-center gap-2">
                        <i className="fi fi-rr-world"></i>
                        <span>Public</span>
                    </div>
                }
                {
                    settings?.sharingScope === 'Private' &&
                    <div className="flex justify-center items-center gap-2">
                        <i className="fi fi-rr-user"></i>
                        <span>Private</span>
                    </div>
                }
                {
                    settings?.sharingScope === 'Authenticated' &&
                    <div className="flex justify-center items-center gap-2">
                        <i className="fi fi-rr-users-alt"></i>
                        <span>Authenticated</span>
                    </div>
                }
                <i className="fi fi-rr-caret-down"></i>
            </button>
        </>
    )

    const copyShareLink = () => {
        copy(`${process.env.REACT_APP_DOMAIN}/f/v/${params.formCode}`);
        toast.success("Copied");
    }

    const archived = form?.status === 'Archived';

    return (
        <div className="w-full flex flex-col gap-2">
            <PageTitle
                title={<FormPageTitle form={form} />}
                actions={<FormPageMenu form={form} />}
                shortTitle={firstLetters(form?.title)?.toUpperCase()}
                prefix={<FormPageTitlePrefix form={form} />}
            />
            <div className="mt-6 flex flex-col gap-6">
                <h2 className="pb-1 border-b border-slate-900/10 dark:border-gray-800">Sharing</h2>
                <div className="flex items-center gap-2">
                    <div className="px-2 py-1.5 rounded border border-slate-900/10 dark:border-gray-800 text-sm">
                        {`${process.env.REACT_APP_DOMAIN}/f/v/${params.formCode}`}
                    </div>
                    <Button onClick={copyShareLink} className="hidden lg:block whitespace-nowrap">Copy link to share</Button>
                    <Tooltip overlay="Copy link to share" placement="bottom" showArrow={false}>
                        <span onClick={copyShareLink} className="lg:hidden block cursor-pointer">
                            <DocumentDuplicateIcon className="w-6 h-6" />
                        </span>
                    </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                    <div className="p-2 rounded bg-slate-100 dark:bg-white">
                        <QRCodeSVG value={`${process.env.REACT_APP_DOMAIN}/f/v/${params.formCode}`} />
                    </div>
                    <p className="text-sm">Or scan this QR</p>
                </div>

                <h2 className="pb-1 border-b border-slate-900/10 dark:border-gray-800 mt-3">Settings</h2>
                <div className="flex items-center justify-between gap-10 px-2 py-1 hover:bg-slate-50 dark:hover:bg-steel-gray-900 rounded transition">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Access scope</h3>
                        <p className="text-xs font-light italic">
                            Customize access scope for this form
                        </p>
                    </div>
                    <div className="flex items-center">
                        {
                            archived &&
                            <>
                                {sharingScopeDropdownContent(true)}
                            </>
                        }
                        {
                            !archived &&
                            <Dropdown overlay={sharingScopeMenu} trigger={['click']} placement="bottomRight">
                                <div>
                                    {sharingScopeDropdownContent(false)}
                                </div>
                            </Dropdown>
                        }
                    </div>
                </div>
                <div className="flex items-center justify-between gap-10 px-2 py-1 hover:bg-slate-50 dark:hover:bg-steel-gray-900 rounded transition">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Accepting responses</h3>
                        <p className="text-xs font-light italic">
                            When disabled, no one can access or submit this form
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Switch
                            disabled={archived}
                            checked={settings?.acceptResponses}
                            onChange={val => onSettingChange({ acceptResponses: val })}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between gap-10 px-2 py-1 hover:bg-slate-50 dark:hover:bg-steel-gray-900 rounded transition">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Allow response editing</h3>
                        <p className="text-xs font-light italic">
                            Submissions can be changed after being submitted
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Switch
                            disabled={archived}
                            checked={settings?.allowResponseEditing}
                            onChange={val => onSettingChange({ allowResponseEditing: val })}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between gap-10 px-2 py-1 hover:bg-slate-50 dark:hover:bg-steel-gray-900 rounded transition">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Allow to merge document</h3>
                        <p className="text-xs font-light italic">
                            Submitters can merge their submission and download files based on the document templates as soon as they submit this form.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Switch
                            disabled={archived}
                            checked={settings?.allowPrinting}
                            onChange={val => onSettingChange({ allowPrinting: val })}
                        />
                    </div>
                </div>

                <h2 className="pb-1 border-b border-slate-900/10 dark:border-gray-800 mt-3">Danger zone</h2>
                {
                    !archived &&
                    <div className="flex items-center justify-between gap-10 px-2 py-1 hover:bg-slate-50 dark:hover:bg-steel-gray-900 rounded transition">
                        <div className="flex flex-col gap-0.5">
                            <h3 className="text-sm">Archive this form</h3>
                            <p className="text-xs font-light italic">
                                Mark this form as archived and read-only (you can unarchive later).
                            </p>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={showArchiveConfirm}
                                className="flex items-center gap-1 px-2.5 h-8 rounded border border-rose-700 hover:bg-rose-700 hover:text-white dark:border-transparent dark:bg-slate-700 dark:hover:bg-rose-700 text-sm text-rose-700 whitespace-nowrap"
                            >
                                <span>Archive this form</span>
                            </button>
                        </div>
                    </div>
                }
                {
                    archived &&
                    <div className="flex items-center justify-between gap-10 px-2 py-1 hover:bg-slate-50 dark:hover:bg-steel-gray-900 rounded transition">
                        <div className="flex flex-col gap-0.5">
                            <h3 className="text-sm">Unarchive this form</h3>
                            <p className="text-xs font-light italic">
                                Mark this form as published and read-write.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={showUnarchiveConfirm}
                                className="flex items-center gap-1 px-2.5 h-8 rounded border border-rose-700 hover:bg-rose-700 hover:text-white dark:border-transparent dark:bg-slate-700 dark:hover:bg-rose-700 text-sm text-rose-700 whitespace-nowrap"
                            >
                                <span>Unarchive this form</span>
                            </button>
                        </div>
                    </div>
                }
                <div className="flex items-center justify-between gap-10 px-2 py-1 hover:bg-slate-50 dark:hover:bg-steel-gray-900 rounded transition">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Delete this form</h3>
                        <p className="text-xs font-light italic">
                            Once you delete this form, there is no going back, all submissions to this form will also be deleted. Please be certain.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={showRemoveConfirm}
                            className="flex items-center gap-1 px-2.5 h-8 rounded border border-rose-700 hover:bg-rose-700 hover:text-white dark:border-transparent dark:bg-slate-700 dark:hover:bg-rose-700 text-sm text-rose-700 whitespace-nowrap"
                        >
                            <span>Delete this form</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormSettings;
