import * as _ from 'lodash';
import RcForm from "rc-field-form";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { FC, useEffect, useRef, useState } from "react";
import Button from "../../components/common/button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { Form, FormSection } from "../../models/form";
import { changeTheme, selectTheme } from "../../slices/app-config";
import SectionItem from "./components/section-item";
import { resetState, updateValues } from "./slice";

type Props = {
    formLayout: Form;
    initValues?: any;
    onFinish?: (values: any) => Promise<any>;
    loading?: boolean;
    hideHeader?: boolean;
    hideFooter?: boolean;
}

const FormGenerator: FC<Props> = ({ formLayout, initValues, onFinish, loading, hideHeader = false, hideFooter = false }) => {

    const dispatch = useAppDispatch();
    const mounted = useRef(false);
    const [form] = RcForm.useForm();

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
        dispatch(updateValues(initValues));
        return () => {
            mounted.current = false;
            dispatch(resetState());
        }
    }, [dispatch, initValues]);

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

    const sections = (formLayout?.pages && formLayout.pages[0]?.sections) || [];

    return (
        <div className="min-h-[100vh] flex flex-col justify-center relative">
            {
                !hideHeader &&
                <div className='mb-10'>
                    <div
                        onClick={onThemeSelect}
                        className="w-9 h-9 p-2 text-lg rounded-full flex items-center justify-center transition cursor-pointer text-slate-900 bg-white/70 dark:text-white dark:bg-cinder-800/70 hover:bg-white dark:hover:bg-cinder-800 group absolute top-7 right-7"
                    >
                        {
                            theme === 'dark' &&
                            <i className="fi fi-rr-brightness"></i>
                        }
                        {
                            theme !== 'dark' &&
                            <i className="fi fi-rr-moon-stars"></i>
                        }
                    </div>
                    {
                        formLayout.coverType === 'Color' &&
                        <div className={
                            `w-full h-[30vh] min-h-[150px] flex items-center justify-center`
                            + ` ${formLayout.coverColor || 'bg-001'}`
                        }>
                            <div className="w-full max-w-[530px] m-auto">
                                <h1 className="text-3xl font-bold text-white text-center text-shadow-gray">
                                    {formLayout?.title}
                                </h1>
                            </div>
                        </div>
                    }
                    {
                        formLayout.coverType === 'None' &&
                        <div className="w-full max-w-[530px] m-auto pt-10">
                            <h1 className="text-3xl font-bold">
                                {formLayout?.title}
                            </h1>
                        </div>
                    }
                </div>
            }
            <div className="w-full max-w-[530px] m-auto flex-1">
                <RcForm
                    initialValues={initValues}
                    onFinish={handleOnFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                >
                    {
                        sections.map((item: FormSection, index: number) => (
                            <SectionItem section={item} sectionIndex={index} key={index} />
                        ))
                    }
                    <div className="w-full flex justify-center py-10">
                        <Button loading={loading}>
                            <span className="flex gap-1.5 items-center justify-center py-0.5 w-72 text-white">
                                Submit
                                <i className="fi fi-rs-paper-plane"></i>
                            </span>
                        </Button>
                    </div>
                </RcForm>
            </div>
            {
                !hideFooter &&
                <div className="w-full flex justify-center mt-10">
                    <div className="mx-auto h-10 flex items-center justify-center gap-2 dark:text-gray-300 text-xs">
                        <span>2023©</span>
                        <a href="https://formlaez.com" rel="noreferrer" target="_blank" className="hover:text-sky-500">Formlaez.com</a>
                    </div>
                </div>
            }
        </div>
    );
}

export default FormGenerator;