import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quizpage from './pages/Quizpage';
import HomePage from './pages/HomePage';
import Final from './pages/Final';



function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/quizgame' element={<Quizpage/>}/>
          <Route path='/score' element={<Final/>}/>
        </Routes>
        
      </Router>

        
    </div>
  );
}

export default App;
