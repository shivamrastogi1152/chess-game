import './Square.css'
import { horizontalAxis, verticalAxis } from '../../utils/utils';

function Square({row, col, imgSrc}){
    return (
    <div className={(row+col)%2 ? 'square light-square' : 'square dark-square'}>
        {imgSrc!=null ? <div style={{backgroundImage : `url(${imgSrc})`}} className='chess-piece'/> : <></>}
        <div className='annotation'>{horizontalAxis[col]+verticalAxis[row]}</div>
    </div>
    )
}

export default Square;