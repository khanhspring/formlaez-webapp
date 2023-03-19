import RcForm from 'rc-field-form';
import { useRouteLoaderData } from 'react-router-dom';
import Button from '../../components/common/button';
import Input from '../../components/form/form-controls/input';
import FormItem from '../../components/form/form-item';
import { Workspace } from '../../models/workspace';

function WorkspaceSettings() {
    const workspace = useRouteLoaderData("workspace") as Workspace;
    const [rcForm] = RcForm.useForm();
    const onFinish = (values: any) => { }

    return (
        <>
            <div className='px-6 py-4 border-b border-slate-900/10 dark:border-cinder-700'>
                <h1 className='leading-5 font-bold'>Workspace settings</h1>
            </div>
            <div className='p-6'>
                <div className='max-w-[560px] m-auto'>
                    <RcForm
                        onFinish={onFinish}
                        form={rcForm}
                        initialValues={{ ...workspace }}
                    >
                        <FormItem
                            title='Name'
                            name={'name'}
                            rules={[
                                { required: true, message: "This field is required" },
                            ]}
                            help="You can use your organization or company name. Keep it simple."
                        >
                            <Input placeholder="Name" maxLength={255} />
                        </FormItem>
                        <FormItem
                            title='Description'
                            name={'description'}
                        >
                            <Input placeholder="Description" maxLength={1000} />
                        </FormItem>
                        <Button>
                            Update
                        </Button>
                    </RcForm>
                </div>
            </div>
        </>
    );
}

export default WorkspaceSettings;
