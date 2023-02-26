import { FC } from "react";

type Props = {
    url?: string;
}

const ImageBlock: FC<Props> = ({ url }) => {

    if (!url) {
        return <></>
    }

    return (
        <div className="w-full my-1">
            <img src={url} alt={url} className="w-full rounded" />
        </div>
    );
}

export default ImageBlock;
