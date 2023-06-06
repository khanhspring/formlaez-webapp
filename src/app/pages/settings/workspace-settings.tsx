import RcForm from 'rc-field-form';
import { useEffect } from 'react';
import { useRevalidator, useRouteLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/common/button';
import Dropdown from '../../components/form/form-controls/dropdown';
import Input from '../../components/form/form-controls/input';
import Textarea from '../../components/form/form-controls/textarea';
import FormItem from '../../components/form/form-item';
import useUpdateWorkspace from '../../hooks/workspace/useUpdateWorkspace';
import useUpdateWorkspaceOpenAIApi from '../../hooks/workspace/useUpdateWorkspaceOpenApi';
import useWorkspaceOpenAIApiSetting from '../../hooks/workspace/useWorkspaceOpenApiSetting';
import { UpdateWorkspaceOpenAIApiRequest, UpdateWorkspaceRequest, Workspace } from '../../models/workspace';
import { showErrorIgnore403 } from '../../util/common';

function WorkspaceSettings() {
    const workspace = useRouteLoaderData("workspace") as Workspace;
    let revalidator = useRevalidator();

    const { mutateAsync: update, isLoading } = useUpdateWorkspace();
    const { mutateAsync: updateOpenAIApi, isLoading: isOpenAIApiUpdating } = useUpdateWorkspaceOpenAIApi();
    const { data: openAIApiSetting } = useWorkspaceOpenAIApiSetting(workspace.id);

    const [rcForm] = RcForm.useForm();
    const [rcOpenAISettingForm] = RcForm.useForm();

    useEffect(() => {
        rcOpenAISettingForm.setFieldsValue({ ...openAIApiSetting });
    }, [openAIApiSetting, rcOpenAISettingForm])

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

    const onUpdateOpenAIApi = (values: any) => {
        const request: UpdateWorkspaceOpenAIApiRequest = {
            workspaceId: workspace.id,
            apiKey: values.apiKey,
            model: values.model
        }
        updateOpenAIApi(request, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => {
                toast.success("Updated OpenAI API successfully!");
            }
        });
    }
    const gptModels = [
        {value: 'gpt-3.5-turbo', label: 'GPT-3.5'},
        {value: 'gpt-4', label: 'GPT-4'},
        {value: 'gpt-4-32k', label: 'GPT-4 32K'},
    ]

    return (
        <div className="mt-6 flex flex-col gap-6 max-w-5xl w-full m-auto">
            <h2 className="pb-1 border-b border-slate-900/10 dark:border-gray-800">General settings</h2>
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
                                <Textarea placeholder="Description" maxLength={1000} rows={2} />
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

            <h2 className="pb-1 border-b border-slate-900/10 dark:border-gray-800">OpenAI API settings</h2>
            <div className='w-full'>
                <div className='m-auto'>
                    <RcForm
                        onFinish={onUpdateOpenAIApi}
                        form={rcOpenAISettingForm}
                        initialValues={{ ...openAIApiSetting }}
                    >
                        <div className='flex flex-col lg:flex-row'>
                            <label className='min-w-fit w-4/12 leading-9'>
                                OpenAI API Key
                            </label>
                            <FormItem
                                name={'apiKey'}
                            >
                                <Input placeholder="OpenAI API Key" maxLength={255} type='password' />
                            </FormItem>
                        </div>
                        <div className='flex flex-col lg:flex-row'>
                            <label className='min-w-fit w-4/12 leading-9'>
                                Model
                            </label>
                            <FormItem
                                name={'model'}
                            >
                                <Dropdown options={gptModels} placeholder='GPT model' allowClear></Dropdown>
                            </FormItem>
                        </div>
                        <div className='flex'>
                            <div className=' w-3/12'></div>
                            <Button loading={isOpenAIApiUpdating}>
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
