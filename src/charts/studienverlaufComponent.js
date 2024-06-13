import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import { SankeyController, Flow } from 'chartjs-chart-sankey';
import "../assets/css/studienverlauf-sankey.css";

ChartJS.register(SankeyController, Flow);

var colors = {
  "1. FS": "#32B4C8",
  "2. FS": "#32B4C8",
  "3. FS": "#32B4C8",
  "4. FS": "#32B4C8",
  "5. FS": "#32B4C8",
  "6. FS": "#32B4C8",
  "7. FS": "#32B4C8",
  "8. FS": "#32B4C8",
  "Fachwechsel oder Studienabbruch": "#6FA53C"
};

// the y-order of nodes, smaller = higher
var priority = {
  "1. FS": 1,
  "2. FS": 2,
  "3. FS": 3,
  "4. FS": 4,
  "5. FS": 5,
  "6. FS": 6,
  "7. FS": 7,
  "Fachwechsel oder Studienabbruch": 8
};

function getColor(name) {
  return colors[name] || "yellow";
}

const data = {
  label: "Test",
  datasets: [{
    data: [
      { from: '1. FS', to: '2. FS', flow: 26 },
      { from: '2. FS', to: '3. FS', flow: 25 },
      { from: '3. FS', to: '4. FS', flow: 23 },
      { from: '4. FS', to: '5. FS', flow: 21 },
      { from: '5. FS', to: '6. FS', flow: 21 },
      { from: '6. FS', to: '7. FS', flow: 21 },
      { from: '7. FS', to: '8. FS', flow: 20 },
      { from: '2. FS', to: 'Fachwechsel oder Studienabbruch', flow: 1},
      { from: '3. FS', to: 'Fachwechsel oder Studienabbruch', flow: 2},
      { from: '4. FS', to: 'Fachwechsel oder Studienabbruch', flow: 2},
      { from: '7. FS', to: 'Fachwechsel oder Studienabbruch', flow: 1}
    ],
    //priority,
    colorFrom: (c) => getColor(c.dataset.data[c.dataIndex].from),
    colorTo: (c) => getColor(c.dataset.data[c.dataIndex].to)
  }]
};

const SankeyChart = () => {
    return (
        <Chart
            type= 'sankey'
            data={data}
        />
    );
}

export default SankeyChart;