import { PieceType } from '../../../constants';
import { useAppContext } from '../../../contexts/context';
import { copyPosition } from '../../../helper';
import { clearCandidateMoves, makeNewMove } from '../../../reducer/actions/move';
import './PromotionBox.css'

const PromotionBox = ({OnClosePopup})=>{

    const options = [PieceType.QUEEN, PieceType.ROOK, PieceType.BISHOP, PieceType.KNIGHT];
    const {appState, dispatch} = useAppContext();
    const {promotionSquare} = appState;

    if(!promotionSquare) return null;

    const row = promotionSquare.toRow;
    const col = promotionSquare.toCol;
    const color = row === 7 ? 'w' : 'b';

    function getPromotionBoxPosition() {
        const style = {
            top: row === 7 ? '-12.5%' : '97.5%',
            left: col <= 1 ? '0%' : col >= 6 ? 'auto' : `${12.5 * col - 20}%`,
            right: col >= 6 ? '0%' : 'auto'
        };
        return style;
    }

    function onClick(option){
        OnClosePopup();
        const currentPosition = appState.positions[appState.positions.length-1];
        const newPosition = copyPosition(currentPosition);

        newPosition[promotionSquare.fromRow][promotionSquare.fromCol] = '';
        newPosition[promotionSquare.toRow][promotionSquare.toCol] = `${option}_${color}`;

        dispatch(makeNewMove({newPosition}));
        dispatch(clearCandidateMoves());

    }
    

    return <div className='popup-inner promotion-choices' style={getPromotionBoxPosition()}>

        {options.map((option)=>
             <div key={option} 
             className={`piece ${option}_${color}`}
             onClick={()=>onClick(option)}>
            </div>
            
        )}

    </div>
}

export default PromotionBox;