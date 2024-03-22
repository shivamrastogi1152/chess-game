import './ChessBoard.css'
import { useRef, useState } from 'react';
import Square from '../Square/Square';
import Referee from '../../Referee/Referee';
import { horizontalAxis, verticalAxis, getInitialPieceState } from '../../utils/utils';
import PieceType from "../../utils/PieceType"
import TeamType from "../../utils/TeamType"

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
                    row={j} 
                    col={i} 
                    imgSrc={imgSrc} 
                    key={horizontalAxis[i]+verticalAxis[j]}
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
    const chessBoardReference = useRef(null);
    const referee = new Referee();

    const grabPiece = (e) => {
        const element = e.target;
        // console.log(element);
        const chessBoard = chessBoardReference.current;
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
        const chessBoard = chessBoardReference.current;
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
        const chessBoard = chessBoardReference.current;
        if(activePiece){
 
            const x = Math.floor((e.clientX-chessBoard.offsetLeft)/80);
            const y = Math.abs(Math.ceil((e.clientY-chessBoard.offsetTop-640)/80));

            const currentPiece = pieces.find(piece => piece.x === gridX && piece.y === gridY);
            // console.log(`Current piece is: `, currentPiece);
            const attackedPiece = pieces.find(piece => piece.x === x && piece.y === y);
            // console.log(`Attacked piece is: `, attackedPiece);

            if(currentPiece){

                
                const enPassantMove = referee.isEnPassantMove(gridX, gridY, x, y, currentPiece.pieceType, currentPiece.team, pieces);

                if(enPassantMove){
                    const dirY = currentPiece.team === TeamType.WHITE ? 1 : -1;
                    const updatedPieces = pieces.reduce((result, p)=>{

                        if(p.x === gridX && p.y === gridY){
                            p.enPassant = false;
                            p.x = x;
                            p.y = y;
                            result.push(p);
                        }else if( !(p.x === x && p.y === y - dirY) ){
                            if(p.pieceType === PieceType.PAWN){
                                p.enPassant = false;
                            }
                            result.push(p);
                        }
                        return result;
                    }, []);
                    setPieces(updatedPieces);
                }

                // isValidMove() handles:
                // 1. PieceType movement logic
                // 2. PieceType attacking logic (Check if attacking square is occupied by opponent as well)
                 //In case of a valid move update the pieces state accordingly
                else if(referee.isValidMove(currentPiece.x, currentPiece.y, x, y, currentPiece.pieceType, currentPiece.team, pieces)){
                    const updatedPieces = pieces.reduce((result, p)=>{
                        //Update current piece's position to new position
                        if(p.x === gridX && p.y === gridY){

                            if(p.pieceType === PieceType.PAWN && Math.abs(gridY - y)===2){
                                p.enPassant = true;
                            }else{ 
                                p.enPassant = false;
                            }

                            p.x = x;
                            p.y = y;
                            result.push(p);
                        } 
                        //Include non-attacked pieces in the result
                        else if( !(p.x === x && p.y === y) ){
                            if(p.pieceType === PieceType.PAWN){
                                p.enPassant = false;
                            }
                            result.push(p);
                        }
                        return result;
                    }, []);
                    setPieces(updatedPieces);
                }
                // Not a valid move -> return the piece back to original position
                else{
                    activePiece.style.position = "relative";
                    activePiece.style.left = '0px';
                    activePiece.style.top = '0px';
                }
            }

            setActivePiece(null);
        }
    }

    return (
        <div 
        onMouseDown={e => grabPiece(e)}
        onMouseMove={e => movePiece(e)} 
        onMouseUp={e => dropPiece(e)} 
        id="chessBoard"
        ref={chessBoardReference}
        >
            {board}
        </div>
    )
}

export default ChessBoard