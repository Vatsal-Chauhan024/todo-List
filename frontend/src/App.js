import './App.css';
import TodoInput from './pages/TodoInput';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './pages/TodoList';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<TodoInput/>}/>
        <Route path="/todo" element = {<TodoList/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
