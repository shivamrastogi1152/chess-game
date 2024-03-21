import './ChessBoard.css'
import Square from '../Square/Square';
import { horizontalAxis, verticalAxis, getInitialPieceState } from '../../utils/utils';
import { useRef, useState } from 'react';

const generateBoard = (pieces)=>{
    let board = [];

    for(let j=verticalAxis.length-1;j>=0;j--){
        for(let i=0;i<horizontalAxis.length;i++){

            let imgSrc = null;              
            pieces.forEach(piece =>{
                if(piece.x === i && piece.y === j){
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

function ChessBoard(){

    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [activePiece, setActivePiece] = useState(null);
    const [pieces, setPieces] = useState(getInitialPieceState());
    let board = generateBoard(pieces);
    const chessBoardRef = useRef(null);

    const grabPiece = (e) => {
        const element = e.target;
        // console.log(element);
        const chessBoard = chessBoardRef.current;
        if(element.classList.contains('chess-piece')){

            setGridX(Math.floor((e.clientX-chessBoard.offsetLeft)/80));
            setGridY(Math.abs(Math.ceil((e.clientY-chessBoard.offsetTop-640)/80)));

            const x = e.clientX-30; //x offset will be width/2
            const y = e.clientY-30; //y offset will be height/2
            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            setActivePiece(element);

        }
    }
    
    const movePiece = (e)=>{
        // console.log(activePiece);
        const chessBoard = chessBoardRef.current;
        if(activePiece && chessBoard){

            const minX = chessBoard.offsetLeft-15;
            const minY = chessBoard.offsetTop-10;
            const maxX = minX + chessBoard.clientWidth-35;
            const maxY = minY + chessBoard.clientHeight-40;

            const x = e.clientX-30; //x offset will be width/2
            const y = e.clientY-30; //y offset will be height/2
            activePiece.style.position = 'absolute';
            activePiece.style.left = x < minX ? `${minX}px` : x > maxX ? `${maxX}px` : `${x}px`;
            activePiece.style.top = y < minY ? `${minY}px` : y > maxY ? `${maxY}px` : `${y}px`;

        }
    }
    
    const dropPiece = (e)=>{
        const chessBoard = chessBoardRef.current;
        if(activePiece){
 
            const x = Math.floor((e.clientX-chessBoard.offsetLeft)/80);
            const y = Math.abs(Math.ceil((e.clientY-chessBoard.offsetTop-640)/80));

            setPieces((val)=> {
                const temp = val.map((p)=>{
                    if(p.x === gridX && p.y === gridY){
                        p.x = Math.floor((e.clientX-chessBoard.offsetLeft)/80);
                        p.y = Math.abs(Math.ceil((e.clientY-chessBoard.offsetTop-640)/80));
                    }
                    return p;
                })
                return temp;
            });

            setActivePiece(null);
        }
    }

    return (
        <div 
        onMouseDown={e => grabPiece(e)}
        onMouseMove={e => movePiece(e)} 
        onMouseUp={e => dropPiece(e)} 
        id="chessBoard"
        ref={chessBoardRef}>
            {board}
        </div>
    )
}

export default ChessBoard