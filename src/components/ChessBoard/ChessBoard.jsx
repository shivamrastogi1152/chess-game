import './ChessBoard.css'
import { useRef, useState } from 'react';
import Square from '../Square/Square';
import Referee from '../../Referee/Referee';
import { HORIZONTAL_AXIS, VERTICAL_AXIS, SQUARE_LENGTH, BOARD_LENGTH, OFFSET, getInitialPieceState, IMG_URL } from '../../utils/utils';
import PieceType from "../../utils/PieceType"
import TeamType from "../../utils/TeamType"

function ChessBoard(){

    const generateBoard = (pieces)=>{
        let board = [];
    
        for(let j=VERTICAL_AXIS.length-1;j>=0;j--){
            for(let i=0;i<HORIZONTAL_AXIS.length;i++){
    
                const piece = pieces.find(p => p.x === i && p.y === j);
                const imgSrc = piece ? piece.imgSrc : null;
                
                const currentPiece = pieces.find(p => p.x === gridX && p.y === gridY);
                const highlight = currentPiece && currentPiece.possibleMoves && currentPiece.possibleMoves.some(({x,y}) => x === i && y === j);

                // if(highlight){
                //     console.log("Possible move for currentPiece is: ", {i,j});
                // }else{
                //     console.log({i,j} , "is not a possible move for the current piece");
                // }
    
                board.push(
                    <Square 
                        row={j} 
                        col={i} 
                        imgSrc={imgSrc} 
                        highlight = {highlight}
                        key={HORIZONTAL_AXIS[i]+VERTICAL_AXIS[j]}
                    />
                );
            }
        }
        return board;
    }

    const [gridX, setGridX] = useState(null);
    const [gridY, setGridY] = useState(null);
    const [activePiece, setActivePiece] = useState(null);
    const [pieces, setPieces] = useState(getInitialPieceState());
    const [promotionPawn, setPromotionPawn] = useState(null);
    const [turn, setTurn] = useState(TeamType.WHITE);
    const [numberOfMoves, setNumberOfMoves] = useState(0);
    const modalReference = useRef(null);
    const chessBoardReference = useRef(null);
    const referee = new Referee();
    let board = generateBoard(pieces);

    const updatePossibleMoves = (currentPiece, pieces)=>{
        const possibleMoves = referee.addPossibleMoves(currentPiece, pieces);
        const updatedPieces = pieces.reduce((result, p)=>{

            if(p.x === currentPiece.x && p.y === currentPiece.y && turn === currentPiece.team){
                p.possibleMoves = possibleMoves;
                // console.log(p);
            } else{
                p.possibleMoves = [];
            }

            result.push(p);
            return result;
        }, []);
        setPieces(updatedPieces);
    }

    const grabPiece = (e) => {
        const element = e.target;
        // console.log(element);

        const chessBoard = chessBoardReference.current;
        if(element.classList.contains('chess-piece') && chessBoard){

            const _gridX = Math.floor((e.clientX-chessBoard.offsetLeft)/SQUARE_LENGTH);
            const _gridY = Math.abs(Math.ceil((e.clientY-chessBoard.offsetTop-BOARD_LENGTH)/SQUARE_LENGTH));

            setGridX(_gridX);
            setGridY(_gridY);

            const mouseX = e.clientX-(SQUARE_LENGTH/2)+OFFSET;
            const mouseY = e.clientY-(SQUARE_LENGTH/2)+OFFSET; 
            element.style.position = 'absolute';
            element.style.left = `${mouseX}px`;
            element.style.top = `${mouseY}px`;
            element.style.zIndex = `100`;
            setActivePiece(element);
            // console.log(element);


            const currentPiece = pieces.find(piece => piece.x === _gridX && piece.y === _gridY);
            // console.log(`Current piece is: `, {...currentPiece});
            updatePossibleMoves(currentPiece, pieces, turn);

        }
    }
    
    const movePiece = (e)=>{
        // console.log(activePiece);
        const chessBoard = chessBoardReference.current;
        if(activePiece && chessBoard){

            const minX = chessBoard.offsetLeft-OFFSET;
            const minY = chessBoard.offsetTop-OFFSET;
            const maxX = minX + chessBoard.clientWidth-(SQUARE_LENGTH/2);
            const maxY = minY + chessBoard.clientHeight-(SQUARE_LENGTH/2);

            const mouseX = e.clientX-(SQUARE_LENGTH/2)+OFFSET;
            const mouseY = e.clientY-(SQUARE_LENGTH/2)+OFFSET; 
            activePiece.style.position = 'absolute';
            activePiece.style.left = mouseX < minX ? `${minX}px` : mouseX > maxX ? `${maxX}px` : `${mouseX}px`;
            activePiece.style.top = mouseY < minY ? `${minY}px` : mouseY > maxY ? `${maxY}px` : `${mouseY}px`;

        }
    }

    const getImageForPiece = (pieceType)=>{
        if(promotionPawn){
            const color = promotionPawn.team === TeamType.WHITE ? 'w' : 'b';
            return `${IMG_URL}/${PieceType[pieceType].toLowerCase()}_${color}.png`;
        }
        return '';        
    }

    const promotePawn = (e)=>{
        const updatedPieces = pieces.reduce((result, p)=>{
            if(p.x === promotionPawn.x && p.y === promotionPawn.y){
                const pieceType = e.target.attributes.alt.value;
                p.pieceType = PieceType[pieceType];
                p.imgSrc = getImageForPiece(pieceType);
            }

            result.push(p);
            return result;
        }, []);
        setPieces(updatedPieces);

        modalReference.current.classList.add("hide-modal");
    }
    
    const dropPiece = (e)=>{
        const chessBoard = chessBoardReference.current;
        if(activePiece){
 
            const x = Math.floor((e.clientX-chessBoard.offsetLeft)/SQUARE_LENGTH);
            const y = Math.abs(Math.ceil((e.clientY-chessBoard.offsetTop-BOARD_LENGTH)/SQUARE_LENGTH));

            const currentPiece = pieces.find(piece => piece.x === gridX && piece.y === gridY);

            if(currentPiece){
                if(referee.isEnPassantMove(gridX, gridY, x, y, currentPiece.pieceType, currentPiece.team, pieces)){
                    const dirY = currentPiece.team === TeamType.WHITE ? 1 : -1;
                    const updatedPieces = pieces.reduce((result, p)=>{
                        if(p.x === gridX && p.y === gridY){
                            p.enPassant = false;
                            p.x = x;
                            p.y = y;
                            result.push(p);
                        }else if( !(p.x === x && p.y === y - dirY) ){
                            p.enPassant = false;
                            result.push(p);
                        }
                        return result;
                    }, []);
                    setPieces(updatedPieces);
                    setTurn(turn === TeamType.WHITE ? TeamType.BLACK : TeamType.WHITE);
                    setNumberOfMoves(numberOfMoves+1);
                }
                else if(referee.isValidMove(currentPiece.x, currentPiece.y, x, y, currentPiece.pieceType, currentPiece.team, pieces, turn)){
                    const updatedPieces = pieces.reduce((result, p)=>{
                        //Update current piece's position to new position
                        if(p.x === gridX && p.y === gridY){
                            p.enPassant = (p.pieceType === PieceType.PAWN && Math.abs(Math.abs(gridY - y)===2));
                            p.x = x;
                            p.y = y;

                            const promotionRow = (p.pieceType !== PieceType.PAWN) ? null :  (p.team === TeamType.WHITE) ? 7 : 0;
                            if(y === promotionRow){
                                setPromotionPawn(p);
                                modalReference.current.classList.remove("hide-modal");
                            }
                            
                            result.push(p);
                        } 
                        //Include only non-attacked pieces in the result
                        else if( !(p.x === x && p.y === y) ){
                            p.enPassant = false;
                            result.push(p);
                        }
                        return result;
                    }, []);
                    setPieces(updatedPieces);
                    setTurn(turn === TeamType.WHITE ? TeamType.BLACK : TeamType.WHITE);
                    setNumberOfMoves(numberOfMoves+1);
                }
                // Not a valid move -> return the piece back to original position
                else{
                    activePiece.style.position = "relative";
                    activePiece.style.left = '0px';
                    activePiece.style.top = '0px';
                    activePiece.style.zIndex = `0`;
                }
            }
            setActivePiece(null);
        }
    }

    return (
        <>
            <div id="modal" className='hide-modal' ref={modalReference}>
                <div className="modal-body">
                    <img onClick={(e)=> promotePawn(e)} src={getImageForPiece(PieceType.ROOK)} alt={PieceType.ROOK} draggable="false"></img>
                    <img onClick={(e)=> promotePawn(e)} src={getImageForPiece(PieceType.KNIGHT)} alt={PieceType.KNIGHT} draggable="false"></img>
                    <img onClick={(e)=> promotePawn(e)} src={getImageForPiece(PieceType.BISHOP)} alt={PieceType.BISHOP} draggable="false"></img>
                    <img onClick={(e)=> promotePawn(e)} src={getImageForPiece(PieceType.QUEEN)} alt={PieceType.QUEEN} draggable="false"></img>
                </div>
            </div>
            <div className="textbox">
                <div className="text">{turn} to play!</div>
                <div>Move Counter: {numberOfMoves}</div>
            </div>
            <div 
            onMouseDown={e => grabPiece(e)}
            onMouseMove={e => movePiece(e)} 
            onMouseUp={e => dropPiece(e)} 
            id="chessBoard"
            ref={chessBoardReference}
            >
                {board}
            </div>
        </>
        
    )
}

export default ChessBoard