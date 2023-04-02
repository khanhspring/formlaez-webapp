import { FC } from "react";

type Props = {
    content?: string;
}

const HtmlBlock: FC<Props> = ({ content }) => {

    if (!content) {
        return <></>
    }

    return (
        <div className="w-full my-3">
            <div className="prose prose-base dark:prose-invert max-w-full" dangerouslySetInnerHTML={{__html: content}}/>
        </div>
    );
}

export default HtmlBlock;
