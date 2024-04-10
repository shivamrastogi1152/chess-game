export const getCharacter = (character) => String.fromCharCode(character + 96);

export const getInitPosition = () => {
  const position = new Array(8).fill("").map((x) => new Array(8).fill(""));
  for (let file = 0; file < 8; file++) {
    position[1][file] = "pawn_w";
    position[6][file] = "pawn_b";
  }
  for (let c = 0; c < 2; c++) {
    const color = c === 0 ? "w" : "b";
    const rank = color === "w" ? 0 : 7;
    position[rank][0] = `rook_${color}`;
    position[rank][7] = `rook_${color}`;
    position[rank][1] = `knight_${color}`;
    position[rank][6] = `knight_${color}`;
    position[rank][2] = `bishop_${color}`;
    position[rank][5] = `bishop_${color}`;
    position[rank][3] = `queen_${color}`;
    position[rank][4] = `king_${color}`;
  }

  return position;
};

export const copyPosition = (position) => {
  const newPosition = new Array(8).fill("").map((x) => new Array(8).fill(""));
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      newPosition[row][col] = position[row][col];
    }
  }

  return newPosition;
};

export const areSameColorSquares = (coords1, coords2) => {
  return (
    (coords1.rank + coords1.file) % 2 === (coords2.rank + coords2.file) % 2
  );
};

export const findPieceCoords = (position, piece) => {
  const result = [];
  position.forEach((row, r) => {
    row.forEach((col, c) => {
      if (position[r][c] === piece) {
        result.push({ rank: r, file: c });
      }
    });
  });
  return result;
};
