import { useState, useEffect } from "react";
import Dropdown from "rc-dropdown";
import Menu, { MenuItem } from "rc-menu";
import Switch from "rc-switch";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import confirm from "../../components/common/confirm/confirm";
import PageTitle from "../../components/layout/page-title";
import useArchiveForm from "../../hooks/form/useArchiveForm";
import useUpdateFormSettings from "../../hooks/form/useUpdateFormSettings";
import useForm from "../../hooks/form/useForm";
import usePublishForm from "../../hooks/form/usePublishForm";
import useRemoveForm from "../../hooks/form/useRemoveForm";
import { showError } from "../../util/common";
import FormPageMenu from "./components/form-page-menu";
import FormPageTitle from "./components/form-page-title";
import { UpdateFormSettingsRequest } from "../../models/form";

function FormSettings() {
    const params = useParams();
    const navigate = useNavigate();
    const { data: form, refetch } = useForm(params.formCode);
    const { mutateAsync: archive } = useArchiveForm();
    const { mutateAsync: publish } = usePublishForm();
    const { mutateAsync: remove } = useRemoveForm();
    const { mutateAsync: updateSettings } = useUpdateFormSettings();

    const [sharingScope, setSharingScope] = useState<'Private' | 'Public'>();

    useEffect(() => {
        setSharingScope(form?.sharingScope);
    }, [form]);

    const onSettingChange = (setting: any) => {
        if (!form) {
            return;
        }
        const request: UpdateFormSettingsRequest = {
            id: form.id,
            acceptResponses: form.acceptResponses,
            allowPrinting: form.allowPrinting,
            allowResponseEditing: form.allowResponseEditing,
            sharingScope: form.sharingScope
        }
        updateSettings({...request, ...setting}, {
            onError: showError
        }).finally(refetch)
    }

    const onArchive = (): Promise<any> => {
        if (!form) {
            return Promise.resolve();
        }
        return archive(form.id, {
            onError: showError,
            onSuccess: () => {
                toast.success('Archived form successfully!');
                refetch();
            }
        })
    }

    const showArchiveConfirm = () => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure to archive this form?',
            onOkAsync: onArchive
        })
    }

    const onUnarchive = (): Promise<any> => {
        if (!form) {
            return Promise.resolve();
        }
        return publish(form.id, {
            onError: showError,
            onSuccess: () => {
                toast.success('Unarchived form successfully!');
                refetch();
            }
        })
    }

    const showUnarchiveConfirm = () => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure to unarchive this form?',
            onOkAsync: onUnarchive
        })
    }

    const onConfirmRemove = (): Promise<any> => {
        if (!form) {
            return Promise.resolve();
        }
        return remove(form.id, {
            onError: showError,
            onSuccess: () => {
                toast.success('Deleted form successfully!');
                navigate(`/`);
            }
        })
    }

    const showRemoveDoubleConfirm = () => {
        confirm({
            title: 'Continue',
            content: <>This action cannot be undone. This will permanently delete the <strong>{form?.title}</strong> form and remove all responses of the form.</>,
            onOkAsync: onConfirmRemove,
            okText: 'I understand the consequences, delete this repository',
            width: 520,
            danger: true
        })
    }

    const showRemoveConfirm = () => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure to delete this form?',
            onOk: showRemoveDoubleConfirm
        })
    }

    const sharingScopeMenu = (
        <Menu className="text-sm">
            <MenuItem key="public" onClick={() => setSharingScope('Public')}>
                <div className="flex gap-2 items-center">
                    <i className="fi fi-rr-world"></i>
                    <span>Public</span>
                </div>
            </MenuItem>
            <MenuItem key="private" onClick={() => setSharingScope('Private')}>
                <div className="flex gap-2 items-center">
                    <i className="fi fi-rr-user"></i>
                    <span>Private</span>
                </div>
            </MenuItem>
        </Menu>
    )

    const sharingScopeDropdownContent = (disabled: boolean) => (
        <>
            <button className={
                `flex items-center gap-1 px-2.5 h-8 rounded bg-slate-200 dark:bg-cinder-700 text-sm`
                + ` ${disabled ? 'cursor-not-allowed opacity-90' : ''}`
            }>
                {
                    sharingScope === 'Public' &&
                    <div className="flex justify-center items-center gap-2">
                        <i className="fi fi-rr-world"></i>
                        <span>Public</span>
                    </div>
                }
                {
                    sharingScope === 'Private' &&
                    <div className="flex justify-center items-center gap-2">
                        <i className="fi fi-rr-user"></i>
                        <span>Private</span>
                    </div>
                }
                <i className="fi fi-rr-caret-down"></i>
            </button>
        </>
    )

    const archived = form?.status === 'Archived';

    return (
        <div className="w-full flex flex-col gap-2">
            <PageTitle title={<FormPageTitle form={form} />} actions={<FormPageMenu />} />
            <div className="mt-6 flex flex-col gap-6">
                <h2 className="pb-1 border-b border-slate-900/10 dark:border-cinder-700">Settings</h2>
                <div className="flex items-center justify-between gap-10">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Access scope</h3>
                        <p className="text-xs">
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
                <div className="flex items-center justify-between gap-10">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Accepting responses</h3>
                        <p className="text-xs">
                            When disabled, users cannot access this form and cannot submit the response
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Switch disabled={archived} />
                    </div>
                </div>
                <div className="flex items-center justify-between gap-10">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Allow response editing</h3>
                        <p className="text-xs">
                            Responses can be changed after being submitted
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Switch disabled={archived} />
                    </div>
                </div>
                <div className="flex items-center justify-between gap-10">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Allow to print</h3>
                        <p className="text-xs">
                            Users can download PDF files (based on print templates) as soon as they submit the response
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Switch disabled={archived} />
                    </div>
                </div>

                <h2 className="pb-1 border-b border-slate-900/10 dark:border-cinder-700 mt-3">Danger zone</h2>
                {
                    !archived &&
                    <div className="flex items-center justify-between gap-10">
                        <div className="flex flex-col gap-0.5">
                            <h3 className="text-sm">Archive this form</h3>
                            <p className="text-xs">
                                Mark this form as archived and read-only
                            </p>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={showArchiveConfirm}
                                className="flex items-center gap-1 px-2.5 h-8 rounded border border-rose-700 hover:bg-rose-700 hover:text-white dark:border-transparent dark:bg-cinder-700 dark:hover:bg-rose-700 text-sm text-rose-700 whitespace-nowrap"
                            >
                                <span>Archive this form</span>
                            </button>
                        </div>
                    </div>
                }
                {
                    archived &&
                    <div className="flex items-center justify-between gap-10">
                        <div className="flex flex-col gap-0.5">
                            <h3 className="text-sm">Unarchive this form</h3>
                            <p className="text-xs">
                                Mark this form as published and read-write.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={showUnarchiveConfirm}
                                className="flex items-center gap-1 px-2.5 h-8 rounded border border-rose-700 hover:bg-rose-700 hover:text-white dark:border-transparent dark:bg-cinder-700 dark:hover:bg-rose-700 text-sm text-rose-700 whitespace-nowrap"
                            >
                                <span>Unarchive this form</span>
                            </button>
                        </div>
                    </div>
                }
                <div className="flex items-center justify-between gap-10">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Delete this form</h3>
                        <p className="text-xs">
                            Once you delete this form, there is no going back, all responses to this form will also be deleted. Please be certain
                        </p>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={showRemoveConfirm}
                            className="flex items-center gap-1 px-2.5 h-8 rounded border border-rose-700 hover:bg-rose-700 hover:text-white dark:border-transparent dark:bg-cinder-700 dark:hover:bg-rose-700 text-sm text-rose-700 whitespace-nowrap"
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
