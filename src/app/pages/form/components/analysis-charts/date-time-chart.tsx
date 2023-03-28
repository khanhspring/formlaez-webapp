import { FC, useEffect, useState, useMemo } from "react";
import { FormDataAnalysisItem } from "../../../../models/form-data-analysis";
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from "echarts";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { selectTheme } from "../../../../slices/app-config";

type Props = {
    analysisItem: FormDataAnalysisItem;
}


const getOption = (data: any[], labels: any[], theme: 'dark' | 'light'): EChartsOption => {
    return {
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
                data: [...labels],
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
                },
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
                },
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
    }
};

const DateTimeChart: FC<Props> = ({ analysisItem }) => {

    const theme = useAppSelector(selectTheme);
    const [data, setData] = useState<any[]>([]);
    const [labels, setLabels] = useState<any[]>([]);
    const [option, setOption] = useState<'date' | 'dateTime' | 'year'>('date');

    const yearDataLabels = useMemo(() => {
        const yearData: any[] = [];
        const yearLabels: any[] = [];
        if (analysisItem.years) {
            for (const year of analysisItem.years) {
                yearData.push(year.count);
                yearLabels.push(year.value);
            }
        }
        return [yearData, yearLabels]
    }, [analysisItem.years]);

    const dateDataLabels = useMemo(() => {
        const dateData: any[] = [];
        const dateLabels: any[] = [];
        if (analysisItem.dates) {
            for (const date of analysisItem.dates) {
                dateData.push(date.count);
                dateLabels.push(date.value);
            }
        }
        return [dateData, dateLabels]
    }, [analysisItem.dates]);

    const dateTimeDataLabels = useMemo(() => {
        const dateTimeData: any[] = [];
        const dateTimeLabels: any[] = [];

        if (analysisItem.dateTimes) {
            for (const dateTime of analysisItem.dateTimes) {
                dateTimeData.push(dateTime.count);
                dateTimeLabels.push(dateTime.value);
            }
        }
        return [dateTimeData, dateTimeLabels]
    }, [analysisItem.dateTimes]);

    useEffect(() => {
        if (option === 'date') {
            setData(dateDataLabels[0]);
            setLabels(dateDataLabels[1]);
        }
        if (option === 'dateTime') {
            setData(dateTimeDataLabels[0]);
            setLabels(dateTimeDataLabels[1]);
        }
        if (option === 'year') {
            setData(yearDataLabels[0]);
            setLabels(yearDataLabels[1]);
        }
    }, [dateDataLabels, dateTimeDataLabels, option, yearDataLabels])

    return (
        <>
            <div className="flex justify-between items-center">
                <span className="font-sm">{analysisItem.field.title} ({analysisItem.count})</span>
                <div className="flex items-center">
                    <button
                        onClick={() => setOption('date')}
                        className={`text-xs px-2 py-1 bg-slate-200 dark:bg-cinder-700 rounded-tl rounded-bl ${option === 'date' ? '!bg-blue-700 text-white' : ''}`}
                    >
                        Date
                    </button>
                    {
                        analysisItem.field.showTime &&
                        <button
                            onClick={() => setOption('dateTime')}
                            className={`text-xs px-2 py-1 bg-slate-200 dark:bg-cinder-700 ${option === 'dateTime' ? '!bg-blue-700 text-white' : ''}`}
                        >
                            Datetime
                        </button>
                    }
                    <button
                        onClick={() => setOption('year')}
                        className={`text-xs px-2 py-1 bg-slate-200 dark:bg-cinder-700 rounded-tr rounded-br ${option === 'year' ? '!bg-blue-700 text-white' : ''}`}
                    >
                        Year
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-center w-full">
                <ReactECharts
                    option={getOption(data, labels, theme)}
                    style={{ height: 400, width: '100%' }}
                />
            </div>
        </>
    );
}

export default DateTimeChart;
