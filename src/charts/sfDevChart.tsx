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
const {RGB_CD_BLAU, RGB_VALS_CD_BLAU, RGB_CD_TUERKIS, RGB_CD_GRUEN, RGB_CD_HELLGRUEN, RGB_CD_GELB, RGB_CD_ORANGE, RGB_CD_ROT, RGB_CD_VIOLETT} = require('../util/color_constants');


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
  const preppedData = {
    labels: sfData.years,
    datasets: [
      {
        label: 'Schwundfaktor',
        data: sfData.faktor,
        pointBackgroundColor: RGB_CD_BLAU,
        borderColor: RGB_CD_BLAU,
        pointRadius: 4,
        pointHitRadius: 40,
        datalabels: {
          backgroundColor: "rgba(" + RGB_VALS_CD_BLAU +",0.8)",
          borderRadius: 4,
          color: 'rgb(255, 255, 255)',
          font: {
            weight: 'bold' as const,
          },
          padding: 6,
          clamp: true,
          offset: 12,
          align: 'bottom' as const,
          formatter: function(value: any, context: any) { return String(value).replace('.', ','); },
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
        borderDash: [5, 5]
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
        min: 0.5,
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
        text: 'Schwundfaktorentwicklung ' + sfData.course,
        color: 'black',
        font: {
          size: 23,
          weight: "normal" as any,
        }
      },
    }
  }
};

const sfDevChart = ({sfData}: {sfData: SchwundfaktorFormat}) => {
  return (
      <Line 
        data={calcData(sfData)}
        options={options(sfData)} />
  );
};
  

export default sfDevChart;
