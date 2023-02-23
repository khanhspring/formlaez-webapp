import React, { FC, useEffect, useState } from "react";

import { ContentBlock, DefaultDraftBlockRenderMap, DraftHandleValue, Editor as DraftEditor, EditorState, RichUtils } from "draft-js";
import Immutable from "immutable";
import DraftUtils from "./drafjs.util";
import Toolbar from "./toolbar";

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
    }, [editorState]);

    useEffect(() => {
        const selection = editorState.getSelection();
        if (selection.getHasFocus() && selection.getStartOffset() !== selection.getEndOffset()) {
            setShowToolbar(true);
        } else {
            setShowToolbar(false);
        }
    }, [editorState]);

    const onInlineClick = (e: string) => {
        if (e.startsWith('align-')) {
            const currentTextAlign = DraftUtils.getBlockData(editorState, 'text-align');

            const textAlign = e.split("-")[1];

            let value = undefined;
            let state = editorState;
            if (!currentTextAlign || currentTextAlign !== textAlign) {
                if (currentTextAlign) {
                    state = RichUtils.toggleInlineStyle(editorState, `align-${currentTextAlign}`);
                }
                value = textAlign;
            }

            const data = Immutable.Map({ 'text-align': value });
            const newEditorState = DraftUtils.setBlockData(state, data);
            let nextState = RichUtils.toggleInlineStyle(newEditorState, e);
            setEditorState(nextState);
            return;
        }

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

    const blockStyleFn = (block: ContentBlock): string => {
        const blockAlignment = block.getData() && block.getData().get('text-align');
        if (blockAlignment === 'center') {
            return "text-center";
        }
        if (blockAlignment === 'right') {
            return "text-right";
        }
        if (blockAlignment === 'justify') {
            return "text-justify";
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
            <div className="w-full max-w-none prose dark:prose-invert prose-sm prose-headings:mt-0">
                <DraftEditor
                    ref={editor}
                    editorState={editorState}
                    onChange={(editorState: any) => setEditorState(editorState)}
                    stripPastedStyles={false}
                    placeholder={placeholder}
                    handleKeyCommand={handleKeyCommand}
                    blockRenderMap={extendedBlockRenderMap}
                    blockStyleFn={blockStyleFn}
                />
            </div>
        </div>
    );
}

export default Editor;
