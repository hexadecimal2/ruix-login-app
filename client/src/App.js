import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from './components/SignUpPage.jsx'

function App() {
  return (
  <BrowserRouter>
   <Routes>
      <Route path='/' element={<SignUpPage/>}/>
      <Route path='/request'/>   
   </Routes>
  </BrowserRouter>
  );
}

export default App;
