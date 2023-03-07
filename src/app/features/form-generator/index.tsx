import RcForm from "rc-field-form";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { FC, useEffect, useRef } from "react";
import Button from "../../components/common/button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { Form, FormSection } from "../../models/form";
import SectionItem from "./components/section-item";
import { resetState, selectValues, updateValues } from "./slice";
import * as _ from 'lodash';

type Props = {
    formLayout: Form;
    initValues?: any;
}

const FormGenerator: FC<Props> = ({ formLayout, initValues }) => {

    const dispatch = useAppDispatch();
    const values = useAppSelector(selectValues);
    const mounted = useRef(false);
    const [form] = RcForm.useForm();

    useEffect(() => {
        mounted.current = true;
        dispatch(updateValues(initValues));
        return () => {
            mounted.current = false;
            dispatch(resetState());
        }
    }, [dispatch, initValues]);

    const onFinish = (values: any) => {
        console.log(values);
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
        <div className="min-h-[100vh] flex flex-col justify-center">
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
            <div className="w-full max-w-[530px] m-auto flex-1 pb-10 pt-10">
                <RcForm
                    initialValues={values}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                >
                    {
                        sections.map((item: FormSection, index: number) => (
                            <SectionItem section={item} sectionIndex={index} key={index} />
                        ))
                    }
                    <div className="w-full flex justify-center py-10">
                        <Button>
                            <span className="flex gap-1.5 items-center justify-center py-0.5 w-72 text-white">
                                Submit
                                <i className="fi fi-rs-paper-plane"></i>
                            </span>
                        </Button>
                    </div>
                </RcForm>
            </div>
            <div className="w-full flex justify-center">
                <div className="mx-auto h-10 flex items-center justify-center gap-2 dark:text-gray-300 text-xs">
                    <span>2023©</span>
                    <a href="https://formlaez.com" rel="noreferrer" target="_blank" className="hover:text-sky-500">Formlaez.com</a>
                </div>
            </div>
        </div>
    );
}

export default FormGenerator;