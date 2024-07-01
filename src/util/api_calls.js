const API_HOST = "http://localhost:8080";
const API_BASE_URL = API_HOST + "/api/reporting";

// Endpoint constants
const ENDPOINT_REPORTING_DATA = '/data';
const ENDPOINT_STUDY_PROGRESS_ANALYSIS = '/study-progress-analysis';
const ENDPOINT_STANDARD_PERIOD_OF_STUDY = '/standard-period-of-study';
const ENDPOINT_YEARS = '/years';
const ENDPOINT_COURSE_DATA = '/course-data';

// Function to fetch reporting data
async function fetchReportingData(year, course) {
  try {
        let url = new URL(`${API_BASE_URL}${ENDPOINT_REPORTING_DATA}`);
        let params = new URLSearchParams();

        if (year) params.append('yearSemester', year);
        if (course) params.append('courseShortenedName', course);

        url.search = params.toString();
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Function to fetch study progress analysis
async function fetchStudyProgressAnalysis() {
  try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINT_STUDY_PROGRESS_ANALYSIS}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Function to fetch standard period of study
async function fetchStandardPeriodOfStudy() {
  try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINT_STANDARD_PERIOD_OF_STUDY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Function to fetch years
async function fetchYears() {
  try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINT_YEARS}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Function to fetch course data
async function fetchCourseData() {
  try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINT_COURSE_DATA}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Exporting all functions
export {
    fetchReportingData,
    fetchStudyProgressAnalysis,
    fetchStandardPeriodOfStudy,
    fetchYears,
    fetchCourseData
  };