import './App.css';
import AppContext from './contexts/context';
import Board from "./components/Board/Board";
import {reducer} from "./reducer/reducer"
import { useReducer } from 'react';
import { initGameState } from './constants';
import Controls from './components/Controls/Controls';
import TakeBack from './components/Controls/TakeBack/TakeBack';
import MovesList from './components/Controls/MovesList/MovesList';

function App() {

  const [appState, dispatch] = useReducer(reducer, initGameState());

  const providerState = {appState, dispatch};

  return (
    <AppContext.Provider value={providerState}>
      <div className="App">
          <Board/>
          <Controls>
            <MovesList/>
            <TakeBack/>
          </Controls>
      </div>
    </AppContext.Provider>
  )
}

export default App
