import { FC } from "react";
import { FormSection } from "../../../../models/form";
import FieldItem from "../fields/field-item";

type Props = {
    section: FormSection;
    sectionIndex: number;
}

const SingleFieldSection: FC<Props> = ({ section, sectionIndex, ...dragHandleProps }) => {

    if (!section.fields || section.fields.length === 0) {
        return <></>
    }

    const field = section.fields[0];

    return (
        <FieldItem
            {...dragHandleProps}
            type={field.type}
            sectionIndex={sectionIndex}
            section={section}
            field={field}
            index={0}
        />
    );
}

export default SingleFieldSection;