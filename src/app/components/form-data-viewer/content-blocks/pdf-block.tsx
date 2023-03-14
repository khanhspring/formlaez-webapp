import { FC, useState } from "react";
import Modal from "../../common/modal";

type Props = {
    url?: string;
}

const PdfBlock: FC<Props> = ({ url }) => {
    const [detailVisible, setDetailVisible] = useState(false);

    if (!url) {
        return <></>
    }

    return (
        <>
            <div className="w-full my-1">
                <button
                    onClick={() => setDetailVisible(true)}
                    className="px-3 py-1 text-sm bg-slate-200 hover:bg-slate-300 dark:bg-cinder-600 rounded dark:hover:bg-cinder-600/70 transition"
                >
                    View PDF
                </button>
            </div>
            <Modal
                title="Youtube video"
                visible={detailVisible}
                onClose={() => setDetailVisible(false)}
                width={700}
                hideOk
                hideCancel
                destroyOnClose
                bodyClassName='!pb-5'
                wrapClassName='flex items-center'
            >
                <iframe src={`${url}#view=FitH`}
                    title="PDF"
                    width="100%"
                    height="700px"
                >
                </iframe>
            </Modal>
        </>
    );
}

export default PdfBlock;
