import { Chart } from 'react-google-charts';
import { fetchStudyProgressAnalysis } from '../util/api_calls';
import { useEffect, useState } from 'react';

// Function to filter based on course and year
function filterByCourseAndYear(data, targetCourse, targetYear) {
  return data.filter(item => {
    // Extract the year number using a regular expression
    const yearMatch = item.year.match(/\d{4}/);
    const year = yearMatch ? yearMatch[0] : null;
    if (item.course === targetCourse && year === targetYear) console.log(item.course + targetCourse + year + targetYear);
    return item.course === targetCourse && year === targetYear;
  });
}

const SankeyChart = (props) => {
  console.log(props);
  const colors = ['#32B4C8','#32B4C8', '#32B4C8', '#32B4C8', '#32B4C8', '#32B4C8', '#32B4C8', '#32B4C8', '#32B4C8', '#6FA53C'];
  
  const [studyProgressAnalysis, setStudyProgressAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const standardPeriodOfStudyResult = await fetchStudyProgressAnalysis();
        setStudyProgressAnalysis(standardPeriodOfStudyResult);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const chartData = () => {
    if (studyProgressAnalysis != undefined) {
      const correctedYear = (parseInt(props.selectedYear.year)-4).toString();
      const cohort = filterByCourseAndYear(studyProgressAnalysis, props.selectedYear.course, correctedYear)[0].cohorts;
      console.log(cohort);
      var lastCount = studyProgressAnalysis[1].cohorts[0];
      var transitions = [];
      var leavers = [];
      
      for (var i = 0; i < (cohort.length-1); i++) {
        const studentCount = cohort[i];
        transitions.push([i+1 + '. FS', i+2 + '. FS', studentCount]);
        if (studentCount < lastCount) {
          leavers.push([i+1 + '. FS', 'Fachwechsel oder Studienabbruch', lastCount-studentCount]);
        }
        lastCount = studentCount;
      }

      transitions.push([cohort.length + '. FS', 'Absolventen', cohort[cohort.length-1]]);

      return [
        ['From', 'To', 'Weight'],
        ...transitions,
        ...leavers,
      ];
    }
  }

  const chartOptions = {
    sankey: {
      iterations: 0,
      height: 1500,
      link: { colorMode: 'gradient' },
      node: {
        colorMode: 'fixed',
        colors: colors,
        nodePadding: 50,
        label: {
          fontSize: 20, // Increase this value for larger labels
        },
      },
    },
    tooltip: {
      textStyle: {
        fontSize: 16, // Decrease this value for smaller tooltips
      },
    },
  };

  return (
    <div>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="Sankey"
        loader={<div>Loading Chart</div>}
        data={chartData()}
        options={chartOptions}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

export default SankeyChart;
