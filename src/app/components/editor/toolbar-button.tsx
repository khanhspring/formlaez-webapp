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
    const block = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey());

    const blockType = block.getType();

    const alignData = block.getData().get("text-align");

    const isActive = currentStyle.has(type) || blockType === type || (
        (alignData === 'center' && type === 'align-center')
        || (alignData === 'right' && type === 'align-right')
        || (alignData === 'left' && type === 'align-left')
        || (alignData === 'justify' && type === 'align-justify')
    );

    const onMouseDown = (e: any) => {
        onToggle(type);
        e.preventDefault();
    }

    return (
        <span className={`cursor-pointer px-1.5 py-1 flex items-center justify-center ${isActive ? 'text-blue-700 fill-blue-700' : 'fill-white'}`} onMouseDown={onMouseDown}>
            {children}
        </span>
    );
}

export default ToolbarButton;