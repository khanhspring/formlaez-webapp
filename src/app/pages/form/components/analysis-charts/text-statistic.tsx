import { FC } from "react";
import SimpleBar from "simplebar-react";
import { FormDataAnalysisItem } from "../../../../models/form-data-analysis";

type Props = {
    analysisItem: FormDataAnalysisItem;
}

const TextStatistic: FC<Props> = ({ analysisItem }) => {

    return (
        <>
            <div className="flex justify-between items-center">
                <span className="font-sm">{analysisItem.field.title} ({analysisItem.count})</span>
            </div>
            <div className="flex items-center justify-center w-full pt-5 pb-2">
                <SimpleBar style={{ maxHeight: '300px', width: '100%' }} autoHide={false}>
                    <div className="flex flex-col items-center justify-center gap-1.5 w-full">
                        {
                            analysisItem.values?.map((item, index) =>
                                <div className="w-full bg-slate-100 dark:bg-cinder-700 rounded px-2.5 py-1 flex items-center" key={index}>
                                    <span className="flex-1 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                                        {item.value}
                                    </span>
                                    <span className="w-10 font-bold bg-slate-200 dark:bg-cinder-600 rounded-xl px-2 flex items-center justify-center text-xs py-1">
                                        {item.count}
                                    </span>
                                </div>
                            )
                        }
                    </div>
                </SimpleBar>
            </div>
        </>
    );
}

export default TextStatistic;
