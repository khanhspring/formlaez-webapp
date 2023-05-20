import { FC, useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import { ConfigSections, DecoratorConfigFields, FormControlConfigFields } from "../../../../constants/config-fields";
import { useAppDispatch } from "../../../../hooks/redux-hook";
import { ActionContext, AddFormField, AddFormSection, ConfigField, ConfigSection } from "../../../../models/form";
import { addGroupField, addSection, addSingleField } from "../../slice";

type Props = {
    context: ActionContext;
    onMenuClick: () => void;
    visible?: boolean;
}

const AddNewMenu: FC<Props> = ({ context, onMenuClick, visible }) => {

    const dispatch = useAppDispatch();
    const [query, setQuery] = useState<string>('');
    const searchRef = useRef<HTMLInputElement>(null);

    const onAddFieldClick = (config: ConfigField) => {
        onMenuClick?.();
        if (context.type === 'SingleField' || context.type === 'Group') {
            // add new single field after the current one
            addSectionSingleField(config);
            return;
        }

        if (context.type === 'GroupField') {
            addNestedField(config);
            return;
        }
    }

    const addSectionSingleField = (config: ConfigField) => {
        const addFieldCommand: AddFormField = {
            sectionIndex: context.sectionIndex,
            field: config.default()
        }
        dispatch(addSingleField(addFieldCommand))
    }

    const addNestedField = (config: ConfigField) => {
        const addFieldCommand: AddFormField = {
            sectionIndex: context.sectionIndex,
            fieldIndex: context.fieldIndex,
            field: config.default()
        }

        dispatch(addGroupField(addFieldCommand))
    }

    const onAddGroupClick = (config: ConfigSection) => {
        onMenuClick?.();
        if (context.type === 'GroupField') {
            // not support to add nested group
            return;
        }

        const addSectionCommand: AddFormSection = {
            sectionIndex: context.sectionIndex,
            section: config.default()
        }
        dispatch(addSection(addSectionCommand));
    }

    useEffect(() => {
        if (visible) {
            searchRef.current?.focus()
        }
    }, [visible])

    return (
        <div className="w-[250px] bg-white dark:bg-steel-gray-900 rounded">
            <div className="w-full px-3 pt-3 pb-0">
                <input
                    ref={searchRef}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search..." className="w-full bg-transparent text-slate-900 dark:text-white outline-none"
                />
                <div className="border-b border-slate-900/10 dark:border-slate-600 mt-2"></div>
            </div>
            <SimpleBar style={{ maxHeight: '350px' }} autoHide={false}>
                <div className="w-full py-2 px-1 rounded flex flex-col gap-1.5">
                    <div className="text-xs px-2 py-0.5 text-slate-700 dark:text-gray-500">Form controls</div>
                    {
                        FormControlConfigFields
                            .filter(item => item.name.toLowerCase().includes(query?.toLowerCase()))
                            .map((item, index) =>
                                <div
                                    className="px-2 py-1 cursor-pointer hover:bg-slate-200 dark:bg-transparent dark:hover:bg-steel-gray-800 flex flex-col gap-1"
                                    key={index}
                                    onClick={() => onAddFieldClick(item)}
                                >
                                    <h3 className="text-sm text-slate-900 dark:text-white">{item.name}</h3>
                                    {item.description && <p className="text-xs text-slate-800 dark:text-gray-400">{item.description}</p>}
                                </div>
                            )
                    }

                    <div className="px-2 py-1">
                        <div className="border-b border-slate-900/10 dark:border-slate-600"></div>
                    </div>
                    <div className="text-xs px-2 py-0.5 text-slate-700 dark:text-gray-500">Content blocks</div>
                    {
                        DecoratorConfigFields
                            .filter(item => item.name.toLowerCase().includes(query?.toLowerCase()))
                            .map((item, index) =>
                                <div
                                    className="px-2 py-1 cursor-pointer hover:bg-slate-200 dark:bg-transparent dark:hover:bg-steel-gray-800 flex flex-col gap-1"
                                    key={index}
                                    onClick={() => onAddFieldClick(item)}
                                >
                                    <h3 className="text-sm text-slate-900 dark:text-white">{item.name}</h3>
                                    {item.description && <p className="text-xs text-slate-800 dark:text-gray-400">{item.description}</p>}
                                </div>
                            )
                    }
                    {
                        context.type !== 'GroupField' &&
                        <>
                            <div className="px-2 py-1">
                                <div className="border-b border-slate-900/10 dark:border-slate-600"></div>
                            </div>
                            <div className="text-xs px-2 py-0.5 text-slate-700 dark:text-gray-500">Advance blocks</div>
                            {
                                ConfigSections
                                    .filter(item => item.name.toLowerCase().includes(query?.toLowerCase()))
                                    .map((item, index) =>
                                        <div
                                            className="px-2 py-1 cursor-pointer hover:bg-slate-200 dark:bg-transparent dark:hover:bg-steel-gray-800 flex flex-col gap-1"
                                            key={index}
                                            onClick={() => onAddGroupClick(item)}
                                        >
                                            <h3 className="text-sm text-slate-900 dark:text-white">{item.name}</h3>
                                            {item.description && <p className="text-xs text-slate-800 dark:text-gray-400">{item.description}</p>}
                                        </div>
                                    )
                            }
                        </>
                    }
                </div>
            </SimpleBar>
        </div>
    );
}

export default AddNewMenu;