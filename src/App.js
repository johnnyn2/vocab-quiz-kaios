import React, {useState} from 'react';
import {Dashboard} from './views/Dashboard';
import {Easy} from './views/Easy';
import './css/App.css';

function App() {
  const [view, setView] = useState(0);
  const [qb, setQb] = useState(0);
  const views = [
    <Dashboard viewIndex={view} navToView={setView} setQb={setQb}/>,
    <Easy viewIndex={view} navToView={setView} type={qb}/>,
  ];
  return views[view];
}

export default App;
