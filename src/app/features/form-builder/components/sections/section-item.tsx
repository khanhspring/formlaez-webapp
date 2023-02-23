import { FC } from "react";
import { FormSection } from "../../../../models/form";
import GroupFieldSection from "./group-field-section";
import SingleFieldSection from "./single-field-section";
import TableFieldSection from "./table-field-section";

type Props = {
    section: FormSection;
    sectionIndex: number;
}

const SectionItem: FC<Props> = ({ section, sectionIndex, ...dragHandleProps }) => {

    const renderSection = () => {
        switch (section.type) {
            case 'Single': return <SingleFieldSection section={section} sectionIndex={sectionIndex} {...dragHandleProps}/>
            case 'Group': return <GroupFieldSection section={section} sectionIndex={sectionIndex} {...dragHandleProps}/>
            case 'Table': return <TableFieldSection section={section} sectionIndex={sectionIndex} {...dragHandleProps}/>
        }
    }

    return (
        <>
            {renderSection()}
        </>
    );
}

export default SectionItem;