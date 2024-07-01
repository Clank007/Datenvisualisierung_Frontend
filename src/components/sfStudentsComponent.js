import { Chart, Line } from 'react-chartjs-2';
import { Chart as ChartJS, 
         CategoryScale,
         BarElement,
         LineElement, 
         PointElement, 
         LinearScale, 
         Title, 
         Tooltip, 
         Legend, 
         Filler,
         LineController,
         BarController,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React, { useEffect, useRef } from "react";
import html2canvas from 'html2canvas';
import '@fortawesome/fontawesome-free/css/all.css';
import { RGB_VALS_CD_BLEND_TUERKIS_GRUEN } from '../util/color_constants';
const {RGB_VALS_CD_BLAU, RGB_VALS_CD_TUERKIS, RGB_VALS_CD_GRUEN, RGB_VALS_CD_HELLGRUEN, RGB_VALS_CD_GELB, RGB_VALS_CD_ORANGE, RGB_VALS_CD_ROT, RGB_VALS_CD_VIOLETT} = require('../util/color_constants');

// register imported plugins from chart.js
ChartJS.register(
    CategoryScale,
    BarElement,
    LineElement, 
    PointElement, 
    LinearScale, 
    Title, 
    Tooltip, 
    Legend, 
    Filler,
    LineController,
    BarController,
    ChartDataLabels
);

const data = (sfData) => {
    const colors = [RGB_VALS_CD_TUERKIS, RGB_VALS_CD_BLEND_TUERKIS_GRUEN, RGB_VALS_CD_GRUEN]
    console.log(sfData);

    const kohortenDataset = sfData.kohorten.map((kohorte,i) => {
        return {
            type: 'bar',
            label: kohorte.kohorte,
            data: kohorte.netStudents,
            backgroundColor: "rgba("+colors[i]+",0.7)",
            borderColor: "rgba("+colors[i]+",0.7)",
            datalabels: {
                display: false,
            },
        };
    });

    const meanSuccessDataset = {
        type: 'line',
        label: 'Mittlere Übergangsquote',
        backgroundColor: "rgba("+RGB_VALS_CD_BLAU+",1)",
        borderColor: "rgba("+RGB_VALS_CD_BLAU+",1)",
        data: sfData.meanSuccess,
        yAxisID: 'yAxis',
        datalabels: {
            display: true,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 3,
            color: 'rgb(255, 255, 255)',
            font: {
                weight: 'bold',
            },
            padding: 6,
            clamp: true,
            align: 'top',
            formatter: function(value, context) { return String(value).replace('.', ','); },
        }
    };

    return {
        labels: sfData.semesters,
        datasets: [
            meanSuccessDataset,
            ...kohortenDataset,
        ],
    };
};

function detailedTooltipLabel(context) {
    // let label = context.dataset.label || '';
    //only change bar tooltip labels
    // if (context.dataset.type === 'bar') {
    //     return label
    // };
    // let label = context.dataset.label || '';
    //                 console.log(context);
    //                 if (context.dataset.type === 'bar') {
    //                     return 'akad. Jahr: ' + context.raw;
    //                 };
    //                 if (label) {
    //                     label += ': ';
    //                 };
    //                 if (context.parsed.y !== null) {
    //                     label += context.parsed.y;
    //                 };
    //                 return label;
};

const options = (sfData) => ({
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
            beginAtZero: true,
            title: {
                display: true,
                text: 'Studierende',
            },
        },
        yAxis: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
                display: true,
                text: 'Ø Übergangsquote',
            }
        },
    },
    interaction : {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        datalabels: {
            anchor: 'center',
            align: 'center',
        },
        legend: {
            display: true,
        },
        title: {
            display: true,
            text: `Schwundfaktorberechnung ${sfData.course} ${sfData.year}`,
            color: 'black',
            font: {
              size: 24,
              weight: 'normal',
            }
        },
        // tooltip: {
        //     callbacks: {
        //         label: function(context: any) {
        //             let label = context.dataset.label || '';
        //             console.log(context);
        //             if (context.dataset.type === 'bar') {
        //                 return 'akad. Jahr: ' + context.raw;
        //             };
        //             if (label) {
        //                 label += ': ';
        //             };
        //             if (context.parsed.y !== null) {
        //                 label += context.parsed.y;
        //             };
        //             return label;
        //         },
        //         afterLabel: function(context: any) {
        //             if (context.dataset.type === 'bar') {
        //                 return 'Testtext';
        //             };
        //             return '';
        //         },
        //     },
        // },
    },
});

const SfStudentsComponent = (props) => {
    const chartRef = useRef(null);

    const downloadChart = () => {
        const chartElement = chartRef.current;
        if (chartElement) {
            html2canvas(chartElement).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'schwundfaktor_berechnung.png';
                link.click();
            });
        }
    };

    useEffect(() => {
        //console.log('Component has mounted');
    }, []);

    if (props.selectedYear === null) {
        //return placeholder chart
        return (
            <React.Fragment>
                <Line
                    data={{ labels: [2020, 2021, 2022, 2023, 2024], datasets: [{data: Array(5)}]}}
                    options={options({course: 'Kurs', year: '2020'})}
                />
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <div ref={chartRef}>
                    <Chart 
                        type='bar' 
                        data={data(props.selectedYear)} 
                        options={options(props.selectedYear)} 
                    />
                </div>
                <button 
                    onClick={downloadChart}
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    title="Download Chart"
                >
                    <i className="fas fa-download" style={{ fontSize: '16px', color: 'grey' }}></i>
                </button>
            </React.Fragment>
        )};
}

export default SfStudentsComponent;