import { FC, useState } from "react";
import { FormField, FormSection } from "../../../../models/form";
import ConfigAction from "../config-action";
import Table from "./table";

type Props = {
    fields: FormField[];
    sectionIndex: number;
    section: FormSection;
}

const FieldTable: FC<Props> = ({ fields, sectionIndex, section, ...dragHandleProps }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div className="pt-2 pb-2">
            <div
                className="flex flex-col relative group/field-table"
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <ConfigAction
                    {...dragHandleProps}
                    invisible={!isHover}
                    context={{
                        type: 'Group',
                        sectionIndex: sectionIndex,
                        section: section
                    }}
                />
                <div className="flex">
                    <Table />
                </div>
            </div>
        </div>
    );
}

export default FieldTable;