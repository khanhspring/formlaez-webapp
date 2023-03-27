import { FC } from "react";
import { FormDataAnalysisItem } from "../../../../models/form-data-analysis";
import OpinionScaleChart from "./opinion-scale-chart";
import RatingChart from "./rating-chart";
import SwitchChart from "./switch-chart";

type Props = {
    analysisItem: FormDataAnalysisItem;
}

const AnalysisChart: FC<Props> = ({ analysisItem }) => {

    const renderChar = () => {
        switch (analysisItem.field.type) {
            case 'Rating': return (<RatingChart analysisItem={analysisItem} />)
            case 'OpinionScale': return (<OpinionScaleChart analysisItem={analysisItem} />)
            case 'Switch': return (<SwitchChart analysisItem={analysisItem} />)
            default: return (<></>)
        }
    }

    return (
        <div className="w-full flex flex-col">
            <div className="font-sm">
                {analysisItem.field.title}
            </div>
            {renderChar()}
        </div>
    )
}

export default AnalysisChart;
