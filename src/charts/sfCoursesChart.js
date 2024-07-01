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
import { BsExclamationTriangleFill, BsFillExclamationTriangleFill } from "react-icons/bs";
import FAQDictionary from "../util/FAQDictionary";
import Infotip from "../components/Infotip";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
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

var dataIncomplete = false;

const data = (sfData) => {
    dataIncomplete = false;
    var colors = [RGB_CD_BLAU, RGB_CD_TUERKIS, RGB_CD_GRUEN, RGB_CD_HELLGRUEN, RGB_CD_GELB, RGB_CD_ORANGE, RGB_CD_ROT, RGB_CD_VIOLETT]

    const years = [...new Set(sfData.map(row => row.year))].sort();
    //Proudly stolen from Copilot; if this fails, ask him
    const groupedByCourse = sfData.reduce((accumulator, current) => {
        // If the course doesn't exist in the accumulator, initialize it with an empty array
        if (!accumulator[current.course]) {
          accumulator[current.course] = [];
        }
        // Push the current object to the array for the corresponding course
        accumulator[current.course].push(current);
        return accumulator;
      }, {});

    var sfDatasets = Object.entries(groupedByCourse).map(([course, data], i) => {
        //Log if all datasets have the same length
        dataIncomplete = (data.map(entry => entry.year).length < years.length) ? true : dataIncomplete;
        return ({
            label: data[0].course,
            data: data.map(entry => ({ x: entry.year, y: entry.attrition_rate})),
            pointRadius: 4,
            borderColor: colors[i % colors.length], // Use modulo to avoid going out of bounds
            backgroundColor: colors[i % colors.length],
            plugins: {
                datalabels: {
                    display: false,
                },
            },
        });
    });

    // add ideal line with data values 1 to datasets
    const ideallinie = {
        label: 'Idealwert',
        data: Array(years.length).fill(1),
        pointRadius: 0,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderDash: [3, 3],
        plugins: {
            datalabels: {
                display: false,
            },
        }
    }; 
      
    if (sfData.some(entry => entry.degree.includes('M'))) {
      sfDatasets.push({
        label: 'Zielwert Master',
        data: Array(years.length).fill(1.1),
        datalabels: {
          display: false,
        },
        pointRadius: 0,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderDash: [12, 12],
      });
    };

    if (sfData.some(entry => entry.degree.includes('B'))) {
        sfDatasets.push({
          label: 'Zielwert Bachelor',
          data: Array(years.length).fill(1.3),
          datalabels: {
            display: false,
          },
          pointRadius: 0,
          borderColor: 'rgba(0, 0, 0, 0.5)',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderDash: [5, 5],
        });
    };

    return {
        labels: years,
        datasets: [
            ...sfDatasets,
            ideallinie
        ],
    };
};

const options = (sfData) => {
    return {
        scales: {
            x: {
                title: {
                    display: false,
                },
            },
            y: {
                min: 0.5,
                max: 2.1,
                title: {
                    display: true,
                    text: 'Schwundfaktor',
                },
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'right'
            },
            title: {
                display: true,
                text: 'Schwundfaktorentwicklung Vergleich',
                color: 'black',
                font: {
                  size: 24,
                  weight: "normal",
                }
            },
            datalabels: {
                display: false,
            },
        }
    };
};

const sfCoursesChart = (selectedCourses, selectedBaseCourse) => {
    const chartRef = useRef(null);
    const combinedData = [
        ...selectedBaseCourse,
        ...selectedCourses
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

    if (combinedData.length === 0) {
        //return placeholder
        return (
            <React.Fragment>
                <Line
                    data={{ labels: [2020, 2021, 2022, 2023, 2024], datasets: [{data: Array(5)}]}}
                    options={options([{attrition_rate: 2.5}])}
                />
            </React.Fragment>
        );

    } else {
        return (
            <React.Fragment>
                <div ref={chartRef} className="pe-0">
                    <Line
                        data={data(combinedData)}
                        options={options(combinedData)} 
                    />
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
    };
};

export default sfCoursesChart;