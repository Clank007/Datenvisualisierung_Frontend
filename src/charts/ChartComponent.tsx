import { Chart } from 'react-google-charts';

const ChartComponent = () => {
  const colors = ['#32B4C8','#32B4C8', '#32B4C8', '#32B4C8', '#32B4C8', '#32B4C8', '#32B4C8', '#32B4C8', '#32B4C8', '#6FA53C'];
  
  const chartData = [
    ['From', 'To', 'Weight'],
    ['1. FS', '2. FS', 26],
    ['2. FS', '3. FS', 25],
    ['3. FS', '4. FS', 23],
    ['4. FS', '5. FS', 21],
    ['5. FS', '6. FS', 21],
    ['6. FS', '7. FS', 21],
    ['7. FS', '8. FS', 20],
    ['8. FS', 'Absolventen', 19],
    ['2. FS', 'Fachwechsel oder Studienabbruch', 1],
    ['3. FS', 'Fachwechsel oder Studienabbruch', 2],
    ['4. FS', 'Fachwechsel oder Studienabbruch', 2],
    ['7. FS', 'Fachwechsel oder Studienabbruch', 1],
  ];

  const chartOptions = {
    sankey: {
      tooltip: {isHTML: false},
      height: 1500,
      link: { colorMode: 'gradient' },
      node: {
        colorMode: 'fixed',
        colors: colors,
        nodePadding: 150
      },
    },
  };

  return (
    <div>
      <h2>Studienverlaufsanalyse</h2>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="Sankey"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={chartOptions}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

export default ChartComponent;
