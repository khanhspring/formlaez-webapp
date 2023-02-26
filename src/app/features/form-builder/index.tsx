import * as _ from "lodash";
import { FC, useEffect, useRef } from "react";
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import Textarea from "../../components/form/form-controls/textarea";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { Form, UpdateFormInfo } from "../../models/form";
import EmptyForm from "./components/empty-form";
import PropertiesDrawer from "./components/properties-drawer";
import SectionItem from "./components/sections/section-item";
import { reorderField, reorderSection, resetState, selectForm, updateForm, updateFormInfo } from "./slice";

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
    }, [dispatch, initForm]);


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

    const removeCover = () => {
        if (!form) {
            return;
        }
        const formInfo: UpdateFormInfo = {
            id: form.id,
            title: form.title,
            coverType: 'None',
        }
        dispatch(updateFormInfo(formInfo));
    }

    const addCover = () => {
        if (!form) {
            return;
        }
        const formInfo: UpdateFormInfo = {
            id: form.id,
            title: form.title,
            coverType: 'Color',
            coverColor: 'bg-gradient-pink-purple-blue'
        }
        dispatch(updateFormInfo(formInfo));
    }

    const onTitleChange = (value?: string) => {
        if (!form) {
            return;
        }
        const formInfo: UpdateFormInfo = {
            id: form.id,
            title: value || 'Untitled',
            coverType: form.coverType,
            coverColor: form.coverColor,
            coverImageUrl: form.coverImageUrl,
        }
        dispatch(updateFormInfo(formInfo));
    }

    return (
        <>
            {
                form?.coverType && form?.coverType !== 'None' &&
                <div className={
                    'w-full h-[30vh] min-h-[150px] group/form-cover'
                    + ` ${form.coverColor || 'bg-gradient-nepal'}`
                }>
                    <div className="w-full max-w-[530px] m-auto relative h-full flex items-center justify-center">
                        <Textarea
                            value={form?.title}
                            className="w-full text-3xl font-bold border-none !bg-transparent !px-0 text-center text-shadow-gray"
                            autoHeight
                            placeholder="Untitled"
                            onChange={e => onTitleChange(e.target.value)}
                        />
                        <div className="absolute w-full h-10 bottom-0 left-0 justify-end items-center gap-2 transition hidden group-hover/form-cover:flex">
                            <button
                                onClick={() => { }}
                                className="px-2 py-1 text-xs rounded transition bg-cinder-700/70 hover:bg-cinder-700"
                            >
                                Change cover
                            </button>
                            <button
                                onClick={removeCover}
                                className="px-2 py-1 text-xs rounded transition bg-cinder-700/70 hover:bg-cinder-700"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            }
            <div className="w-full max-w-[530px] m-auto mt-10 text-sm">
                {
                    (!form?.coverType || form?.coverType === 'None') &&
                    <>
                        <div className="w-full">
                            <button
                                onClick={addCover}
                                className="px-2 py-1 transition bg-cinder-700/70 hover:bg-cinder-700 rounded text-sm"
                            >
                                Add cover
                            </button>
                        </div>
                        <div className="w-full pb-5 pt-1">
                            <Textarea
                                value={form?.title}
                                className="w-full text-3xl font-bold border-none !bg-transparent !px-0"
                                autoHeight
                                placeholder="Untitled"
                                onChange={e => onTitleChange(e.target.value)}
                            />
                        </div>
                    </>
                }
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
