import { GameStatus } from '../../../constants';
import { useAppContext } from '../../../contexts/context';
import { setupNewGame } from '../../../reducer/actions/game';
import './GameEndsBox.css'

const GameEndsBox = ()=>{

    const {appState, dispatch} = useAppContext();
    const {gameStatus} = appState;

    if(gameStatus === GameStatus.IN_PROGRESS || gameStatus === GameStatus.PAWN_PROMOTION) return null;

    const isWin = gameStatus.endsWith('wins!');

    function onClick(){
        dispatch(setupNewGame());
    }

    return <div className={'popup-inner popup-inner-center'}>
            <h1>{isWin ? gameStatus: 'Draw'}</h1>
            <p>{!isWin && gameStatus}</p>
            <div className={gameStatus}></div>
            <button onClick={onClick}>New Game</button>
        </div>
}

export default GameEndsBox;