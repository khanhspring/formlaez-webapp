import { FC, useState } from "react";
import Modal from "../../common/modal";

type Props = {
    url?: string;
}

const ImageBlock: FC<Props> = ({ url }) => {
    const [detailVisible, setDetailVisible] = useState(false);

    if (!url) {
        return <></>
    }

    return (
        <>
            <div
                onClick={() => setDetailVisible(true)}
                className="w-full my-1 cursor-pointer"
            >
                <img src={url} alt={url} className="w-full max-w-[200px] rounded" />
            </div>
            <Modal
                title="Image"
                visible={detailVisible}
                onClose={() => setDetailVisible(false)}
                width={700}
                hideOk
                hideCancel
                destroyOnClose
                bodyClassName='!pb-5'
                wrapClassName='flex items-center'
            >
                <img src={url} alt={url} className="w-full" />
            </Modal>
        </>
    );
}

export default ImageBlock;
