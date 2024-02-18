import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/variables.css';
import TodoDate from './components/TodoDate';
import ItemList from './components/ItemList';
import { AppStateProvider } from './AppContext';

function Hello() {
  return (
    <AppStateProvider>
      <TodoDate />
      <ItemList />
    </AppStateProvider>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
