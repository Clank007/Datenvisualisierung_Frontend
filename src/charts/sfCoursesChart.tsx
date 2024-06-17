import { Line } from "react-chartjs-2";
import { Chart as ChartJS, 
    CategoryScale,
    LineElement, 
    PointElement, 
    LinearScale, 
    Title, 
    Tooltip, 
    Legend, 
    Filler,
    Colors } from 'chart.js';
import SchwundfaktorFormat from './helperTypes';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { schwundfaktorDaten } from "./helperData";
import React, { useEffect, useRef } from "react";
import html2canvas from 'html2canvas';
import '@fortawesome/fontawesome-free/css/all.css';
const {RGB_CD_BLAU, RGB_CD_TUERKIS, RGB_CD_GRUEN, RGB_CD_HELLGRUEN, RGB_CD_GELB, RGB_CD_ORANGE, RGB_CD_ROT, RGB_CD_VIOLETT} = require('../util/color_constants');

// register imported plugins from chart.js
ChartJS.register(
    CategoryScale,
    LineElement, 
    PointElement, 
    LinearScale, 
    Title, 
    Tooltip, 
    Legend, 
    Filler,
    Colors,
    ChartDataLabels
);

const data = (sfData : SchwundfaktorFormat[]) => {
    var colors = [RGB_CD_BLAU, RGB_CD_TUERKIS, RGB_CD_GRUEN, RGB_CD_HELLGRUEN, RGB_CD_GELB, RGB_CD_ORANGE, RGB_CD_ROT, RGB_CD_VIOLETT]

    const sfDatasets = sfData.map((row,i) => {
        return ({
            label: row.course,
            data: row.faktor,
            pointRadius: 4,
            borderColor: colors[i],
            backgroundColor: colors[i],
            plugins: {
                datalabels: {
                    display: false,
                },
            },
        });
    });

    // add ideal line with data values 1 to datasets
    const ideallinie = {
        label: '1',
        data: schwundfaktorDaten[0].years.map(() => 1),
        pointRadius: 0,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderDash: [5, 5],
        plugins: {
            datalabels: {
                display: false,
            },
        }
    };

    return {
        labels: schwundfaktorDaten[0].years, // to always show years, even when sfData is empty
        datasets: [
            ...sfDatasets,
            ideallinie,
        ],
    };
};

const options = {
    scales: {
        x: {
            title: {
                display: false,
            },
        },
        y: {
            min: 0.5,
            // get maximum value across all datasets
            max: Math.max(...schwundfaktorDaten.map(row => Math.max(...(row.faktor.map(faktor => (faktor === null) ? 0 : faktor))))) + 0.1,
            title: {
                display: true,
                text: 'Schwundfaktor',
            },
        }
    },
    plugins: {
        legend: {
            display: true,
            position: 'right' as const
        },
        title: {
            display: true,
            text: 'Schwundfaktorentwicklung Vergleich',
            color: 'black',
            font: {
              size: 24,
              weight: "normal" as any,
            }
        },
        datalabels: {
            display: false,
        },
        colors: {
           //forceOverride: true,
        },
    }
};

const sfCoursesChart = ({sfData}: {sfData: SchwundfaktorFormat[]}, {selectedBaseCourse}: {selectedBaseCourse: SchwundfaktorFormat}) => {
    const chartRef = useRef(null);
    const combinedData: SchwundfaktorFormat[] = [
        selectedBaseCourse,
        ...sfData
    ];

    const downloadChart = () => {
        const chartElement = chartRef.current;
        if (chartElement) {
            html2canvas(chartElement).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'schwundfaktor_vergleich.png';
                link.click();
            });
        }
    };

    useEffect(() => {
        //console.log('Component has mounted');
    }, []);

    console.log(combinedData);
    const sfCoursesData = data(combinedData);
    return (
        <React.Fragment>
            <div ref={chartRef}>
                <Line 
                    data={sfCoursesData}
                    options={options} 
                />
            </div>
            <button 
                onClick={downloadChart}
                style={{
                    position: 'relative',
                    bottom: 0,
                    right: '-50%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                }}
                title="Download Chart"
            >
                <i className="fas fa-download" style={{ fontSize: '16px', color: 'grey' }}></i>
            </button>
        </React.Fragment>
    );
};

export default sfCoursesChart;