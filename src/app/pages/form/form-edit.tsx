import Tooltip from "rc-tooltip";
import { useState, useEffect } from "react";
import { Link, useParams, useRouteLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/common/button";
import confirm from "../../components/common/confirm/confirm";
import FormBuilder from "../../features/form-builder";
import useFormDetail from "../../hooks/form/useFormDetail";
import usePublishForm from "../../hooks/form/usePublishForm";
import { Workspace } from "../../models/workspace";
import { showError } from "../../util/common";

function FormEdit() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const params = useParams();
    const { data: formDetail, refetch } = useFormDetail(params.formCode);
    const [title, setTitle] = useState<string>();
    const { mutateAsync: publish } = usePublishForm();

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
            onError: showError,
            onSuccess: () => {
                toast.success('Published form successfully!');
                refetch();
            }
        })
    }

    const showPublishConfirm = () => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure to publish this form?',
            onOkAsync: onPublish
        })
    }

    const formTitle = (
        <h1 className='flex items-center justify-center gap-3 w-full overflow-hidden'>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</span>
            <span className={
                `text-xs font-normal px-2 py-1 rounded text-white`
                + ` ${formDetail?.status === 'Draft' ? 'bg-yellow-500 dark:bg-yellow-600' : ''}`
                + ` ${formDetail?.status === 'Published' ? 'bg-green-700' : ''}`
                + ` ${formDetail?.status === 'Archived' ? 'bg-rose-700' : ''}`
            }>{formDetail?.status}</span>
        </h1>
    )

    return (
        <>
            <div className="px-10 py-3 flex items-center justify-between sticky top-0 z-50 bg-white border-b border-slate-900/10 dark:border-transparent dark:bg-cinder-700">
                <div className="flex items-center flex-1">
                    <Link to={`/${workspace.code}/private/forms/${formDetail?.code}`} className="flex items-center text-lg">
                        <i className="fi fi-rr-arrow-left"></i>
                    </Link>
                </div>
                <div className="flex items-center justify-center flex-1 w-full overflow-hidden">
                    <Tooltip overlay={<div className="max-w-[300px]">{title}</div>} placement="bottom">
                        <div className="w-full flex items-center justify-center overflow-hidden">
                            {formTitle}
                        </div>
                    </Tooltip>
                </div>
                <div className="flex items-center justify-end flex-1 gap-5">
                    {
                        formDetail?.status === 'Draft' &&
                        <Button onClick={showPublishConfirm}>Publish</Button>
                    }
                    <Link to={`/${workspace.code}/private/forms/${formDetail?.code}/preview`} target="_blank">
                        <button className="flex items-center gap-1 text-sm">
                            <i className="fi fi-rr-eye"></i>
                            <span>Preview</span>
                        </button>
                    </Link>
                    {
                        formDetail?.status === 'Archived' &&
                        <Tooltip overlay="Can not edit archived form">
                            <span className="flex items-center gap-1 text-sm text-rose-700">
                                <i className="fi fi-rr-lock"></i>
                            </span>
                        </Tooltip>
                    }
                </div>
            </div>
            <div className="w-full flex flex-col pb-72">
                {
                    formDetail &&
                    <FormBuilder initForm={formDetail} onTitleChange={onTitleChange} />
                }
            </div>
        </>
    );
}

export default FormEdit;
