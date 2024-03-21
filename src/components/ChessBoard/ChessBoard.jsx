import './ChessBoard.css'
import Square from '../Square/Square';
import { horizontalAxis, verticalAxis, getPieces } from '../../utils/utils';

const generateBoard = ()=>{

    let pieces = getPieces();
    let board = [];

    for(let i=0;i<verticalAxis.length;i++){
        for(let j=0;j<horizontalAxis.length;j++){

            let imgSrc = null;              
            pieces.forEach(piece =>{
                if(piece.x === j && piece.y === i){
                    imgSrc = piece.imgSrc;
                }
            })

            board.push(
                <Square 
                    row={i} 
                    col={j} 
                    imgSrc={imgSrc} 
                    key={horizontalAxis[j]+verticalAxis[i]}
                />
            );
        }
    }
    return board;
}

const grabPiece = (e) => {
    const element = e.target;
    if(element.classList.contains('chess-piece')){
        const x = e.clientX-30; //x offset will be width/2
        const y = e.clientY-30; //y offset will be height/2
        element.style.position = 'absolute';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
    }
}

const movePiece = (e)=>{
    const element = e.target;
    console.log(element);
}

function ChessBoard(){
    let board = generateBoard();
    return (
        <div onMouseMove={e => movePiece(e)} onMouseDown={e => grabPiece(e)} id="chessBoard">
            {board}
        </div>
    )
}

export default ChessBoard