import { FC } from "react";
import { FormSection } from "../../../models/form";
import GroupFieldSection from "./group-field-section";
import SingleFieldSection from "./single-field-section";

type Props = {
    section: FormSection;
    sectionIndex: number;
}

const SectionItem: FC<Props> = ({ section, sectionIndex }) => {

    const renderSection = () => {
        switch (section.type) {
            case 'Single': return <SingleFieldSection section={section} sectionIndex={sectionIndex} />
            case 'Group': return <GroupFieldSection section={section} sectionIndex={sectionIndex} />
            case 'Table': throw new Error("Not supported table yet");
        }
    }

    return (
        <>
            {renderSection()}
        </>
    );
}

export default SectionItem;