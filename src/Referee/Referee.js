import { PieceType } from "../constants";
import { areSameColorSquares, findPieceCoords } from "../helper";
import {
  getRookMoves,
  getKnightMoves,
  getBishopMoves,
  getQueenMoves,
  getKingMoves,
  getPawnMoves,
  getPawnAttackMoves,
  getCastlingMoves,
  getKingPosition,
  getPiecesOfPlayer,
  getAllPieces,
} from "./getMoves";
import { movePawn, movePiece } from "./move";

function getPieceType(piece) {
  return piece.split("_")[0];
}

function getPieceColor(piece) {
  return piece[piece.length - 1];
}

const referee = {
  getRegularMoves: function ({ currentPosition, rank, file, piece }) {
    const pieceType = getPieceType(piece);

    if (pieceType === PieceType.ROOK)
      return getRookMoves({ currentPosition, rank, file, piece });
    if (pieceType === PieceType.KNIGHT)
      return getKnightMoves({ currentPosition, rank, file, piece });
    if (pieceType === PieceType.BISHOP)
      return getBishopMoves({ currentPosition, rank, file, piece });
    if (pieceType === PieceType.QUEEN)
      return getQueenMoves({ currentPosition, rank, file, piece });
    if (pieceType === PieceType.KING)
      return getKingMoves({ currentPosition, rank, file, piece });
    if (pieceType === PieceType.PAWN) {
      return getPawnMoves({ currentPosition, rank, file, piece });
    }

    return [];
  },

  getValidMoves: function ({
    currentPosition,
    prevPosition,
    castleDirection,
    rank,
    file,
    piece,
  }) {
    let moves = this.getRegularMoves({ currentPosition, rank, file, piece });

    if (getPieceType(piece) === PieceType.PAWN) {
      moves = [
        ...moves,
        ...getPawnAttackMoves({
          currentPosition,
          prevPosition,
          rank,
          file,
          piece,
        }),
      ];
    }

    if (getPieceType(piece) === PieceType.KING) {
      moves = [
        ...moves,
        ...getCastlingMoves({
          currentPosition,
          castleDirection,
          rank,
          file,
          piece,
        }),
      ];
    }

    const safeMoves = [];

    moves.forEach(([r, c]) => {
      const positionAfterMove = this.performMove({
        position: currentPosition,
        piece,
        fromRow: rank,
        fromCol: file,
        toRow: r,
        toCol: c,
      });

      if (
        !this.playerInCheck({
          positionAfterMove,
          currentPosition,
          player: getPieceColor(piece),
        })
      ) {
        safeMoves.push([r, c]);
      }
    });

    return safeMoves;
  },

  performMove: function ({ position, piece, fromRow, fromCol, toRow, toCol }) {
    if (getPieceType(piece) === PieceType.PAWN) {
      return movePawn({ position, piece, fromRow, fromCol, toRow, toCol });
    } else {
      return movePiece({ position, piece, fromRow, fromCol, toRow, toCol });
    }
  },

  playerInCheck: function ({ positionAfterMove, currentPosition, player }) {
    const enemy = player === "w" ? "b" : "w";
    const kingPosition = getKingPosition(positionAfterMove, player);
    const enemyPieces = getPiecesOfPlayer(positionAfterMove, enemy);

    const enemyMoves = enemyPieces.reduce((accumulator, p) => {
      const { piece, rank, file } = p;
      const pieceType = getPieceType(piece);

      const movesForCurrentPiece =
        pieceType === PieceType.PAWN
          ? getPawnAttackMoves({
              currentPosition: positionAfterMove,
              prevPosition: currentPosition,
              rank,
              file,
              piece,
            })
          : this.getRegularMoves({
              currentPosition: positionAfterMove,
              rank,
              file,
              piece,
            });

      return [...accumulator, ...movesForCurrentPiece];
    }, []);

    //If any enemy move is able to hit the king!
    if (
      enemyMoves.some(
        ([r, c]) => kingPosition[0] === r && kingPosition[1] === c
      )
    ) {
      return true;
    }

    return false;
  },

  playerInStalemate: function (position, player, castleDirection) {
    const isInCheck = this.playerInCheck({
      positionAfterMove: position,
      player,
    });

    if (isInCheck) return false;

    const playerPieces = getPiecesOfPlayer(position, player);

    const playerMoves = playerPieces.reduce((accumulator, p) => {
      const { piece, rank, file } = p;
      const pieceType = getPieceType(piece);

      const movesForCurrentPiece = this.getValidMoves({
        currentPosition: position,
        castleDirection,
        rank,
        file,
        piece,
      });

      return [...accumulator, ...movesForCurrentPiece];
    }, []);

    return !isInCheck && playerMoves.length === 0;
  },

  insufficientMaterial: function (position) {
    const pieces = getAllPieces(position);

    // 2 kings
    if (
      pieces.length === 2 &&
      pieces.every((piece) => getPieceType(piece) === PieceType.KING)
    ) {
      console.log("Only kings!");
      return true;
    }

    // 3 pieces: 2Kings + 1Bishop/Knight
    if (
      pieces.length === 3 &&
      pieces.every((piece) => {
        const pieceType = getPieceType(piece);
        if (pieceType === PieceType.KING) return true;
        else if (
          pieceType === PieceType.BISHOP ||
          pieceType === PieceType.KNIGHT
        )
          return true;
        return false;
      })
    ) {
      console.log("3 pieces insufficient!");
      return true;
    }

    // 4 pieces: 2Kings + 2Bishops [Both bishops should be on same colored square]
    // Example king_w bishop_w king_b bishop_b and bishop_w,bishop_b are both on dark squares
    if (
      pieces.length === 4 &&
      pieces.every(
        (piece) =>
          getPieceType(piece) === PieceType.KING ||
          getPieceType(piece) === PieceType.BISHOP
      ) &&
      new Set(pieces).size === 4 && //avoids the condn king_w bishop_w(dark square) bishop_w(light square) king_b
      areSameColorSquares(
        findPieceCoords(position, "bishop_w")[0],
        findPieceCoords(position, "bishop_b")[0]
      )
    ) {
      console.log(
        "4 pieces: 2Kings + 2Bishops [Both bishops are on same colored square]"
      );
      return true;
    }

    return false;
  },

  isCheckMate: function (position, player, castleDirection) {
    const isInCheck = this.playerInCheck({
      positionAfterMove: position,
      player,
    });

    if (!isInCheck) return false;

    const playerPieces = getPiecesOfPlayer(position, player);

    const playerMoves = playerPieces.reduce((accumulator, p) => {
      const { piece, rank, file } = p;
      const pieceType = getPieceType(piece);

      const movesForCurrentPiece = this.getValidMoves({
        currentPosition: position,
        castleDirection,
        rank,
        file,
        piece,
      });

      return [...accumulator, ...movesForCurrentPiece];
    }, []);

    return isInCheck && playerMoves.length === 0;
  },
};

export default referee;
