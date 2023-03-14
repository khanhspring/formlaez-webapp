import { FC, useState } from "react";
import Modal from "../../common/modal";

type Props = {
    url?: string;
}

const extractYoutubeCode = (url: string) => {
    return url?.replace('https://www.youtube.com/embed/', '').replace('/', '');
}

const VideoBlock: FC<Props> = ({ url }) => {

    const [detailVisible, setDetailVisible] = useState(false);

    if (!url) {
        return <></>
    }

    return (
        <>
            <div
                onClick={() => setDetailVisible(true)}
                className="w-full max-w-[200px] my-1 relative cursor-pointer"
            >
                <img
                    src={`https://i.ytimg.com/vi/${extractYoutubeCode(url)}/hq720.jpg`}
                    alt=""
                    className="rounded"
                />
                <span className="w-5 h-5 absolute bg-white top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"></span>
                <i className="fi fi-brands-youtube absolute text-red-700 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-4xl"></i>
            </div>
            <Modal
                title="Youtube video"
                visible={detailVisible}
                onClose={() => setDetailVisible(false)}
                width={800}
                hideOk
                hideCancel
                destroyOnClose
                bodyClassName='!pb-5'
                wrapClassName='flex items-center'
            >
                <iframe
                    className="w-full aspect-video"
                    src={`${url}?modestbranding=0&rel=0`}
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    allowFullScreen
                ></iframe>
            </Modal>
        </>
    );
}

export default VideoBlock;
