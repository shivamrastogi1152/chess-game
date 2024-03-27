import './Square.css'
import { HORIZONTAL_AXIS, VERTICAL_AXIS } from '../../utils/utils';

function Square({row, col, imgSrc, highlight}){
    const className = 'square ' + 
    (((row + col) % 2 === 1) ? ' light-square ' : ' dark-square ') + 
    ((highlight ? ' highlight ' : '')) + 
    ((imgSrc!=null ? 'chess-piece-square' : ''));
    return (
    <div className={className}>
        {imgSrc!=null ? <div style={{backgroundImage : `url(${imgSrc})`}} className='chess-piece'/> : <></>}
        <div className='annotation'>{HORIZONTAL_AXIS[col]+VERTICAL_AXIS[row]}</div>
    </div>
    )
}

export default Square;