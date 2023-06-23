
import './App.css';
import { useUserContext } from './context/userContext';
import Auth from './pages/Auth';
import Home from './pages/Home';

function App() {
  const {auth}=useUserContext();
  return (
    <div className="App">
      {auth?<Home/>:<Auth/>}
    </div>
  );
}

export default App;
