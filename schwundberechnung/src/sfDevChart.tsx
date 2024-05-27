import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, 
         CategoryScale,
         LineElement, 
         PointElement, 
         LinearScale, 
         Title, 
         Tooltip, 
         Legend, 
         Filler } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SchwundfaktorFormat from './helperTypes';

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
    ChartDataLabels
);

const calcData = (sfData: SchwundfaktorFormat) => {
  const diffData = sfData.faktor.map((faktor, index) => {
    // Shift all data 1 to the right except the first element
    if (index !== 0) return sfData.faktor[index-1];
    return faktor;
  });

  const preppedData = {
    labels: sfData.years,
    datasets: [
      {
        label: 'Schwundfaktor',
        data: sfData.faktor,
        pointBackgroundColor: 'rgb(47, 137, 193)',
        borderColor: 'rgb(47, 137, 193)',
        pointRadius: 8,
        pointHitRadius: 40,
        datalabels: {
          backgroundColor: 'rgb(47, 137, 193)',
          borderRadius: 4,
          color: 'rgb(255, 255, 255)',
          font: {
            weight: 'bold' as const,
          },
          padding: 6,
          clamp: true,
          offset: 12,
          align: 'bottom' as const,
        },
      },
      {
        label: 'Idealwert',
        data: sfData.years.map(() => 1),
        datalabels: {
          display: false,
        },
        pointRadius: 0,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderDash: [5, 5],
      }
    ]
  };

  return preppedData;
};

const options = (sfData: SchwundfaktorFormat) => {
  return {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Jahr',
        }
      },
      y: {
        min: 0,
        title: {
          display: true,
          text: 'Schwundfaktor',
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Schwundfaktor Entwicklung von ' + sfData.course,
      },
    }
  }
};

const sfDevChart = ({sfData}: {sfData: SchwundfaktorFormat}) => {
  const data = calcData(sfData);
  return (
      <Line 
        data={calcData(sfData)}
        options={options(sfData)} />
  );
};
  

export default sfDevChart;
