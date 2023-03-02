import Form from 'rc-field-form';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/button';
import Input from '../../components/form/form-controls/input';
import FormItem from '../../components/form/form-item';
import { useAppSelector } from '../../hooks/redux-hook';
import useCreateWorkspace from '../../hooks/workspace/useCreateWorkspace';
import { CreateWorkspaceRequest } from '../../models/workspace';
import { selectUserInfo } from '../../slices/auth';

type Props = {

}

const Onboarding: FC<Props> = () => {

    const [greetingVisible, setGreetingVisible] = useState(true);
    const [greetingHiding, setGreetingHiding] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const navigate = useNavigate();
    const userInfo = useAppSelector(selectUserInfo)

    const { mutate } = useCreateWorkspace();

    useEffect(() => {
        setTimeout(() => {
            setGreetingHiding(true);
        }, 900);

        setTimeout(() => {
            setGreetingVisible(false);
        }, 1200);

        setTimeout(() => {
            setFormVisible(true);
        }, 1500);

    }, []);

    const onFinish = (values: any) => {
        const request: CreateWorkspaceRequest = {
            name: values.name
        }
        mutate(request, {
            onSuccess: function () {
                navigate("/");
            }
        })
    }

    return (
        <div className='w-full min-h-[100vh] flex items-center justify-center'>
            {
                greetingVisible &&
                <h2 className={`text-3xl mb-10 font-roboto animate-fade-in ${greetingHiding ? 'animate-fade-out' : ''}`}>
                    Hi there, welcome to Formlaez
                </h2>
            }
            {
                formVisible &&
                <div className='flex flex-col items-center gap-5 pb-20 pt-5 min-w-[300px]'>
                    <h2 className='text-xl'>Create your own workspace</h2>
                    <Form
                        initialValues={{ name: `${userInfo?.firstName} ${userInfo?.lastName}'s Workspace` }}
                        className="w-full"
                        onFinish={onFinish}
                    >
                        <FormItem
                            name={'name'}
                            rules={[
                                { required: true, message: 'This field is required' },
                            ]}
                        >
                            <Input placeholder="Workspace title" />
                        </FormItem>
                        <Button className='w-full text-center justify-center'>
                            Continue
                        </Button>
                    </Form>
                </div>
            }
        </div>
    )
}

export default Onboarding;