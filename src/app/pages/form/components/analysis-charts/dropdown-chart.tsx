import { FC } from "react";
import { FormDataAnalysisItem } from "../../../../models/form-data-analysis";
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from "echarts";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { selectTheme } from "../../../../slices/app-config";

type Props = {
    analysisItem: FormDataAnalysisItem;
}

const MultiChoiceChart: FC<Props> = ({ analysisItem }) => {

    const theme = useAppSelector(selectTheme);

    const dropdownOptions = analysisItem.field.options || [];

    const getLabel = (val?: any) => {
        const result = dropdownOptions.find(item => item.code === val);
        return result?.label || 'Unknown';
    }

    const data: any[] = analysisItem.values.map(item => ({value: item.count, name: getLabel(item.value)})) || [];

    const option: EChartsOption = {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                type: 'pie',
                radius: '80%',
                data: [...data],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    }
                },
                label: {
                    color: theme === 'dark' ? '#fff' : '#0f172a'
                }
            }
        ]
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <span className="font-sm">{analysisItem.field.title} ({analysisItem.count})</span>
            </div>
            <div className="flex items-center justify-center w-full">
                <ReactECharts
                    option={option}
                    style={{ height: 300, width: '100%' }}
                />
            </div>
        </>
    );
}

export default MultiChoiceChart;
