import { Chart } from 'react-google-charts';
import { fetchStudyProgressAnalysis } from '../util/api_calls';
import { useEffect, useState } from 'react';

function filterByCourseAndYear(data, targetCourse, targetYear) {
  return data.filter(item => {
    const yearMatch = item.year.match(/\d{4}/);
    const year = yearMatch ? yearMatch[0] : null;
    return item.course === targetCourse && year === targetYear;
  });
}

const SankeyChart = (props) => {
  const blue = '#32B4C8';
  const green = '#6FA53C';
  const purple = '#7764A5';

  let colors = [];

  const [studyProgressAnalysis, setStudyProgressAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noDataMessage, setNoDataMessage] = useState('');

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

  useEffect(() => {
    if (!studyProgressAnalysis) return;

    const filteredData = filterByCourseAndYear(studyProgressAnalysis, props.selectedBaseCourse?.[0]?.course, props.selectedCohort);

    if (filteredData.length === 0 || !filteredData[0]?.cohorts) {
      setNoDataMessage(`Für den Studiengang ${props.selectedBaseCourse?.[0]?.course} im Jahr ${props.selectedCohort} liegen keine Daten vor.`);
    } else {
      setNoDataMessage('');
      const cohort = filteredData[0].cohorts;
      console.log(cohort);
      const ersteKohorte = cohort[0] >= 0 ? cohort[0] : 0;
      const anzahlAbsolventen = cohort[cohort.length - 1];
      let lastCount = ersteKohorte;
      let anzahlAbbrecher = 0;

      for (let i = 0; i < cohort.length - 1; i++) {
        const studentCount = cohort[i] >= 0 ? cohort[i] : 0;
        if (studentCount < lastCount) {
          const leaverCount = lastCount - studentCount;
          anzahlAbbrecher += leaverCount;
        }
        lastCount = studentCount;
      }

      props.setErsteKohorte(ersteKohorte);
      props.setAnzahlAbbrecher(anzahlAbbrecher);
      props.setAnzahlAbsolventen(anzahlAbsolventen);
    }
  }, [studyProgressAnalysis, props.selectedBaseCourse, props.selectedCohort, props]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredData = filterByCourseAndYear(studyProgressAnalysis, props.selectedBaseCourse?.[0]?.course, props.selectedCohort);

  if (!filteredData || filteredData.length === 0 || !filteredData[0]?.cohorts) {
    return (
      <div>
        {noDataMessage && <div>{noDataMessage}</div>}
      </div>
    );
  }

  const cohort = filteredData[0].cohorts;
  const ersteKohorte = cohort[0] >= 0 ? cohort[0] : 0;
  const anzahlAbsolventen = cohort[cohort.length - 1];
  let lastCount = ersteKohorte;
  let transitions = [];
  let leavers = [];
  let anzahlAbbrecher = 0;

  for (let i = 0; i < cohort.length - 1; i++) {
    const studentCount = cohort[i] >= 0 ? cohort[i] : 0;
    transitions.push([`${i + 1}. FS`, `${i + 2}. FS`, studentCount]);
    if (studentCount < lastCount) {
      const leaverCount = lastCount - studentCount;
      leavers.push([`${i + 1}. FS`, 'Fachwechsel oder Studienabbruch', leaverCount]);
      anzahlAbbrecher += leaverCount;
    }
    lastCount = studentCount;
  }

  transitions.push([`${cohort.length}. FS`, 'Absolventen', anzahlAbsolventen]);

  for (let i = 0; i < cohort.length; i++) {
    colors.push(blue);
  }
  colors.push(green);
  colors.push(purple);

  const chartOptions = {
    sankey: {
      iterations: 0,
      height: 1500,
      link: { colorMode: 'gradient' },
      label: {
        alignment: 'start'
      },
      node: {
        colorMode: 'fixed',
        colors: colors,
        nodePadding: 50,
        label: {
          alignment: "start",
          fontSize: 18,
        },
      },
    },
    tooltip: {
      textStyle: {
        fontSize: 16,
      },
    },
  };

  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType="Sankey"
      loader={<div>Loading Chart</div>}
      data={[
        ['From', 'To', 'Anzahl'],
        ...transitions,
        ...leavers,
      ]}
      options={chartOptions}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default SankeyChart;
