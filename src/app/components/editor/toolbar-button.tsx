import { EditorState } from "draft-js";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & {
    type: string,
    onToggle: (type: string) => void;
    editorState: EditorState;
}

const ToolbarButton: FC<Props> = ({ onToggle, type, editorState, children }) => {
    const currentStyle = editorState.getCurrentInlineStyle();

    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    const isActive = currentStyle.has(type) || blockType === type;

    const onMouseDown = (e: any) => {
        onToggle(type);
        e.preventDefault();
    }

    return (
        <span className={`cursor-pointer px-1.5 py-1 flex items-center justify-center fill-white ${isActive ? 'text-blue-700 fill-blue-700' : ''}`} onMouseDown={onMouseDown}>
            {children}
        </span>
    );
}

export default ToolbarButton;