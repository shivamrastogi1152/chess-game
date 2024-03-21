class Referee {
  isValidMove(prevX, prevY, currX, currY, pieceType, team) {
    console.log("Referee is checking the move...");
    console.log("Previous Location", prevX + "," + prevY);
    console.log("Current Location", currX + "," + currY);
    console.log("PieceType: ", pieceType);
    console.log("Team: ", team);
    return true;
  }
}

export default Referee;
