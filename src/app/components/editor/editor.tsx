import React, { FC, useCallback, useEffect, useRef, useState } from "react";

import { ContentBlock, ContentState, convertFromHTML, convertFromRaw, DefaultDraftBlockRenderMap, DraftHandleValue, Editor as DraftEditor, EditorState, RichUtils } from "draft-js";
import { RenderConfig, stateToHTML } from "draft-js-export-html";
import Immutable from "immutable";
import DraftUtils from "./drafjs.util";
import Toolbar from "./toolbar";
import { stateFromHTML } from "draft-js-import-html";
import { CustomBlockObject } from "draft-js-import-html";

type Props = {
    autoFocus?: boolean;
    placeholder?: string;
    onHtmlChange?: (content?: string) => void;
    initHtmlContent?: string;
    initContent?: any;
}

const Editor: FC<Props> = ({ autoFocus, placeholder, initHtmlContent, initContent, onHtmlChange }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const updateTimeout = useRef<any>(null);

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

    const blockStyleFn = useCallback((block: ContentBlock): string => {
        // onAfterChange();
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
    }, [])

    const blockRenderMap = Immutable.Map({
        'unstyled': {
            element: 'section',
        }
    });

    const onStateChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
        const newHtml = stateToHTML(newEditorState.getCurrentContent());
        const currentHtml = stateToHTML(editorState.getCurrentContent());
        if (newHtml !== currentHtml) {
            onAfterChange(newEditorState);
        }
    }

    const blockStyleExportFn = (block: ContentBlock): RenderConfig | undefined => {
        const blockAlignment = block.getData() && block.getData().get('text-align');
        if (blockAlignment) {
            return {
                element: 'section',
                attributes: {
                    className: `text-${blockAlignment}`
                }
            }
        }
    }

    const onAfterChange = useCallback((newEditorState?: EditorState) => {
        if (updateTimeout.current) {
            clearTimeout(updateTimeout.current);
        }
        updateTimeout.current = setTimeout(() => {
            const currentContent = newEditorState ? newEditorState.getCurrentContent() : editorState.getCurrentContent();
            const currentHtmlContent = stateToHTML(currentContent, {
                defaultBlockTag: 'section',
                blockStyleFn: blockStyleExportFn
            });
            onHtmlChange?.(currentHtmlContent);
        }, 1500)
    }, [editorState, onHtmlChange]);

    const onBlur = () => {
        onAfterChange();
    }

    const customBlockImportFn = (element: Element): CustomBlockObject | undefined | null => {
        const className = element.getAttribute('class');
        if (className && className.includes("text-right")) {
            return {
                data: {'text-align': 'right'}
            }
        }

        if (className && className.includes("text-center")) {
            return {
                data: {'text-align': 'center'}
            }
        }

        if (className && className.includes("text-justify")) {
            return {
                data: {'text-align': 'justify'}
            }
        }
    }

    useEffect(() => {
        if (initHtmlContent) {
            const editorState = EditorState.createWithContent(stateFromHTML(initHtmlContent, {
                customBlockFn: customBlockImportFn
            }));
            setEditorState(editorState);
            return;
        }
        if (initContent) {
            const editorState = EditorState.createWithContent(convertFromRaw(initContent));
            setEditorState(editorState);
            return;
        }
    }, []);

    const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

    return (
        <div onClick={focusEditor} className="relative w-full">
            <div className={`sticky top-[100px] w-full h-0 translate-y-[-30px] ${showToolbar ? 'block' : 'hidden'}`}>
                <Toolbar onBlockClick={onBlockClick} onInlineClick={onInlineClick} editorState={editorState} />
            </div>
            <div className="w-full max-w-none prose dark:prose-invert prose-base prose-headings:m-0">
                <DraftEditor
                    ref={editor}
                    editorState={editorState}
                    onChange={onStateChange}
                    stripPastedStyles={false}
                    placeholder={placeholder}
                    handleKeyCommand={handleKeyCommand}
                    blockRenderMap={extendedBlockRenderMap}
                    blockStyleFn={blockStyleFn}
                    onBlur={onBlur}
                />
            </div>
        </div>
    );
}

export default Editor;
