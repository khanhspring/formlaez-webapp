import { FC } from "react";
import { FormDataAnalysisItem } from "../../../../models/form-data-analysis";
import DateTimeChart from "./date-time-chart";
import { default as DropdownChart, default as MultiChoiceChart } from "./dropdown-chart";
import NumberStatistic from "./number-statistic";
import OpinionScaleChart from "./opinion-scale-chart";
import RatingChart from "./rating-chart";
import SwitchChart from "./switch-chart";
import TextStatistic from "./text-statistic";
import StatusChoiceChart from "./status-choice-chart";

type Props = {
    analysisItem: FormDataAnalysisItem;
}

const AnalysisChart: FC<Props> = ({ analysisItem }) => {

    const renderChar = () => {
        switch (analysisItem.field.type) {
            case 'Rating': return (<RatingChart analysisItem={analysisItem} />)
            case 'OpinionScale': return (<OpinionScaleChart analysisItem={analysisItem} />)
            case 'Switch': return (<SwitchChart analysisItem={analysisItem} />)
            case 'Datetime': return (<DateTimeChart analysisItem={analysisItem} />)
            case 'Dropdown': return (<DropdownChart analysisItem={analysisItem} />)
            case 'MultipleChoice': return (<MultiChoiceChart analysisItem={analysisItem} />)
            case 'InputText': return (<TextStatistic analysisItem={analysisItem} />)
            case 'Email': return (<TextStatistic analysisItem={analysisItem} />)
            case 'InputNumber': return (<NumberStatistic analysisItem={analysisItem} />)
            case 'StatusList': return (<StatusChoiceChart analysisItem={analysisItem} />)
            case 'InputUrl': return (<TextStatistic analysisItem={analysisItem} />)
            default: return (<></>)
        }
    }

    return (
        <div className="w-full flex flex-col bg-zinc-50 dark:bg-steel-gray-900 rounded-md p-5">
            {renderChar()}
        </div>
    )
}

export default AnalysisChart;
