import { ArrowRightIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import * as _ from 'lodash';
import RcForm from "rc-field-form";
import { FormInstance, ValidateErrorEntity } from "rc-field-form/lib/interface";
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../../components/common/button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { Form, FormSection } from "../../models/form";
import { changeTheme, selectTheme } from "../../slices/app-config";
import { selectUserInfo } from '../../slices/auth';
import SectionItem from "./components/section-item";
import { resetState, updateValues } from "./slice";

type Props = {
    formLayout: Form;
    initValues?: any;
    onFinish?: (values: any) => Promise<any>;
    loading?: boolean;
    hideHeader?: boolean;
    hideFooter?: boolean;
    hideButton?: boolean;
    formInstance?: FormInstance<any>;
    fullWidth?: boolean;
    fullHeight?: boolean;
}

const FormGenerator: FC<Props> = ({ formLayout, initValues, onFinish, loading, hideHeader = false, hideFooter = false, hideButton = false, formInstance, fullWidth = false, fullHeight = true }) => {

    const dispatch = useAppDispatch();
    const mounted = useRef(false);
    const [rcForm] = RcForm.useForm();
    const form = formInstance || rcForm;
    const user = useAppSelector(selectUserInfo);
    const navigate = useNavigate();

    const login = () => {
        navigate("/sign-in");
    }

    const currentTheme = useAppSelector(selectTheme);
    const [theme, setTheme] = useState<'dark' | 'light'>(currentTheme);

    const onThemeSelect = () => {
        if (theme === 'dark') {
            setTheme('light');
            dispatch(changeTheme('light'));
        } else {
            setTheme('dark');
            dispatch(changeTheme('dark'));
        }
    }

    useEffect(() => {
        mounted.current = true;
        dispatch(updateValues({...initValues}));
        form.setFieldsValue({...initValues})
        return () => {
            mounted.current = false;
            dispatch(resetState());
        }
    }, [dispatch, form, initValues]);

    const handleOnFinish = (values: any) => {
        onFinish?.(values)
            .then(() => form.resetFields());
    }

    const scrollToField = (namePath: (string | number)[]) => {
        const fieldId = `form-item_${namePath.join("-")}`;
        const fieldElm = document.getElementById(fieldId);
        if (!fieldElm) {
            return;
        }
        fieldElm.scrollIntoView({
            behavior: 'smooth'
        });
    }

    const onFinishFailed = ({ errorFields }: ValidateErrorEntity<any>) => {
        if (_.isEmpty(errorFields)) {
            return;
        }
        const [firstError] = errorFields;
        scrollToField(firstError.name);
    }

    const userHeader = (
        <div className='flex items-center justify-center gap-2 absolute top-5 right-5'>
            {
                user &&
                <div className='rounded-2xl px-3 py-1 text-sm bg-white/70 dark:bg-slate-800/70 border border-bg-slate-900 dark:border-transparent hover:bg-white dark:hover:bg-slate-800'>
                    {user?.firstName} {user?.lastName}
                </div>
            }
            {
                !user &&
                <div
                    onClick={login}
                    className='rounded-2xl px-3 py-1 text-sm bg-white/70 dark:bg-slate-800/70 border border-bg-slate-900 dark:border-transparent hover:bg-white dark:hover:bg-slate-800 cursor-pointer'
                >
                    Login
                </div>
            }
            <div
                onClick={onThemeSelect}
                className="w-9 h-9 p-2 text-lg rounded-full flex items-center justify-center transition cursor-pointer text-slate-900 bg-white/70 dark:text-white dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 border border-bg-slate-900 dark:border-transparent group"
            >
                {theme !== 'dark' && <MoonIcon className="w-5 h-5" />}
                {theme === 'dark' && <SunIcon className="w-5 h-5" />}
            </div>
        </div>
    )

    const sections = (formLayout?.pages && formLayout.pages[0]?.sections) || [];

    return (
        <div className={`flex flex-col justify-center relative ${fullHeight ? 'min-h-screen' : ''}`}>
            {
                !hideHeader &&
                <div className='mb-10'>
                    {userHeader}
                    {
                        formLayout.coverType === 'Color' &&
                        <div className={
                            `w-full h-[30vh] min-h-[150px] flex items-center justify-center`
                            + ` ${formLayout.coverColor || 'bg-001'}`
                        }>
                            <div className="w-full max-w-[640px] m-auto">
                                <h1 className="text-3xl font-bold text-white text-center text-shadow-gray whitespace-pre-line">
                                    {formLayout?.title}
                                </h1>
                            </div>
                        </div>
                    }
                    {
                        formLayout.coverType === 'None' &&
                        <div className='w-full px-4'>
                            <div className="w-full max-w-[640px] m-auto pt-16">
                                <h1 className="text-3xl font-bold">
                                    {formLayout?.title}
                                </h1>
                            </div>
                        </div>
                    }
                </div>
            }
            <div className='w-full flex-1'>
                <div className={`w-full ${!fullWidth ? 'max-w-[670px] m-auto px-4' : ''}`}>
                    <RcForm
                        onFinish={handleOnFinish}
                        onFinishFailed={onFinishFailed}
                        form={form}
                    >
                        {
                            sections.map((item: FormSection, index: number) => (
                                <SectionItem section={item} sectionIndex={index} key={index} />
                            ))
                        }
                        {
                            !hideButton &&
                            <div className="w-full flex justify-center py-10">
                                <Button loading={loading}>
                                    <span className="flex gap-1.5 items-center justify-center py-0.5 w-72 text-white">
                                        Submit
                                        <ArrowRightIcon className='w-5 h-5' />
                                    </span>
                                </Button>
                            </div>
                        }
                    </RcForm>
                </div>
            </div>
            {
                !hideFooter &&
                <div className="w-full flex justify-center mt-10">
                    <div className="mx-auto h-10 flex items-center justify-center gap-2 dark:text-gray-300 text-xs">
                        <span>2023©</span>
                        <a href="https://formini.so" rel="noreferrer" target="_blank" className="hover:text-sky-500">Formini.so</a>
                    </div>
                </div>
            }
        </div>
    );
}

export default FormGenerator;