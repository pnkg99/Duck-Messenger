import './App.css';
import Login from './pages/Login';
import Messenger from './pages/Messenger';
import PrivateRoute from './components/common/PrivateRoute';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Login />} />
        <Route path={'/login'} element={<Login />} />
        <Route element={<PrivateRoute />} >
        <Route path={'/messenger'} element={<Messenger />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
