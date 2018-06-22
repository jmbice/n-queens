/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(num) {
  var solutionCollection = [];

  var recursivelyCheckBoard = function(counter, solution = new Board({'n': num})) {
    for (var j = 0; j < num; j++) {
      solution.togglePiece(counter, j);
      if (!solution.hasAnyRooksConflicts()) {
        if (counter === num - 1) {
          solutionCollection.push(solution);
        } else {
          let nextSolution = new Board(solution.rows().slice());
          recursivelyCheckBoard(counter + 1, nextSolution);
        }
      } else {
        
        solution.togglePiece(counter, j);
      }
    }
  };

  recursivelyCheckBoard(0);
  console.log('Rook find N solution:', solutionCollection[0].rows());
  return solutionCollection[0].rows();
};
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(num) {
  // var solutionCollection = [];

  var solutionCollection = [];

  var recursivelyCheckBoard = function(counter = 0, solution = new Board({'n': num}) ) {
    if (counter === num - 1) {
      solutionCollection.push(solution);
      return;
    }
    for (var j = 0; j < num; j++) {
      solution.togglePiece(counter, j);
      if (!solution.hasAnyRooksConflicts()) {
        // nextSolution = new Board(solution.rows().slice());
        // solution.togglePiece(counter, j);
        recursivelyCheckBoard(counter + 1, solution);
      }
      solution.togglePiece(counter, j);
    }
  };

  recursivelyCheckBoard();
  // console.log(solutionCollection);
  //console.log('All solutions for ' + num + ' rooks:', JSON.stringify(solutionCollection));
  return solutionCollection.length;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(num) {
  // var solutionCollection = [];

  // var board = new Board({ n: num });
  // if (num === 0) { return []; }
  // if (num === 1) { return [[1]]; }
  // if (num === 2 || num === 3) {
  //   return;
  // }


  // var recursivelyCheck = function(row, board) {
  //   if (row === num) {
  //     console.log(board);
  //     solutionCollection.push(board);
  //     return;
  //   }
    
  //   for (var i = 0; i < num; i++) {
  //     board.togglePiece(row, i);
  //     if (!board.hasAnyQueensConflicts()) {
  //       var nextSolution = new Board(board.rows().slice());
  //       recursivelyCheck(row + 1, nextSolution);
  //     }
  //     board.togglePiece(row, i);
  //   }
  // };

  // recursivelyCheck(0, board);

  // //console.log(solutionCollection);
  // return solutionCollection[0].rows();


  var boardCollection = [];
  var solutionCount = 0;
  var board = new Board({ n: num });

  if (num === 2 || num === 3) {
    return solutionCount;
  }

  var recursivelyCheck = function(row) {
    if (row === num) {
      solutionCount++;
      return;
    }
    
    for (var i = 0; i < num; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        recursivelyCheck((row + 1));
      }
      if (row < num - 1) {
        board.togglePiece(row, i);
      } else { boardCollection.push(board); }
    }
  };

  recursivelyCheck(0);
  console.log(boardCollection[0].rows());
  return boardCollection[0].rows();
};








// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(num) {
  var solutionCount = 0;
  var board = new Board({ n: num });

  if (num === 2 || num === 3) {
    return solutionCount;
  }

  var recursivelyCheck = function(row) {
    if (row === num) {
      solutionCount++;
      return;
    }
    
    for (var i = 0; i < num; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        recursivelyCheck(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  recursivelyCheck(0);

  return solutionCount;
};
