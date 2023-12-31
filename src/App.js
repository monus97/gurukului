import './App.css';
import { Routes, Route } from "react-router-dom"
import Header from './components/header';
import Footer from './components/footer';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import UserList from './pages/dataTable';
function App() {
  return (
    <div className="App">
<Header/>
<Routes>
  <Route path='/' element={<LoginPage/>} />
  <Route path='/register' element={<RegisterPage/>} />
  <Route path='/list' element={<UserList/>} />
</Routes>
<Footer/>
    </div>
  );
}

export default App;
