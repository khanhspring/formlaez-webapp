import { FC } from "react";
import { FormSection } from "../../../../models/form";
import FieldTable from "../fields/field-table";

type Props = {
    section: FormSection;
    sectionIndex: number;
}

const TableFieldSection: FC<Props> = ({ section, sectionIndex, ...dragHandleProps }) => {

    if (!section.fields || section.fields.length === 0) {
        return <></>
    }

    return (
        <FieldTable
            {...dragHandleProps}
            fields={section.fields}
            sectionIndex={sectionIndex}
            section={section}
        />
    );
}

export default TableFieldSection;