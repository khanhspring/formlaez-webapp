import { FC, useState } from "react";
import {TwitterTweetEmbed} from "react-twitter-embed";
import { useAppSelector } from "../../../hooks/redux-hook";
import { selectTheme } from "../../../slices/app-config";
import Loading from "../../common/loading";
import Modal from "../../common/modal";

type Props = {
    url?: string;
}

const TwitterTweetBlock: FC<Props> = ({ url }) => {

    const [detailVisible, setDetailVisible] = useState(false);

    const theme = useAppSelector(selectTheme);
    const options: any = {};
    if (theme === 'dark') {
        options['theme'] = 'dark'
    }

    if (!url) {
        return <></>
    }

    return (
        <>
            <div className="w-full my-1">
                <button
                    onClick={() => setDetailVisible(true)}
                    className="px-3 py-1 text-sm bg-slate-200 hover:bg-slate-300 dark:bg-cinder-600 rounded dark:hover:bg-cinder-600/70 transition flex items-center gap-2"
                >
                    View Tweet <i className="fi fi-brands-twitter"></i>
                </button>
            </div>
            <Modal
                title="Tweet"
                visible={detailVisible}
                onClose={() => setDetailVisible(false)}
                width={600}
                hideOk
                hideCancel
                destroyOnClose
                bodyClassName='!pb-5'
                wrapClassName='flex items-center'
            >
                <div className="w-full flex justify-center">
                    <div className="max-w-[550px] w-full">
                        <TwitterTweetEmbed
                            tweetId={url}
                            options={options}
                            placeholder={<div className="w-full flex justify-center"><Loading /></div>}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default TwitterTweetBlock;
