const meuPuzzle = [
  [3,9,-1,-1,5,-1,-1,-1,-1],
  [-1,-1,-1,2,-1,-1,-1,-1,5],
  [-1,-1,-1,7,1,9,-1,8,-1],
  [-1,5,-1,-1,6,8,-1,-1,-1],
  [2,-1,6,-1,-1,3,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,4],
  [5,-1,-1,-1,-1,-1,-1,-1,-1],
  [6,7,-1,1,-1,5,-1,4,-1],
  [1,-1,9,-1,-1,-1,2,-1,-1]
]

function find_empty(puzzle) {
  //Verifica se possui celula vazia
  for(let row=0; row<9; row++) {
    for(let col=0; col<9; col++) {
      if(puzzle[row][col] == -1) {
        //se tiver, retorna a linha e coluna em que ela esta
        return [row,col];
      }
    }
  }
  //se nao houver, entao tabulero esta cmpleto
  return ['none'];
}

function is_valid(puzzle, guess, row, col) {

  let row_vals = puzzle[row];

  //verifica a linha
  if(row_vals.includes(guess)) {
    return false;
  }

  //verifica a coluna
  let col_vals = [];
  for(let i=0; i<9; i++) {
    col_vals.push(puzzle[i][col]);
  }
  if(col_vals.includes(guess)) {
    return false;
  }

  //falta apenas verificar o bloco
  row_start = Math.floor(row/3) * 3;
  col_start = Math.floor(col/3) * 3;

  for(let i=row_start; i<row_start+3; i++) {
    for(let j=col_start; j<col_start+3; j++) {
      if(puzzle[i][j] == guess) {
        return false;
      }
    }
  }

  //passou em tudo? entao eh valido
  return true;
}

function solve_sudoku(puzzle) {

  // STEP 1: Escolher celula vazia para fazer chute
  let empty_cell = find_empty(puzzle);

  // STEP 1.1: Encontrou celula,
  let row = empty_cell[0];
  let col = empty_cell[1];

  // STEP 1.2: Verifica se eh celula vazia
  if(row == 'none') {
    return true;
  }

  // STEP 2: Fazer chute, numero entre 1 e 9.
  for(let guess=1; guess<=9; guess++) {

    // STEP 2.1: Verifica se o numero eh valido para chute.
    let valid = is_valid(puzzle, guess, row, col);

    // STEP 2.2: Se valido, coloca o chute no vetor.
    if(valid) {
      if(row == 0) {
      console.log('Coloquei: ', guess, ' em: ', col, row);
      }
      puzzle[row][col] = guess;

      // STEP 2.3: chute dado, proximo chute.      
      if(solve_sudoku(puzzle)) {
        return true;
      }
    }

    //step 5; se nao for valido ou nao resolver o sudoky
    puzzle[row][col] = -1; //reseta o chute
  }

  //step 6 : this puzzle is unsolble
  return false
}


console.log(solve_sudoku(meuPuzzle))
console.log(meuPuzzle)