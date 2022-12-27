import { FC } from "react";
import Editor from "../editor/editor";

type Props = {
}

const TextField: FC<Props> = () => {

    return (
        <Editor placeholder="No content..." />
    );
}

export default TextField;