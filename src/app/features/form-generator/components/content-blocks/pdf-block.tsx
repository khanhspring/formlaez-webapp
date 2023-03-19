import { FC } from "react";

type Props = {
    url?: string;
}

const PdfBlock: FC<Props> = ({ url }) => {

    if (!url) {
        return <></>
    }

    return (
        <div className="w-full mt-2 mb-6">
            <iframe src={`${url}#view=FitH`}
                title="PDF"
                width="100%"
                height="500px"
            >
            </iframe>
        </div>
    );
}

export default PdfBlock;
