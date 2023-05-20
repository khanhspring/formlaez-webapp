import { Popup } from "ez-rc-popup";
import * as _ from "lodash";
import { FC, useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import Textarea from "../../components/form/form-controls/textarea";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { Form, UpdateFormInfo } from "../../models/form";
import EmptyForm from "./components/empty-form";
import PropertiesDrawer from "./components/properties-drawer";
import SectionItem from "./components/sections/section-item";
import { useDebounced } from "./hooks/useDebounced";
import { reorderField, reorderSection, resetState, selectForm, updateForm, updateFormInfo } from "./slice";
import FormBodySelection from "./components/form-body-selection";

// disable all react-beautiful-dnd development warnings
// @ts-ignore
window['__react-beautiful-dnd-disable-dev-warnings'] = true;

const BackgroundColors = [
    'bg-001', 'bg-002', 'bg-003', 'bg-004', 'bg-005', 'bg-006', 'bg-007', 'bg-008', 'bg-009'
]

type Props = {
    initForm: Form;
    onTitleChange?: (title?: string) => void;
}

const FormBuilder: FC<Props> = ({ initForm, onTitleChange }) => {

    const dispatch = useAppDispatch();
    const form = useAppSelector(selectForm);
    const mounted = useRef(false);
    const [title, setTitle] = useState<string>();
    const [coverConfigVisible, setCoverConfigVisible] = useState(false);

    useEffect(() => {
        mounted.current = true;
        dispatch(updateForm(initForm));
        setTitle(initForm?.title);
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
        if (!form || form.status === 'Archived') {
            return;
        }
        const formInfo: UpdateFormInfo = {
            id: form.id,
            title: title || 'Untitled',
            coverType: 'None',
        }
        dispatch(updateFormInfo(formInfo));
    }

    const addCover = () => {
        if (!form || form.status === 'Archived') {
            return;
        }
        const formInfo: UpdateFormInfo = {
            id: form.id,
            title: title || 'Untitled',
            coverType: 'Color',
            coverColor: BackgroundColors[0]
        }
        dispatch(updateFormInfo(formInfo));
    }

    const dispatchTitleChange = useDebounced((title?: string) => {
        if (!form || form.status === 'Archived') {
            return;
        }
        const formInfo: UpdateFormInfo = {
            id: form.id,
            title: title || 'Untitled',
            coverType: form.coverType,
            coverColor: form.coverColor,
            coverImageUrl: form.coverImageUrl,
        }
        dispatch(updateFormInfo(formInfo));
    })

    const handleTitleChange = (value?: string) => {
        setTitle(value);
        onTitleChange?.(value || 'Untitled');
        dispatchTitleChange(value);
    }

    const onSelectColorCover = (bgClassName: string) => {
        setCoverConfigVisible(false);
        if (!form || form.status === 'Archived') {
            return;
        }
        const formInfo: UpdateFormInfo = {
            id: form.id,
            title: title || 'Untitled',
            coverType: 'Color',
            coverColor: bgClassName
        }
        dispatch(updateFormInfo(formInfo));
    }

    const coverColors = (
        <div className="w-[550px] bg-white dark:bg-slate-800 rounded p-3">
            <h2>Background colors</h2>
            <div className="w-full grid grid-cols-4 gap-2 mt-3">
                {
                    BackgroundColors.map((bgClassName, index) =>
                        <div
                            key={index}
                            onClick={() => onSelectColorCover(bgClassName)}
                            className={`${bgClassName} h-16 rounded cursor-pointer`}
                        />
                    )
                }
            </div>
        </div>
    )

    return (
        <>
            {
                form?.coverType && form?.coverType !== 'None' &&
                <div className={
                    'w-full h-[30vh] min-h-[150px] group/form-cover'
                    + ` ${form.coverColor || 'bg-001'}`
                }>
                    <div className="w-full max-w-[645px] m-auto relative h-full flex items-center justify-center">
                        {
                            form?.status !== 'Archived' &&
                            <>
                                <Textarea
                                    value={title}
                                    className="w-full text-3xl font-bold border-none text-white !bg-transparent !px-0 text-center text-shadow-gray !shadow-none"
                                    autoHeight
                                    placeholder="Untitled"
                                    onChange={e => handleTitleChange(e.target.value)}
                                />
                                <div className="absolute w-full h-10 bottom-0 left-0 flex justify-end items-center gap-2 transition invisible group-hover/form-cover:visible">
                                    <Popup
                                        content={coverColors}
                                        className="bg-transparent !text-slate-900 dark:!text-white"
                                        open={coverConfigVisible}
                                        onOpenChange={setCoverConfigVisible}
                                    >
                                        <button
                                            onClick={() => { }}
                                            className="px-2 py-1 text-xs rounded transition bg-white/70 hover:bg-white dark:bg-slate-700/70 dark:hover:bg-slate-700"
                                        >
                                            Change cover
                                        </button>
                                    </Popup>
                                    <button
                                        onClick={removeCover}
                                        className="px-2 py-1 text-xs rounded transition bg-white/70 hover:bg-white dark:bg-slate-700/70 dark:hover:bg-slate-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </>
                        }
                        {
                            form?.status === 'Archived' &&
                            <>
                                <div
                                    className="w-full text-3xl font-bold border-none text-white !bg-transparent !px-0 text-center text-shadow-gray"
                                >
                                    <h1>{title}</h1>
                                </div>
                            </>
                        }
                    </div>
                </div>
            }
            <FormBodySelection>
                <div className="w-full max-w-[700px] m-auto px-7 text-base selection-area-allowed">
                    {
                        (!form?.coverType || form?.coverType === 'None') && form?.status !== 'Archived' &&
                        <>
                            <div className="w-full">
                                <button
                                    onClick={addCover}
                                    className="px-2 py-1 transition border border-slate-900/10 bg-slate-100 hover:bg-slate-200 dark:border-transparent dark:bg-slate-700/70 dark:hover:bg-slate-700 rounded text-sm"
                                >
                                    Add cover
                                </button>
                            </div>
                            <div className="w-full pb-5 pt-1">
                                <Textarea
                                    value={title}
                                    className="w-full text-3xl font-bold border-none !bg-transparent !px-0"
                                    autoHeight
                                    placeholder="Untitled"
                                    onChange={e => handleTitleChange(e.target.value)}
                                />
                            </div>
                        </>
                    }
                    {
                        (!form?.coverType || form?.coverType === 'None') && form?.status === 'Archived' &&
                        <div className="w-full pb-5 pt-1">
                            <div className="w-full text-3xl font-bold border-none !bg-transparent !px-0">
                                <h1>{title}</h1>
                            </div>
                        </div>
                    }
                    {
                        _.isEmpty(sections) && <EmptyForm form={form} />
                    }
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="pageWrap" type="page" isDropDisabled={form?.status === 'Archived'}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {sections.map((item, index) => (
                                        <Draggable key={item.code} draggableId={'section_' + item.code} index={index} isDragDisabled={form?.status === 'Archived'}>
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
            </FormBodySelection>
            <PropertiesDrawer />
        </>
    );
}

export default FormBuilder;
