import RcForm from "rc-field-form";
import { FC } from "react";
import Button from "../../../components/common/button";
import { FormSection } from "../../../models/form";
import FieldItem from "./field-item";

type Props = {
    section: FormSection;
    sectionIndex: number;
}

const GroupFieldSection: FC<Props> = ({ section }) => {
    if (!section.fields || section.fields.length === 0) {
        return <></>
    }

    return (
        <RcForm.List
            name={section.code}
            initialValue={[{}]}
        >
            {(fields, { add, remove }) => {
                return (
                    <div>
                        <div className="p-3 border border-cinder-600">
                            {fields.map((field, index) => (
                                <div key={index}>
                                    {
                                        section.fields?.map((item, index) => (
                                            <FieldItem
                                                field={item}
                                                fieldIndex={index}
                                                key={index}
                                                name={[field.name, item.code]}
                                            />
                                        ))
                                    }
                                </div>
                            ))}
                        </div>
                        <Button onClick={() => add({})} htmlType="button">Add</Button>
                    </div>
                )
            }}
        </RcForm.List>
    );
}

export default GroupFieldSection;