import Form from 'rc-field-form';
import { FC, useEffect, useState, useCallback } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import Button from '../../components/common/button';
import Loading from '../../components/common/loading';
import Input from '../../components/form/form-controls/input';
import FormItem from '../../components/form/form-item';
import useCurrentUserSession from '../../hooks/auth/useCurrentUserSession';
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

    const { data: userSession, isLoading: isSessionLoading } = useCurrentUserSession();
    const { mutate, isLoading } = useCreateWorkspace();

    const initOnboarding = useCallback(() => {
        setTimeout(() => {
            setGreetingHiding(true);
        }, 1500);

        setTimeout(() => {
            setGreetingVisible(false);
        }, 1800);

        setTimeout(() => {
            setFormVisible(true);
        }, 2100);
    }, [])

    useEffect(() => {
        if (isSessionLoading) {
            return;
        }
        if (userSession?.onboarded) {
            navigate("/");
            return;
        }
        initOnboarding();
    }, [initOnboarding, isSessionLoading, navigate, userSession?.onboarded]);

    const onFinish = (values: any) => {
        if (isLoading) {
            return;
        }
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
                isSessionLoading && <Loading center />
            }
            {
                greetingVisible &&
                <h2 className={`text-3xl mb-10 font-sans font-thin animate-fade-in-slow ${greetingHiding ? 'animate-fade-out-slow' : ''}`}>
                    Hi there, welcome to Formlaez
                </h2>
            }
            {
                formVisible &&
                <div className='flex flex-col items-center gap-5 pb-20 pt-5 min-w-[300px] animate-fade-in-slow'>
                    <div className='flex flex-col items-center'>
                        <h2 className='text-lg'>You have not joined any workspace.</h2>
                        <p className='text-lg'>Create your own workspace</p>
                        <p className='text-lg'>and experience the exciting features now</p>
                    </div>
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
                        <Button className='w-full text-center justify-center' loading={isLoading}>
                            Continue
                        </Button>
                    </Form>
                </div>
            }
        </div>
    )
}

export default Onboarding;