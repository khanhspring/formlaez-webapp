import { Link, useParams, useRouteLoaderData } from "react-router-dom";
import { toast } from 'react-toastify';
import Button from '../../components/common/button';
import confirm from '../../components/common/confirm/confirm';
import PageTitle from "../../components/layout/page-title";
import useFormDetail from '../../hooks/form/useFormDetail';
import usePublishForm from '../../hooks/form/usePublishForm';
import { Workspace } from '../../models/workspace';
import { showError } from '../../util/common';
import FormDataTable from './components/form-data-table';
import FormPageMenu from './components/form-page-menu';
import FormPageTitle from './components/form-page-title';

function Form() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const params = useParams();
    const { data: form, refetch } = useFormDetail(params.formCode);
    const { mutateAsync: publish } = usePublishForm();

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


    return (
        <>
            <div className="w-full h-full flex flex-col gap-2">
                <PageTitle title={<FormPageTitle form={form} />} actions={<FormPageMenu />} />
                {
                    form?.status === 'Draft' &&
                    <div className="flex items-center justify-center flex-1">
                        <div className='max-w-[5] flex flex-col justify-center items-center gap-3 pb-12'>
                            <h2 className='font-lg'>This form hasn't published yet.</h2>
                            <div className='flex justify-center items-center gap-3'>
                                <Link to={`/${workspace.code}/private/forms/${params.formCode}/edit`}>
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
                    form?.status !== 'Draft' &&
                    <>
                        <div className="mt-3">
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
