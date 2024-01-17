import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

export interface BaseChartProps {
    options: echarts.EChartsOption
};

const Index: React.FC<BaseChartProps> = ({ options }) => {

    const chartRef = useRef<HTMLInputElement>(null);
    const [chart, setChart] = useState<echarts.ECharts>();

    const handleResize = () => {
        chart?.resize();
    };

    const initChart = () => {
        if (chart) {
            window.removeEventListener("resize", handleResize);
            chart?.dispose();
        }

        const newChart = echarts?.init(chartRef?.current as HTMLElement);
        newChart.setOption(options, true);
        window.addEventListener("resize", handleResize);
        setChart(newChart);
    };

    useEffect(() => {
        initChart();
    }, [options])

    return <div id="g111" ref={chartRef} style={{ height: "100%", width: "100%" }} />
};

export default Index;