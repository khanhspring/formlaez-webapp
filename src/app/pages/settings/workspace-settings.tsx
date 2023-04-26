import RcForm from 'rc-field-form';
import { useRevalidator, useRouteLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/common/button';
import Input from '../../components/form/form-controls/input';
import FormItem from '../../components/form/form-item';
import useUpdateWorkspace from '../../hooks/workspace/useUpdateWorkspace';
import { UpdateWorkspaceRequest, Workspace } from '../../models/workspace';
import { showErrorIgnore403 } from '../../util/common';
import FormItemLabel from '../../components/form/form-item-label';

function WorkspaceSettings() {
    const workspace = useRouteLoaderData("workspace") as Workspace;
    let revalidator = useRevalidator();

    const { mutateAsync: update, isLoading } = useUpdateWorkspace();

    const [rcForm] = RcForm.useForm();
    const onFinish = (values: any) => {
        const request: UpdateWorkspaceRequest = {
            id: workspace.id,
            name: values.name,
            description: values.description
        }
        update(request, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => {
                toast.success("Updated workspace successfully!");
                revalidator.revalidate();
            }
        });
    }

    return (
        <div className="mt-6 flex flex-col gap-6">
            <h2 className="pb-1 border-b border-slate-900/10 dark:border-gray-800">Settings</h2>
            <div className='w-full'>
                <div className='m-auto'>
                    <RcForm
                        onFinish={onFinish}
                        form={rcForm}
                        initialValues={{ ...workspace }}
                    >
                        <div className='flex flex-col lg:flex-row'>
                            <label className='min-w-fit w-4/12 leading-9'>
                                Workspace name
                            </label>
                            <FormItem
                                name={'name'}
                                rules={[
                                    { required: true, message: "This field is required" },
                                ]}
                                help="You can use your organization or company name. Keep it simple."
                            >
                                <Input placeholder="Name" maxLength={255} />
                            </FormItem>
                        </div>
                        <div className='flex flex-col lg:flex-row'>
                            <label className='min-w-fit w-4/12 leading-9'>
                                Workspace description
                            </label>
                            <FormItem
                                name={'description'}
                            >
                                <Input placeholder="Description" maxLength={1000} />
                            </FormItem>
                        </div>
                        <div className='flex'>
                            <div className=' w-3/12'></div>
                            <Button loading={isLoading}>
                                Update
                            </Button>
                        </div>
                    </RcForm>
                </div>
            </div>
        </div>
    );
}

export default WorkspaceSettings;
