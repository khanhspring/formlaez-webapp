import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import { FC, RefObject, TextareaHTMLAttributes, useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { orElseEmptyString } from "../../../util/common";
import AutoSizeTextarea from "../../common/auto-size-textarea";
import Modal from "../../common/modal";
import { FieldStatus } from "../form-types";

type Props = TextareaHTMLAttributes<any> & {
    status?: FieldStatus;
    container?: RefObject<any>;
    autoHeight?: boolean;
    autoWidth?: boolean;
    autoSize?: boolean;
    autoFocus?: boolean;
    maxWidth?: number;
    rows?: number;
    value?: string;
}

const MarkdownEditor: FC<Props> = ({
    className = '',
    status,
    value,
    container,
    autoHeight = false,
    autoWidth = false,
    autoSize = false,
    autoFocus = false,
    maxWidth,
    rows = 1,
    ...rest
}) => {

    const [currentTab, setCurrentTab] = useState<'write' | 'preview'>('write');
    const [fullModalVisible, setFullModalVisible] = useState(false);


    return (
        <>
            <div className="flex flex-col w-full rounded-md border border-slate-900/10 dark:border-steel-gray-800 p-2">
                <div className="w-full flex items-center justify-between pb-2">
                    <div className="flex gap-1 items-center text-sm">
                        <span className={`inline-block px-1.5 py-0.5 rounded cursor-pointer ${currentTab === 'write' ? 'bg-zinc-100 dark:bg-steel-gray-800' : ''}`} onClick={() => setCurrentTab('write')}>Write</span>
                        <span className={`inline-block px-1.5 py-0.5 rounded cursor-pointer ${currentTab === 'preview' ? 'bg-zinc-100 dark:bg-steel-gray-800' : ''}`} onClick={() => setCurrentTab('preview')}>Preview</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <ArrowsPointingOutIcon className="w-5 h-5 cursor-pointer" onClick={() => setFullModalVisible(true)} />
                    </div>
                </div>
                <AutoSizeTextarea
                    {...rest}
                    autoHeight={autoHeight}
                    autoSize={autoSize}
                    autoWidth={autoWidth}
                    autoFocus={autoFocus}
                    onChange={rest.onChange}
                    rows={rows}
                    value={orElseEmptyString(value)}
                    className={
                        'border bg-white border-slate-900/10 dark:border-steel-gray-800 dark:bg-steel-gray-900 dark:hover:border-steel-gray-700 shadow-sm rounded outline-none px-4 py-2 resize-none placeholder:text-gray-400 '
                        + `${status && status === 'error' ? '!border-rose-700' : ''} `
                        + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
                        + `${status && status === 'success' ? '!border-green-700' : ''} `
                        + `${className} `
                        + `${currentTab === 'write' ? '' : 'hidden'} `
                    }
                />
                {
                    currentTab === 'preview' &&
                    <div className="prose dark:prose-invert text-slate-950 dark:text-white px-4 py-2">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {value || ''}
                        </ReactMarkdown>
                    </div>
                }
            </div>
            <Modal
                visible={fullModalVisible}
                onClose={() => setFullModalVisible(false)}
                width={1000}
                title="Detail"
                hideOk
                cancelText="Close"
            >
                <div className="w-full flex items-center justify-between pb-2">
                    <div className="flex gap-1 items-center text-sm">
                        <span className={`inline-block px-1.5 py-0.5 rounded cursor-pointer ${currentTab === 'write' ? 'bg-zinc-100 dark:bg-steel-gray-800' : ''}`} onClick={() => setCurrentTab('write')}>Write</span>
                        <span className={`inline-block px-1.5 py-0.5 rounded cursor-pointer ${currentTab === 'preview' ? 'bg-zinc-100 dark:bg-steel-gray-800' : ''}`} onClick={() => setCurrentTab('preview')}>Preview</span>
                    </div>
                </div>
                {
                    currentTab === 'write' &&
                    <AutoSizeTextarea
                        {...rest}
                        onChange={rest.onChange}
                        rows={10}
                        value={orElseEmptyString(value)}
                        autoHeight={autoHeight}
                        autoSize={autoSize}
                        autoWidth={autoWidth}
                        autoFocus={autoFocus}
                        className={
                            'border bg-white border-slate-900/10 dark:border-steel-gray-800 dark:bg-steel-gray-900 dark:hover:border-steel-gray-700 shadow-sm rounded outline-none px-4 py-2 resize-none placeholder:text-gray-400 '
                            + `${status && status === 'error' ? '!border-rose-700' : ''} `
                            + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
                            + `${status && status === 'success' ? '!border-green-700' : ''} `
                            + `${className} `
                        }
                    />
                }
                {
                    currentTab === 'preview' &&
                    <div className="prose dark:prose-invert text-slate-950 dark:text-white px-4 py-2">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {value || ''}
                        </ReactMarkdown>
                    </div>
                }
            </Modal>
        </>
    );
}

export default MarkdownEditor;
