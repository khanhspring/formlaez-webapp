import * as _ from "lodash";
import { FC, useEffect, useRef } from "react";
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import Drawer from "../../components/drawer/drawer";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { Form } from "../../models/form";
import EmptyForm from "./components/empty-form";
import PropertiesDrawer from "./components/properties-drawer";
import SectionItem from "./components/sections/section-item";
import { clearCurrentItem, reorderField, reorderSection, resetState, selectCurrentItem, selectForm, updateForm } from "./slice";

// disable all react-beautiful-dnd development warnings
// @ts-ignore
window['__react-beautiful-dnd-disable-dev-warnings'] = true;

type Props = {
    initForm: Form;
}

const FormBuilder: FC<Props> = ({ initForm }) => {

    const dispatch = useAppDispatch();
    const form = useAppSelector(selectForm);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        dispatch(updateForm(initForm));
        return () => {
            mounted.current = false;
            dispatch(resetState());
        }
    }, []);


    const sections = (form?.pages && form.pages[0]?.sections) || [];

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        if (!result.source || !result.destination) {
            return;
        }
        if (result.type === 'page') {
            handleSectionDrag(result);
            return;
        }

        if (result.type.startsWith('group_')) {
            handleFieldDrag(result);
            return;
        }
    }

    const handleSectionDrag = (result: DropResult) => {
        const source = result.source;
        const destination = result.destination;

        if (!destination || _.isNaN(destination?.index) || source.index === destination.index) {
            return;
        }
        dispatch(reorderSection({ fromIndex: source.index, toIndex: destination.index }));
    }

    const handleFieldDrag = (result: DropResult) => {
        const source = result.source;
        const destination = result.destination;

        if (!destination || _.isNaN(destination?.index) || source.index === destination.index) {
            return;
        }
        const sectionCode = source.droppableId;
        dispatch(reorderField({ sectionCode: sectionCode, fromIndex: source.index, toIndex: destination.index }));
    }

    return (
        <>
            <div className="w-full text-sm">
                {
                    _.isEmpty(sections) && <EmptyForm form={form} />
                }
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="pageWrap" type="page">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {sections.map((item, index) => (
                                    <Draggable key={item.code} draggableId={'section_' + item.code} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                style={{ ...provided.draggableProps.style }}
                                            >
                                                <SectionItem section={item} sectionIndex={index} {...provided.dragHandleProps} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <PropertiesDrawer />
        </>
    );
}

export default FormBuilder;
