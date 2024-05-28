import './App.css';
import SfCoursesComponent from './sfCoursesComponent';
import SfDevComponent from './sfDevComponent';
import SfStudentsComponent from './sfStudentsComponent';

function App() {
  return (
    <main>
      <div className="left">
        <div className="upper" id="1">
          {SfCoursesComponent()}
        </div>
        <div className="lower" id="2">
          {SfDevComponent()}
        </div>
      </div>
      <div className="right">
        {SfStudentsComponent()}
      </div>
    </main>
  );
}

export default App;
