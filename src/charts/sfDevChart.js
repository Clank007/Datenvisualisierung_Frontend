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
import React, { useEffect, useRef } from "react";
import html2canvas from 'html2canvas';
import '@fortawesome/fontawesome-free/css/all.css';
import { Col, Row } from 'react-bootstrap';
import FAQDictionary from '../util/FAQDictionary';
import Infotip from '../components/tooltip';
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

// Currently the maximum number of years are 5: 2020-2024
const MAX_NUM_OF_YEARS = 5;

var dataIncomplete = false;

const calcData = (sfData) => {
  dataIncomplete = (sfData.length < MAX_NUM_OF_YEARS) ? true : false;

  var preppedData = {
    labels: sfData.map((entry) => entry.year),
    datasets: [
      {
        label: 'Schwundfaktor',
        data: sfData.map((entry) => ({ x: entry.year, y: entry.attrition_rate })),
        pointBackgroundColor: RGB_CD_BLAU,
        borderColor: RGB_CD_BLAU,
        pointRadius: 4,
        pointHitRadius: 40,
        datalabels: {
          backgroundColor: "rgba(" + RGB_VALS_CD_BLAU +",0.8)",
          borderRadius: 4,
          color: 'rgb(255, 255, 255)',
          font: {
            weight: 'bold',
          },
          padding: 6,
          clamp: true,
          offset: 12,
          align: 'bottom',
          formatter: function(value, context) { return String(Math.round(value.y * 1000) / 1000).replace('.', ','); },
        },
      },
    ]
  };

  console.log(sfData[0].degree);
  if (sfData[0].degree.includes('B')) {
    preppedData.datasets.push({
      label: 'Zielwert Bachelor',
      data: Array(MAX_NUM_OF_YEARS).fill(1.3),
      datalabels: {
        display: false,
      },
      pointRadius: 0,
      borderColor: 'rgba(0, 0, 0, 0.5)',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderDash: [5, 5],
    });
  } else if (sfData[0].degree.includes('M')) {
    preppedData.datasets.push({
      label: 'Zielwert Master',
      data: Array(MAX_NUM_OF_YEARS).fill(1.1),
      datalabels: {
        display: false,
      },
      pointRadius: 0,
      borderColor: 'rgba(0, 0, 0, 0.5)',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderDash: [5, 5],
    });
  };

  return preppedData;
};

const options = (sfData) => {
  return {
    layout: {
      padding: {
        right: 30,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
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
        text: 'Schwundfaktorentwicklung ' + sfData[0].course,
        color: 'black',
        font: {
          size: 23,
          weight: "normal",
        }
      },
    }
  }
};

const sfDevChart = (sfData) => {
  const chartRef = useRef(null);

  const downloadChart = () => {
    const chartElement = chartRef.current;
    if (chartElement) {
        html2canvas(chartElement).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'schwundfaktor_verlauf.png';
            link.click();
        });
    }
  };

  useEffect(() => {
      //console.log('Component has mounted');
  }, []);

  if (sfData.length > 0) {
    return (
      <React.Fragment>
        <div ref={chartRef} className="pe-0">
          <Line 
            data={calcData(sfData)}
            options={options(sfData)} />
        </div>
        <Row className="pe-0">
          <Col>
              {(dataIncomplete) ? <Infotip entry={FAQDictionary.dataIncomplete} type="warning"/> : ""}
          </Col>
          <Col className="pe-0" style={{display:'flex', justifyContent:'right'}}>
            <button 
                  onClick={downloadChart}
                  style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                  }}
                  title="Download Chart"
              >
                  <i className="fas fa-download" style={{ fontSize: '16px', color: 'grey' }}></i>
            </button>
          </Col>
        </Row>
      </React.Fragment>
    );
  } else {
    //give placeholder
    return (
      <React.Fragment>
        <Line
          data={{ labels: [2020, 2021, 2022, 2023, 2024], datasets: [{data: Array(MAX_NUM_OF_YEARS)}]}}
          options={options([{course: "Platzhalter"}])}
        />
      </React.Fragment>
    );
  }
};
  

export default sfDevChart;
