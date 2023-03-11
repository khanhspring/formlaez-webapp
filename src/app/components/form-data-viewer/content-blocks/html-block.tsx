import { FC } from "react";

type Props = {
    content?: string;
}

const HtmlBlock: FC<Props> = ({ content }) => {

    if (!content) {
        return <></>
    }

    return (
        <div className="w-full my-1">
            <div className="prose prose-sm dark:prose-invert max-w-max html-block text-justify" dangerouslySetInnerHTML={{__html: content}}/>
        </div>
    );
}

export default HtmlBlock;