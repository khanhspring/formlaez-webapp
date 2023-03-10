import copy from 'copy-to-clipboard';
import Tooltip from 'rc-tooltip';
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Button from '../../components/common/button';
import confirm from '../../components/common/confirm/confirm';
import ButtonAction from "../../components/layout/button-action";
import PageTitle from "../../components/layout/page-title";
import useFormDetail from '../../hooks/form/useFormDetail';
import usePublishForm from '../../hooks/form/usePublishForm';
import { showError } from '../../util/common';
import FormDataTable from './components/form-data-table';
import FormPageMenu from './components/form-page-menu';

function Form() {

    const params = useParams();
    const { data: form, refetch } = useFormDetail(params.formCode);
    const { mutateAsync: publish } = usePublishForm();

    const title = (
        <div className='flex items-center gap-3'>
            {form?.title || ''}
            <span className={
                `text-xs font-normal px-2 py-1 rounded text-white`
                + ` ${form?.status === 'Draft' ? 'bg-yellow-500 dark:bg-yellow-600' : ''}`
                + ` ${form?.status === 'Published' ? 'bg-green-700' : ''}`
            }>{form?.status}</span>
        </div>
    )

    const onPublish = (): Promise<any> => {
        if (!form) {
            return Promise.resolve();
        }
        return publish(form.id, {
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

    const copyShareLink = () => {
        copy(`${process.env.REACT_APP_DOMAIN}/f/v/${params.formCode}`);
        toast.success("Copied");
    }

    return (
        <>
            <div className="w-full h-full flex flex-col gap-2">
                <PageTitle title={title} actions={<FormPageMenu />} />
                {
                    form?.status === 'Draft' &&
                    <div className="flex items-center justify-center flex-1">
                        <div className='max-w-[5] flex flex-col justify-center items-center gap-3 pb-12'>
                            <h2 className='font-lg'>This form hasn't published yet.</h2>
                            <div className='flex justify-center items-center gap-3'>
                                <Link to={`/private/forms/${params.formCode}/edit`}>
                                    <Button>Continue to edit</Button>
                                </Link>
                                <span>or</span>
                                <Button onClick={showPublishConfirm}>
                                    Publish now
                                    <i className="fi fi-rr-paper-plane"></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                }
                {
                    form?.status === 'Published' &&
                    <>
                        <div className="flex items-center justify-between min-h-[40px] mt-3">
                            <div className="flex items-center gap-3">
                                <span>Total 75</span>
                                <div className="relative hidden md:block">
                                    <div className="absolute w-7 h-full flex items-center justify-center text-xs text-gray-500">
                                        <i className="fi fi-rr-search"></i>
                                    </div>
                                    <input placeholder="Search" className="px-1 py-1.5 pl-7 bg-gray-200/70 dark:bg-cinder-700 rounded outline-none text-sm" />
                                </div>
                                <div className="hidden md:flex gap-2 py-1.5 px-3 cursor-pointer text-gray-500 bg-slate-50 dark:bg-cinder-700 rounded items-center justify-center">
                                    <i className="fi fi-rr-calendar text-xs text-gray-500"></i>
                                    <span className="text-sm text-gray-500">All time</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tooltip overlay="Open in new tab" placement='bottom'>
                                    <Link to={`/f/v/${params.formCode}`} target="_blank">
                                        <ButtonAction>
                                            <i className="fi fi-rr-arrow-up-right-from-square"></i>
                                        </ButtonAction>
                                    </Link>
                                </Tooltip>
                                <Tooltip overlay={'Copy link to share'} placement='bottom'>
                                    <ButtonAction onClick={copyShareLink}>
                                        <i className="fi fi-rr-share"></i>
                                    </ButtonAction>
                                </Tooltip>
                                <Tooltip overlay="Upload data" placement='bottom'>
                                    <ButtonAction>
                                        <i className="fi fi-rr-cloud-upload-alt"></i>
                                    </ButtonAction>
                                </Tooltip>
                                <Tooltip overlay="Export" placement='bottom'>
                                    <ButtonAction>
                                        <i className="fi fi-rr-cloud-download-alt"></i>
                                    </ButtonAction>
                                </Tooltip>
                                <Tooltip overlay="Fullscreen" placement='bottom'>
                                    <Link to={`/private/forms/${params.formCode}/full`}>
                                        <ButtonAction>
                                            <i className="fi fi-rr-expand"></i>
                                        </ButtonAction>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="mt-6">
                            <FormDataTable
                                form={form}
                                sticky={{
                                    offsetHeader: 108
                                }}
                            />
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default Form;
