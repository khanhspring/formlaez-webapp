import { FC } from "react";
import { FormSection } from "../../../models/form";
import FieldItem from "./field-item";

type Props = {
    section: FormSection;
    sectionIndex: number;
}

const SingleFieldSection: FC<Props> = ({ section }) => {
    if (!section.fields || section.fields.length === 0) {
        return <></>
    }

    const field = section.fields[0];

    return (
        <FieldItem
            field={field}
            fieldIndex={0}
            name={field.code}
        />
    );
}

export default SingleFieldSection;