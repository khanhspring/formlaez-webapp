import { FC } from "react";
import Editor from "../../../../components/editor/editor";

type Props = {
}

const TextField: FC<Props> = () => {

    return (
        <Editor placeholder="No content..." />
    );
}

export default TextField;