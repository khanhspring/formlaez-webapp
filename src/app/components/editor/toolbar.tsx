import { EditorState } from "draft-js";
import { FC } from "react";
import AlignCenterIcon from "../icons/align-center-icon";
import AlignJustifyIcon from "../icons/align-justify-icon";
import ToolbarButton from "./toolbar-button";

type Props = {
    onInlineClick: (type: string) => void;
    onBlockClick: (type: string) => void;
    editorState: EditorState;
}

const Toolbar: FC<Props> = ({ onInlineClick, onBlockClick, editorState }) => {

    return (
        <div className={`z-50 inline-flex px-1 rounded items-center bg-cinder-600 text-sm shadow-lg`}>
            <ToolbarButton onToggle={onBlockClick} type="paragraph" editorState={editorState}>
                <span>P</span>
            </ToolbarButton>
            <ToolbarButton onToggle={onBlockClick} type="header-two" editorState={editorState}>
                <span>H2</span>
            </ToolbarButton>
            <ToolbarButton onToggle={onBlockClick} type="header-three" editorState={editorState}>
                <span>H3</span>
            </ToolbarButton>
            <ToolbarButton onToggle={onBlockClick} type="header-four" editorState={editorState}>
                <span>H4</span>
            </ToolbarButton>
            <ToolbarButton onToggle={onInlineClick} type="BOLD" editorState={editorState}>
                <span className="font-bold">B</span>
            </ToolbarButton>
            <ToolbarButton onToggle={onInlineClick} type="ITALIC" editorState={editorState}>
                <span className="italic">i</span>
            </ToolbarButton>
            <ToolbarButton onToggle={onInlineClick} type="UNDERLINE" editorState={editorState}>
                <span className="underline">U</span>
            </ToolbarButton>
            <ToolbarButton onToggle={onBlockClick} type="blockquote" editorState={editorState}>
                <i className="fi fi-sr-quote-right"></i>
            </ToolbarButton>
            <ToolbarButton onToggle={onInlineClick} type="CODE" editorState={editorState}>
                <i className="fi fi-sr-code-simple"></i>
            </ToolbarButton>
            <ToolbarButton onToggle={onBlockClick} type="text-left" editorState={editorState}>
                <i className="fi fi-sr-align-left"></i>
            </ToolbarButton>
            <ToolbarButton onToggle={onBlockClick} type="text-center" editorState={editorState}>
                <AlignCenterIcon className="w-4" />
            </ToolbarButton>
            <ToolbarButton onToggle={onBlockClick} type="text-right" editorState={editorState}>
                <i className="fi fi-sr-symbol"></i>
            </ToolbarButton>
            <ToolbarButton onToggle={onBlockClick} type="text-justify" editorState={editorState}>
                <AlignJustifyIcon className="w-4" />
            </ToolbarButton>
        </div>
    );
}

export default Toolbar;