import { useAppContext } from "../../../contexts/context";
import { updateCandidateMoves } from "../../../reducer/actions/move";
import referee from "../../../referee/referee";

const Piece = ({rank, file, piece})=>{

    const {appState, dispatch} = useAppContext();
    const {turn} = appState;
    const currentPosition = appState.positions[appState.positions.length-1];
    const prevPosition = appState.positions[appState.positions.length-2];

    function getPieceColor(piece){
        return piece[piece.length-1];
    }

    function onDragStart(e){
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', `${piece},${rank},${file}`);
        setTimeout(()=>{
            e.target.style.display = 'none';
        },0);

        const pieceColor = getPieceColor(piece);
        if(turn === pieceColor){
            const candidateMoves = referee.getValidMoves({currentPosition,prevPosition, rank, file, piece});
            dispatch(updateCandidateMoves({candidateMoves}));
        }

    }

    function onDragEnd(e){
        e.target.style.display = 'block'
    }

    function onMouseEnter(e){
        e.target.classList.add('draggable');
    }

    function onMouseLeave(e){
        e.target.classList.remove('draggable');
    }


    return (
        <div 
            className={`piece ${piece} p-${file}${rank}`} 
            draggable={true}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            />
        )

};

export default Piece;