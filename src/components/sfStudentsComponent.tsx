import { Chart } from 'react-chartjs-2';
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
import { StudierendenVerlauf2020 } from '../charts/helperData';
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

const data = () => {
    const rawData = StudierendenVerlauf2020[0];
    const colors = [RGB_VALS_CD_TUERKIS, RGB_VALS_CD_GRUEN, RGB_VALS_CD_ORANGE]

    const kohortenDataset = rawData.kohorten.map((kohorte,i) => {
        return {
            type: 'bar' as const,
            label: kohorte.kohorte,
            data: kohorte.netStudents,
            backgroundColor: "rgba("+colors[i]+",0.5)",
            borderColor: "rgba("+colors[i]+",0.5)",
            datalabels: {
                display: false,
            },
        };
    });

    //TODO: Show diff between semesters for each kohorte

    const meanSuccessDataset = {
        type: 'line' as const,
        label: 'Mittlere Übergangsquote',
        backgroundColor: "rgba("+RGB_VALS_CD_BLAU+",1)",
        borderColor: "rgba("+RGB_VALS_CD_BLAU+",1)",
        data: rawData.meanSuccess,
        yAxisID: 'yAxis',
        datalabels: {
            display: true,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 3,
            color: 'rgb(255, 255, 255)',
            font: {
                weight: 'bold' as const,
            },
            padding: 6,
            clamp: true,
            align: 'top' as const,
        }
    };

    return {
        labels: rawData.semesters,
        datasets: [
            meanSuccessDataset,
            ...kohortenDataset,
        ],
    };
};

const options = {
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
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            title: {
                display: true,
                text: 'Ø Übergangsquote',
            }
        },
    },
    plugins: {
        datalabels: {
            anchor: 'center' as const,
            align: 'center' as const,
        },
        legend: {
            display: true,
        },
        title: {
            display: true,
            text: 'Schwundfaktorberechnung DSI 2020',
            color: 'black',
            font: {
              size: 24,
              weight: "normal" as any,
            }
        },
        colors: {
            //forceOverride: true,
        },
    },
};

const SfStudentsComponent = (props: any) => {
    // use props.selectedBaseCourse for selected course
    return (
        <div>
            <Chart 
                type='bar' 
                data={data()} 
                options={options} 
            />
        </div>
    )
};

export default SfStudentsComponent;