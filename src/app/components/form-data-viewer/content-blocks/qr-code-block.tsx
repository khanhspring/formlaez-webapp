import { QRCodeSVG } from "qrcode.react";
import { FC } from "react";

type Props = {
    content?: string;
}

const QRCodeBlock: FC<Props> = ({ content }) => {

    if (!content) {
        return <></>
    }

    return (
        <>
            <div className="w-full my-1 flex items-center">
                <div className="p-2 bg-slate-100 dark:bg-white rounded">
                    <QRCodeSVG value={content} />
                </div>
            </div>
        </>
    );
}

export default QRCodeBlock;
