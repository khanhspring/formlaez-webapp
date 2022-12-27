import { EditorState, Modifier } from "draft-js";

function setBlockData(editorState: EditorState, data: any) {
    const newContentState = Modifier.setBlockData(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        data
    );
    return EditorState.push(editorState, newContentState, 'change-block-data');
}

function getBlockData(editorState: EditorState, key: string): any {
    const selection = editorState.getSelection();

    return editorState
            .getCurrentContent()
            ?.getBlockForKey(selection.getStartKey())
            ?.getData()
            ?.get(key);
}

function getBlockType(editorState: EditorState): any {
    const selection = editorState.getSelection();

    return editorState
            .getCurrentContent()
            ?.getBlockForKey(selection.getStartKey())
            ?.getType();
}

const DraftUtils = {
    setBlockData,
    getBlockData,
    getBlockType
}

export default DraftUtils;