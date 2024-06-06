//anychart
import React, { useEffect, useRef } from 'react';
// @ts-ignore: Keine Typdefinitionen für AnyChart
import anychart from 'anychart';


const ChartComponent: React.FC = () => {
  const chartContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainer.current) {
      // Erstellen der Daten für das Sankey-Diagramm
      const data = [
        { from: '1. FS', to: '2. FS', weight: 26 },
        { from: '2. FS', to: '3. FS', weight: 25 },
        { from: '3. FS', to: '4. FS', weight: 23 },
        { from: '4. FS', to: '5. FS', weight: 21 },
        { from: '5. FS', to: '6. FS', weight: 21 },
        { from: '6. FS', to: '7. FS', weight: 21 },
        { from: '7. FS', to: '8. FS', weight: 20 },
        //{ form: '8. FS', to: 'Abschluss', weight: 19},
        { from: '2. FS', to: 'Fachwechsel oder Studienabbruch', weight: 1 },
        { from: '3. FS', to: 'Fachwechsel oder Studienabbruch', weight: 2 },
        { from: '4. FS', to: 'Fachwechsel oder Studienabbruch', weight: 2 },
        { from: '7. FS', to: 'Fachwechsel oder Studienabbruch', weight: 1 }
      ];

      var chart = anychart.sankey(data);

      chart.palette([
        "#32B4C8",
        "#32B4C8",
        "#32B4C8",
        "#32B4C8",
        "#32B4C8",
        "#32B4C8",
        "#32B4C8",
        "#32B4C8",
        //"#32B4C8",
        "#6FA53C"
      ]);    

      // Setzen der Chart-Titel
      chart.title('Studienverlaufsanalyse');

      // Zeichnen des Charts in dem Container
      chart.container(chartContainer.current);
      chart.draw();
    }
  }, []);

  return (
    <div>
      <h2>Studienverlaufsanalyse</h2>
      <div ref={chartContainer} style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default ChartComponent;

/*
//google charts
import React from 'react';
import { Chart } from 'react-google-charts';

const ChartComponent = () => {
  return (
    <div>
      <h2>Studienverlaufsanalyse</h2>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="Sankey"
        loader={<div>Loading Chart</div>}
        data={[
          ['From', 'To', 'Weight'],
          ['1. FS', '2. FS', 26],
          ['2. FS', '3. FS', 25],
          ['3. FS', '4. FS', 23],
          ['4. FS', '5. FS', 21],
          ['5. FS', '6. FS', 21],
          ['6. FS', '7. FS', 21],
          ['7. FS', '8. FS', 20],
          ['2. FS', 'Fachwechsel oder Studienabbruch', 1],
          ['3. FS', 'Fachwechsel oder Studienabbruch', 2],
          ['4. FS', 'Fachwechsel oder Studienabbruch', 2],
          ['7. FS', 'Fachwechsel oder Studienabbruch', 1],
        ]}
        options={{
          sankey: {
            //link: { color: { fill: '#D799AE'}},
            node: {
              colorMode: 'fixed',
              colors: ['#32B4C8', '#6FA53C'],
            },
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};
export default ChartComponent;
*/


/*
// chartjs
import React, { useRef, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { SankeyController, Flow } from 'chartjs-chart-sankey';

Chart.register(...registerables, SankeyController, Flow);

const ChartComponent: React.FC = () => {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (chartContainer.current) {
      if (chart) {
        chart.destroy(); // Zerstört den vorherigen Chart, falls vorhanden
      }
      const ctx = chartContainer.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'sankey',
          data: {
            datasets: [
              {
                data: [
                  { source: '1. FS', destination: '2. FS', value: 26 },
                  { source: '2. FS', destination: '3. FS', value: 25 },
                  { source: '3. FS', destination: '4. FS', value: 23 },
                  { source: '4. FS', destination: '5. FS', value: 21 },
                  { source: '5. FS', destination: '6. FS', value: 21 },
                  { source: '6. FS', destination: '7. FS', value: 21 },
                  { source: '7. FS', destination: '8. FS', value: 20 },
                  { source: '2. FS', destination: 'Fachwechsel oder Studienabbruch', value: 1},
                  { source: '3. FS', destination: 'Fachwechsel oder Studienabbruch', value: 2},
                  { source: '4. FS', destination: 'Fachwechsel oder Studienabbruch', value: 2},
                  { source: '7. FS', destination: 'Fachwechsel oder Studienabbruch', value: 1}
                ],
                colorFrom: () => 'blue',
                colorTo: () => 'green',
              },
            ],
          },
          options: {
            parsing: {
              from: 'source',
              to: 'destination',
              flow: 'value',
            },
          },
        });
      }
    }
  }, []);

  return (
    <div>
      <h2>Studienverlaufsanalyse</h2>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default ChartComponent;

*/