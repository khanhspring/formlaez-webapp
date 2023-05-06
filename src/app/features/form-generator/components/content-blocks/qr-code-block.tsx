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
        <div className="w-full mt-2 mb-6 flex items-center justify-center">
            <div className="p-1.5 bg-slate-100 rounded shadow">
                <QRCodeSVG value={content} />
            </div>
        </div>
    );
}

export default QRCodeBlock;
