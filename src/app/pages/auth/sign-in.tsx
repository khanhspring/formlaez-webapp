import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Form from 'rc-field-form';
import { Link } from 'react-router-dom';
import googleIcon from '../../../assets/images/google-icon.svg';
import logo from "../../../assets/images/logo-w.svg";
import { auth } from '../../../firebase';
import Button from '../../components/common/button';
import Input from '../../components/form/form-controls/input';
import FormItem from '../../components/form/form-item';

const SignIn = () => {

    const signIn = (values: any) => {

    }
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="text-slate-700 bg-white min-h-screen w-full flex items-stretch justify-center">
            <div className="w-full flex-1 flex items-center justify-center">
                <div className="w-full max-w-[420px] p-8 flex flex-col items-center">
                    <h2 className="font-bold text-3xl">Sign In</h2>
                    <span
                        onClick={signInWithGoogle}
                        className="mt-7 w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 px-3 py-2 border border-slate-900/10 rounded transition cursor-pointer"
                    >
                        <img src={googleIcon} alt="Google" className='h-4' />
                        <span className='text-sm'>Continue with Google</span>
                    </span>
                    <span className='mt-7 text-xs text-slate-500 font-semibold'>Or with email</span>
                    <div className='w-full mt-7'>
                        <Form
                            className='w-full'
                            onFinish={signIn}
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
                                    wrapClassName='dark:bg-slate-100 dark:border-slate-900/10 dark:hover:!border-slate-900/10'
                                />
                            </FormItem>
                            <FormItem
                                name={'password'}
                                title="Password"
                                hideRequireMark
                                rules={[
                                    { required: true, message: 'This field is required' },
                                ]}
                            >
                                <Input
                                    placeholder='Password'
                                    wrapClassName='dark:bg-slate-100 dark:border-slate-900/10 dark:hover:!border-slate-900/10'
                                    type='password'
                                    autoComplete="new-password"
                                    className='autofill:bg-transparent'
                                />
                            </FormItem>
                            <Button className='w-full py-2.5'>
                                Continue
                            </Button>
                        </Form>
                    </div>
                    <div className='mt-7 flex gap-1.5 text-sm font-semibold'>
                        <span className='text-slate-500'>New here?</span>
                        <Link
                            to={"/sign-up"}
                            className="text-blue-500"
                        >
                            Create an Account
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-auth bg-cover flex-1 flex items-center justify-center">
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

export default SignIn;