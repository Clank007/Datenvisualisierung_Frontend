import { Chart } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js';
import {SankeyController, Flow} from 'chartjs-chart-sankey';

ChartJS.register(SankeyController, Flow);

var colors = {
  Oil: "black",
  Coal: "gray",
  "Fossil Fuels": "slategray",
  Electricity: "blue",
  Energy: "orange"
};

// the y-order of nodes, smaller = higher
var priority = {
  Oil: 1,
  'Narural Gas': 2,
  Coal: 3,
  'Fossil Fuels': 1,
  Electricity: 2,
  Energy: 1
};

var labels = {
  Oil: 'black gold (label changed)'
}

function getColor(name) {
  return colors[name] || "green";
}

const data = {
    datasets: [
        {
          data: [
            { from: "Oil", to: "Fossil Fuels", flow: 15 },
            { from: "Natural Gas", to: "Fossil Fuels", flow: 20 },
            { from: "Coal", to: "Fossil Fuels", flow: 25 },
            { from: "Coal", to: "Electricity", flow: 25 },
            { from: "Fossil Fuels", to: "Energy", flow: 60 },
            { from: "Electricity", to: "Energy", flow: 25 }
          ],
          priority,
          labels,
          colorFrom: (c) => getColor(c.dataset.data[c.dataIndex].from),
          colorTo: (c) => getColor(c.dataset.data[c.dataIndex].to),
          borderWidth: 2,
          borderColor: 'black'
        }
      ]
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