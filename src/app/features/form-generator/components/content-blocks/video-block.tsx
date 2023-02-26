import { FC } from "react";

type Props = {
    url?: string;
}

const VideoBlock: FC<Props> = ({ url }) => {

    if (!url) {
        return <></>
    }

    return (
        <div className="w-full my-1">
            <iframe
                width="100%"
                height="300"
                src={`${url}?modestbranding=0&rel=0`}
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            ></iframe>
        </div>
    );
}

export default VideoBlock;
