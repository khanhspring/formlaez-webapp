import { FC } from "react";
import { FormDataAnalysisItem } from "../../../../models/form-data-analysis";
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from "echarts";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { selectTheme } from "../../../../slices/app-config";

type Props = {
    analysisItem: FormDataAnalysisItem;
}

const SwitchChart: FC<Props> = ({ analysisItem }) => {

    const theme = useAppSelector(selectTheme);

    const trueValue = analysisItem.values.find(item => item.value === 'true') || { count: 0 };
    const falseValue = analysisItem.values.find(item => item.value === 'false') || { count: 0 };

    const option: EChartsOption = {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                type: 'pie',
                radius: '80%',
                data: [
                    { value: trueValue.count, name: 'Yes' },
                    { value: falseValue.count, name: 'No' },
                ],
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
        <div className="flex items-center justify-center w-full">
            <ReactECharts
                option={option}
                style={{ height: 300, width: '100%' }}
            />
        </div>
    );
}

export default SwitchChart;
