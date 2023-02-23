import RcForm from "rc-field-form";
import { FC, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { Form, FormSection } from "../../models/form";
import SectionItem from "./components/section-item";
import { resetState, selectValues, updateValues } from "./slice";

type Props = {
    formLayout: Form;
    initValues?: any;
}

const FormGenerator: FC<Props> = ({ formLayout, initValues }) => {

    const dispatch = useAppDispatch();
    const values = useAppSelector(selectValues);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        dispatch(updateValues(initValues));
        return () => {
            mounted.current = false;
            dispatch(resetState());
        }
    }, [dispatch, initValues]);

    const sections = (formLayout?.pages && formLayout.pages[0]?.sections) || [];

    return (
        <div className="w-[560px] m-auto">
            <RcForm
                initialValues={values}
            >
                {
                    sections.map((item: FormSection, index: number) => (
                        <SectionItem section={item} sectionIndex={index} key={index} />
                    ))
                }
            </RcForm>
        </div>
    );
}

export default FormGenerator;