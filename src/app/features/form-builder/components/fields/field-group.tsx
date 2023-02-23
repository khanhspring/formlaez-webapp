import * as _ from "lodash";
import { FC, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FormSection } from "../../../../models/form";
import { useUpdateGroupBasicInfo } from "../../hooks/useUpdateGroupBasicInfo";
import ConfigAction from "../config-action";
import EmptyGroup from "../empty-group";
import FieldItem from "./field-item";

type Props = {
    section: FormSection;
    sectionIndex: number;
}

const FieldGroup: FC<Props> = ({ section, sectionIndex, ...dragHandleProps }) => {

    const [isHover, setIsHover] = useState(false);
    const { title, onTitleChange } = useUpdateGroupBasicInfo(section, { type: 'Group', section, sectionIndex });

    const fields = section.fields || [];

    const renderFields = () => {
        return (
            <>
                {
                    _.isEmpty(fields) && <EmptyGroup sectionIndex={sectionIndex} />
                }
                <Droppable droppableId={section.code} type={`group_${section.code}`}>
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {fields.map((item, index) => (
                                <Draggable key={item.code} draggableId={item.code + ''} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={{ ...provided.draggableProps.style }}
                                        >
                                            <FieldItem
                                                {...provided.dragHandleProps}
                                                type={item.type}
                                                sectionIndex={sectionIndex}
                                                index={index}
                                                field={item}
                                                section={section}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </>
        )
    }

    return (
        <div className="pt-2 pb-2">
            <div
                className="flex flex-col relative rounded border border-gray-700 dark:bg-cinder-900 group/field-group"
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
                <div className="bg-cinder-700 px-3 py-2 rounded-t">
                    <input
                        value={title}
                        className="flex-1 w-full text-gray-100 bg-transparent outline-none"
                        onChange={onTitleChange}
                        placeholder="Group"
                    />
                </div>
                <div className="flex flex-col px-5 py-2">
                    {renderFields()}
                </div>
            </div>
        </div>
    );
}

export default FieldGroup;