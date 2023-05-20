import { FC } from "react";
import { FormSection } from "../../../../models/form";
import FieldGroup from "../fields/field-group";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { selectSelectedItems } from "../../slice";

type Props = {
    section: FormSection;
    sectionIndex: number;
}

const GroupFieldSection: FC<Props> = ({ section, sectionIndex, ...dragHandleProps }) => {

    const selectedItems = useAppSelector(selectSelectedItems);

    const isSelected = () => {
        return !!selectedItems?.some(item => item.sectionCode === section.code);
    }

    return (
        <div
            className="py-[1px] selectable"
            selection-data-code={section.code}
            selection-data-index={sectionIndex}
        >
            <div
                className={
                    "w-full py-1.5 px-1"
                    + ` ${isSelected() ? 'bg-slate-100 dark:bg-steel-gray-900/60' : ''}`
                }
            >
                <FieldGroup section={section} sectionIndex={sectionIndex} {...dragHandleProps} />
            </div>
        </div>
    );
}

export default GroupFieldSection;