import { FC } from "react";
import { FormSection } from "../../../../models/form";
import FieldGroup from "../fields/field-group";

type Props = {
    section: FormSection;
    sectionIndex: number;
}

const GroupFieldSection: FC<Props> = ({ section, sectionIndex, ...dragHandleProps }) => {

    return (
        <FieldGroup section={section} sectionIndex={sectionIndex} {...dragHandleProps} />
    );
}

export default GroupFieldSection;