import { FC } from "react";
import { FormDataAnalysisItem } from "../../../../models/form-data-analysis";
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from "echarts";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { selectTheme } from "../../../../slices/app-config";

type Props = {
    analysisItem: FormDataAnalysisItem;
}

const OpinionScaleChart: FC<Props> = ({ analysisItem }) => {

    const theme = useAppSelector(selectTheme);

    const data: any[] = [];
    for (let i = 1; i <= 10; i++) {
        const value = analysisItem.values.find(item => +item.value === i) || { count: 0 };
        data.push(value.count)
    }

    const option: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        grid: {
            left: 0,
            right: 0,
        },
        xAxis: [
            {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    color: theme === 'dark' ? '#fff' : '#0f172a'
                },
                axisLine: {
                    lineStyle: {
                        color: theme === 'dark' ? '#2B2B40' : 'rgb(15 23 42 / 10%)'
                    }
                }
            },
        ],
        yAxis: [
            {
                type: 'value',
                interval: 1,
                splitLine: {
                    lineStyle: {
                        color: theme === 'dark' ? '#2B2B40' : 'rgb(15 23 42 / 10%)'
                    }
                }
            }
        ],
        series: [
            {
                name: 'Count',
                type: 'bar',
                barWidth: '50px',
                data: [...data],
                color: '#009df6'
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
                    style={{ height: 400, width: '100%' }}
                />
            </div>
        </>
    );
}

export default OpinionScaleChart;
