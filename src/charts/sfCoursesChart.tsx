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
                display: true,
                text: 'Jahr',
            },
        },
        y: {
            min: 0.5,
            //max: 2.5,
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
    const combinedData: SchwundfaktorFormat[] = [
        selectedBaseCourse,
        ...sfData
    ];

    console.log(combinedData);
    const sfCoursesData = data(combinedData);
    return (
        <Line 
            data={sfCoursesData}
            options={options} 
        />
    );
};

export default sfCoursesChart;