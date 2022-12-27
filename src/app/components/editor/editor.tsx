import React, { FC, useEffect, useState } from "react";

import { DefaultDraftBlockRenderMap, DraftHandleValue, Editor as DraftEditor, EditorState, RichUtils } from "draft-js";
import Toolbar from "./toolbar";
import Immutable from "immutable";

type Props = {
    autoFocus?: boolean;
    placeholder?: string;
}

const Editor: FC<Props> = ({ autoFocus, placeholder }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const editor = React.useRef<any>(null);

    function focusEditor() {
        editor.current.focus();
    }

    useEffect(() => {
        if (autoFocus) {
            focusEditor();
        }
    }, [autoFocus]);

    useEffect(() => {
        const selection = editorState.getSelection();
        if (selection.getHasFocus() && selection.getStartOffset() !== selection.getEndOffset()) {
            setShowToolbar(true);
        } else {
            setShowToolbar(false);
        }
    }, [editorState]);

    const onInlineClick = (e: any) => {
        let nextState = RichUtils.toggleInlineStyle(editorState, e);
        setEditorState(nextState);
    };

    const onBlockClick = (e: any) => {
        let nextState = RichUtils.toggleBlockType(editorState, e);
        setEditorState(nextState);
    };

    const handleKeyCommand = (command: string, editorState: EditorState, eventTimeStamp: number): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    const [showToolbar, setShowToolbar] = useState(false);

    function myBlockStyleFn(contentBlock: any): string {
        const type = contentBlock.getType();
        if (type === 'text-left') {
            return '';
        }
        if (type === 'text-center') {
            return 'text-center';
        }
        if (type === 'text-right') {
            return 'text-right';
        }
        if (type === 'text-justify') {
            return 'text-justify';
        }
        return '';
    }

    const blockRenderMap = Immutable.Map({
        'paragraph': {
            element: 'p'
        }
    });

    const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

    return (
        <div onClick={focusEditor} className="relative w-full">
            <div className={`sticky top-[100px] w-full h-0 translate-y-[-30px] ${showToolbar ? 'block' : 'hidden'}`}>
                <Toolbar onBlockClick={onBlockClick} onInlineClick={onInlineClick} editorState={editorState} />
            </div>
            <div className="w-full max-w-none prose dark:prose-invert prose-headings:mt-0">
                <DraftEditor
                    ref={editor}
                    editorState={editorState}
                    onChange={(editorState: any) => setEditorState(editorState)}
                    stripPastedStyles={false}
                    placeholder={placeholder}
                    blockStyleFn={myBlockStyleFn}
                    handleKeyCommand={handleKeyCommand}
                    blockRenderMap={extendedBlockRenderMap}
                />
            </div>
        </div>
    );
}

export default Editor;
