import './App.css';
import Signin from './components/Signin';
import Branch from './components/Branch';
import MainNav from './components/MainNav';
import Test from './components/Test';
import SubNav from './components/SubNav';
import Tmp3 from './components/Tmp3';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router> {/* Wrap your Routes in BrowserRouter */}
      <Routes>
        <Route path='/login' element={<Signin />} />
        <Route path='/branch' element={<Branch />} />
        <Route path='/main-nav' element={<MainNav />} />
        <Route path='/sub-nav' element={<SubNav />} />
        <Route path='/tmp3' element={<Tmp3 />} />
      </Routes>
    </Router>
  );
}

export default App;
