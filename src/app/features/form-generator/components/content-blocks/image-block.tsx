import { FC } from "react";

type Props = {
    url?: string;
}

const ImageBlock: FC<Props> = ({ url }) => {

    if (!url) {
        return <></>
    }

    return (
        <div className="w-full mt-2 mb-6">
            <img src={url} alt={url} className="w-full rounded" />
        </div>
    );
}

export default ImageBlock;
