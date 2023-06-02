import Form from 'rc-field-form';
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import googleIcon from '../../../assets/images/google-icon.svg';
import logo from "../../../assets/images/formini-logo.svg";
import Button from '../../components/common/button';
import Input from '../../components/form/form-controls/input';
import FormItem from '../../components/form/form-item';
import useConfirmSignUp from '../../hooks/sign-up/useConfirmSignUp';
import useSignUp from '../../hooks/sign-up/useSignUp';
import { ConfirmSignUpRequest, SignUpRequest } from '../../models/sign-up';
import { showErrorIgnore403 } from '../../util/common';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../configurations/firebase';
import { validateTokenAndLogin } from '../../slices/auth';
import { useAppDispatch } from '../../hooks/redux-hook';

const SignUp = () => {

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState();
    const { mutateAsync: signUp, isLoading } = useSignUp();
    const { mutateAsync: confirmSignUp, isLoading: isConfirmLoading } = useConfirmSignUp();
    const [countdown, setCountdown] = useState(5);
    const intervalRef = useRef<any>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [])

    const onStep1Finish = (values: any) => {
        setEmail(values.email);

        const request: SignUpRequest = {
            email: values.email
        }
        signUp(request, {
            onError: () => toast.error("Your email is incorrect or has been taken!"),
            onSuccess: () => {
                setStep(2);
                toast.success(<span className='text-slate-900'>We have just sent you an email to <strong>{values.email}</strong>.<br />Please check you mailbox.</span>, { autoClose: 11000, theme: 'light' })
            }
        });
    }

    const onStep2Finish = (values: any) => {
        const request: ConfirmSignUpRequest = {
            verificationCode: values.verificationCode,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
            email: values.email
        };
        setCountdown(5);

        confirmSignUp(request, {
            onError: e => showErrorIgnore403(e, "The verification code is incorrect or has expired!"),
            onSuccess: () => {
                toast.success("Signed up successfully. Redirecting to sign in now...");
                setStep(3);
                intervalRef.current = setInterval(() => {
                    setCountdown(prev => {
                        if (prev === 0) {
                            clearInterval(intervalRef.current);
                            navigate("/sign-in");
                            return prev;
                        }
                        return prev - 1;
                    })
                }, 1000)
            }
        });
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        signInWithPopup(auth, provider)
            .then((result) => {
                const loadingId = toast.loading("Signing in...");
                result.user.getIdToken().then((token) => {
                    dispatch(validateTokenAndLogin(token))
                    .then(() => {
                        navigate("/");
                    }).finally(() => {
                        toast.done(loadingId);
                    });
                })
            }).catch((error) => {
                toast.error("An error was occurred. Please try again!");
            })
    }

    return (
        <div className="min-h-screen w-full flex items-stretch justify-center">
            <div className="w-full flex-1 flex items-center justify-center">
                <div className="w-full max-w-[420px] p-8 flex flex-col items-center">
                    <h2 className="font-bold text-3xl">Sign Up</h2>
                    <p className="font-semibold mt-2.5 text-sm">Adventure starts here</p>
                    {
                        step === 1 &&
                        <>
                            <span
                                onClick={signInWithGoogle}
                                className="mt-7 w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-steel-gray-900 dark:hover:bg-steel-gray-800 px-3 py-2 border border-slate-900/10 rounded transition cursor-pointer"
                            >
                                <img src={googleIcon} alt="Google" className='h-4' />
                                <span className='text-sm'>Continue with Google</span>
                            </span>
                            <span className='mt-7 text-xs font-semibold'>Or with email</span>
                            <div className='w-full mt-7'>
                                <Form
                                    className='w-full'
                                    onFinish={onStep1Finish}
                                >
                                    <FormItem
                                        title="Email"
                                        name={'email'}
                                        hideRequireMark
                                        rules={[
                                            { required: true, message: 'This field is required' },
                                            { type: 'email', message: 'Email is invalid' }
                                        ]}
                                    >
                                        <Input
                                            placeholder='email@example.com'
                                        />
                                    </FormItem>
                                    <Button className='w-full py-2.5' loading={isLoading}>
                                        Continue with email
                                    </Button>
                                </Form>
                            </div>
                            <div className='mt-7 flex gap-1.5 text-sm font-semibold'>
                                <span>Already have an Account?</span>
                                <Link
                                    to={"/sign-in"}
                                    className="text-blue-500"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </>
                    }
                    {
                        step === 2 &&
                        <>
                            <div className='w-full mt-7'>
                                <Form
                                    className='w-full'
                                    onFinish={onStep2Finish}
                                    initialValues={{ email: email }}
                                >
                                    <FormItem
                                        hideRequireMark
                                        name="email"
                                        title='Email'
                                    >
                                        <Input
                                            disabled
                                        />
                                    </FormItem>
                                    <FormItem
                                        name={'verificationCode'}
                                        title="Verification code"
                                        hideRequireMark
                                        rules={[
                                            { required: true, message: 'This field is required' }
                                        ]}
                                    >
                                        <Input
                                            placeholder='Verification code'
                                            className='autofill:bg-transparent'
                                        />
                                    </FormItem>
                                    <FormItem
                                        name={'firstName'}
                                        title="First name"
                                        hideRequireMark
                                        rules={[
                                            { required: true, message: 'This field is required' }
                                        ]}
                                    >
                                        <Input
                                            placeholder='First name'
                                            className='autofill:bg-transparent'
                                        />
                                    </FormItem>
                                    <FormItem
                                        name={'lastName'}
                                        title="Last name"
                                        hideRequireMark
                                        rules={[
                                            { required: true, message: 'This field is required' }
                                        ]}
                                    >
                                        <Input
                                            placeholder='Last name'
                                            autoComplete="off"
                                            className='autofill:bg-transparent'
                                        />
                                    </FormItem>
                                    <FormItem
                                        name={'password'}
                                        title="Password"
                                        hideRequireMark
                                        rules={[
                                            { required: true, message: 'This field is required' },
                                            { min: 8, message: 'Password must be at least 8 characters' },
                                        ]}
                                    >
                                        <Input
                                            placeholder='Password'
                                            type='password'
                                            autoComplete="new-password"
                                            className='autofill:bg-transparent'
                                        />
                                    </FormItem>
                                    <Button className='w-full py-2.5' loading={isConfirmLoading}>
                                        Sign up
                                    </Button>
                                </Form>
                            </div>
                            <div className='mt-5'>
                                <button
                                    onClick={() => setStep(1)}
                                    className="font-semibold text-sm"
                                >
                                    Back
                                </button>
                            </div>
                        </>
                    }
                    {
                        step === 3 &&
                        <>
                            <div className="mt-7 w-20 h-20 bg-emerald-500 rounded-full flex justify-center items-center">
                                <i className="fi fi-br-check text-3xl text-white"></i>
                            </div>
                            <div className="mt-4 w-full flex flex-col justify-center items-center gap-3">
                                <h1 className="text-xl font-semibold">Congratulations!</h1>
                                <p className="text-3xl">
                                    😍🥳🎉
                                </p>
                                <p className="text-base text-center">
                                    You have successfully signed up account.
                                    <br />
                                    Redirecting to the sign in {countdown} seconds.
                                    <br />

                                </p>
                                <Link to={"/sing-in"}>
                                    <Button>
                                        Or click here to sign in now
                                        <i className="fi fi-rr-arrow-right"></i>
                                    </Button>
                                </Link>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="bg-auth bg-cover hidden md:flex flex-1 items-center justify-center">
                <div className='w-full flex flex-col justify-center items-center'>
                    <h1 className='text-white font-black text-3xl'>
                        <img src={logo} alt="logo" className='h-10' />
                    </h1>
                    <p className='mt-5 text-white font-semibold text-2xl text-center'>
                        Multipurpose online forms
                        <br />
                        and document merges
                    </p>
                    <p className='mt-5 text-white text-sm text-center'>
                        A simple, intuitive, and powerful online forms builder.
                        <br />
                        Collect and merge data into documents easily and accurately.
                        <br />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;