import "./Board.css";
import Ranks from "./bits/Ranks";
import Files from "./bits/Files";
import Pieces from "./Pieces/Pieces"
import { useAppContext } from "../../contexts/context";
import Popup from "../Popup/Popup";
import referee from "../../referee/referee.js";
import { getKingPosition } from "../../referee/getMoves";
import PromotionBox from "../Popup/PromotionBox/PromotionBox";
import GameEndsBox from "../Popup/GameEndsBox/GameEndsBox";

const Board = () => {

  const ranks = Array(8).fill().map((rank,i) => 8-i);
  const files = Array(8).fill().map((file, j)=> j+1);

  const {appState, dispatch} = useAppContext();
  const currentPosition = appState.positions[appState.positions.length-1];

  const isChecked = (()=>{
    const isInCheck = referee.playerInCheck({positionAfterMove: currentPosition, player: appState.turn});
    if(isInCheck){
      return getKingPosition(currentPosition, appState.turn);
    }
    return null;
  })();

  const getClassNameForTile = (i,j) => { 
    let c = 'tile';
    // i,j follow 1-based indexing
    c+= (i+j)%2 === 0 ? ' tile--dark' : ' tile--light';

    if(appState.candidateMoves?.find(m => m[0] == i && m[1] == j)){
      if(currentPosition[i][j].length > 0){
        c+= ' attacking';
      }else{
        c+= ' highlight';
      }
    }

    if(isChecked && isChecked[0] === i && isChecked[1] === j){
      c+=" checked"
    }

    return c;
  }

  return <div className="board">

    <Ranks ranks={ranks}/>
    <div className="tiles">
      {ranks.map((rank,i) =>
        files.map((file, j) => <div key={file+'-'+rank} className={getClassNameForTile(7-i,j)}></div>))}
      
    </div>
    <Pieces/>
    <Popup>
      <PromotionBox/>
      <GameEndsBox/>
    </Popup>
    <Files files={files}/>
        
  </div>
};

export default Board;
