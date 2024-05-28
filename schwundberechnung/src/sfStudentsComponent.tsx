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
import { StudierendenVerlauf2020 } from './helperData';

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

    const kohortenDataset = rawData.kohorten.map((kohorte) => {
        return {
            type: 'bar' as const,
            label: kohorte.kohorte,
            data: kohorte.netStudents,
            datalabels: {
                display: false,
            },
        };
    });

    //TODO: Show diff between semesters for each kohorte

    const meanSuccessDataset = {
        type: 'line' as const,
        label: 'Mittlere Erfolgsquote',
        data: rawData.meanSuccess,
        yAxisID: 'yAxis',
        datalabels: {
            display: true,
            backgroundColor: 'rgba(129, 69, 0, 0.5)',
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
                text: 'Ø Erfolgsquote',
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
            text: 'Studierendenverlauf DSI 2020',
        },
        colors: {
            forceOverride: true,
        },
    },
};

const SfStudentsComponent = () => {
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