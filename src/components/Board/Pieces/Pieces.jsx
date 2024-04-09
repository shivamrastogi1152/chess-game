import "./Pieces.css";
import Piece from "./Piece";
import { useState, useRef } from "react";
import { getInitPosition, copyPosition } from "../../../helper";
import { useAppContext } from "../../../contexts/context";
import { clearCandidateMoves, makeNewMove } from "../../../reducer/actions/move";
import referee from "../../../referee/referee";
import { PieceType } from "../../../constants";
import { openPromotion } from "../../../reducer/actions/popup";

const Pieces = () => {

  const ref = useRef();
  const {appState, dispatch} = useAppContext();
  const currentPosition = appState.positions[appState.positions.length-1];

  function calculateCoords(e){
    const {width, left, top} = ref.current.getBoundingClientRect();
    const size = width/8;
    const c = Math.floor((e.clientX - left)/size);
    //Row needs to be inverted
    const r = 7 - Math.floor((e.clientY - top)/size);
    return [r, c];
  }

  function openPromotionBox({fromRow, fromCol, toRow, toCol}){
    console.log(fromRow, fromCol, toRow, toCol);
    dispatch(openPromotion({fromRow : Number(fromRow), fromCol: Number(fromCol), toRow: Number(toRow), toCol: Number(toCol)}));
  }

  function move(e){
    const [toRow, toCol] = calculateCoords(e);
    const [piece, fromRow, fromCol] = e.dataTransfer.getData('text').split(",");
    if(appState.candidateMoves?.find(m => m[0] == toRow && m[1] == toCol)){

      if((piece === PieceType.PAWN + `_w` && toRow === 7) ||  (piece === PieceType.PAWN + `_b` && toRow === 0)){
        openPromotionBox({fromRow, fromCol, toRow, toCol});
        return;
      }

      const newPosition = referee.performMove({position : currentPosition, piece, fromRow, fromCol, toRow, toCol});
      dispatch(makeNewMove({newPosition}));
    }
    dispatch(clearCandidateMoves());
  }

  function onDrop(e){
    e.preventDefault();
    move(e);
  }

  function onDragOver(e){
    e.preventDefault();
  }

  return (
    <div 
    ref={ref}
    onDrop={onDrop}
    onDragOver={onDragOver}
    className="pieces"
    >
      {currentPosition.map((row, rank) => {
        return row.map((col, file) => {
          return currentPosition[rank][file] ? (
            <Piece
              key={rank + "-" + file}
              rank={rank}
              file={file}
              piece={currentPosition[rank][file]}
            />
          ) : null;
        });
      })}
    </div>
  );
};

export default Pieces;
