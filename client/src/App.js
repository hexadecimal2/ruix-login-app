import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import SignUpPage from './components/SignUpPage.jsx'
import LogInPage from './components/LogInPage.jsx'
import RequestPage from './components/RequestPage.jsx'
import UserInfoPage from './components/UserInfoPage.jsx';

function App() {
  return (
  <BrowserRouter>
   <Routes>
      <Route path='/' element={<Navigate to='/signup'/>}/>
      <Route path ='/signup' element = {<SignUpPage/>} />
      <Route path='/login' element = {<LogInPage/>}/>
      <Route path='/request' element = {<RequestPage/>}/>   
      <Route path='/userinfo' element = {<UserInfoPage/>}/>
   </Routes>
  </BrowserRouter>
  );
}

export default App;
