import { FC } from "react";

type Props = {
    url?: string;
}

const VideoBlock: FC<Props> = ({ url }) => {

    if (!url) {
        return <></>
    }

    return (
        <div className="w-full mt-2 mb-6">
            <iframe
                className="w-full aspect-video"
                src={`${url}?modestbranding=0&rel=0`}
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default VideoBlock;
