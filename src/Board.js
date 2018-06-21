// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      if (this.attributes[rowIndex].reduce((total, value) => total + value) > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (let i = 0; i < Object.keys(this.attributes).length - 1; i++) {
        if (this.attributes[i].reduce((total, value) => total + value) > 1) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let col = [];
      for (let i = 0; i < Object.keys(this.attributes).length - 1; i++) {
        col.push(this.attributes[i][colIndex]);
      }
      if (col.reduce((total, value) => total + value) > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let num = Object.keys(this.attributes).length - 1;
      //for every row
      for (let i = 0; i < num; i++) {
        //we will make a column collection
        let col = [];
        // and iterate through the row;
        for (let j = 0; j < num; j++) {
          // and push 
          col.push(this.attributes[j][i]);
        }
        if (col.reduce((total, value) => total + value) > 1) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var checkColumnFrom = majorDiagonalColumnIndexAtFirstRow;
      let board = Object.keys(this.attributes).length - 1;
      var diag = [];
          
      for (var d = 0; d < board; d++) {
        //push all diagonal values from each row index
        diag.push(this.attributes[0 + d][checkColumnFrom + d]);
      }
      //use reduce to sum each row[r]'s diagonal array, if greater than 1, return true; else continue
      if (
        diag.reduce(function(prev, curr) {
          curr === undefined ? curr = 0 : null;
          return prev = prev + curr;
        }, 0)
      > 1) { return true; } else {
        return false;
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let board = Object.keys(this.attributes).length - 1;
      //iterate rows, starting with negative rows        
      for (var r = 1 - board; r <= board + 3; r++) {
        let diag = [];
        //create loop to get +diagonal values
        for (var d = 0; d < board; d++) {
          //push all diagonal values from each row index
          diag.push(this.attributes[0 + d][r + d]);
        }
        //use reduce to sum each row[r]'s diagonal array, if greater than 1, return true; else continue
        if (
          diag.reduce(function(prev, curr) {
            curr === undefined ? curr = 0 : null;
            return prev = prev + curr;
          }, 0)
        > 1) { return true; }
      }
      //if after complete iteration, no duplicates on diagonal are false, return false
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var checkColumnFrom = minorDiagonalColumnIndexAtFirstRow;
      let board = Object.keys(this.attributes).length - 1;
      var diag = [];
          
      for (var d = 0; d < board; d++) {
        //push all diagonal values from each row index
        diag.push(this.attributes[0 + d][checkColumnFrom - d]);
      }
      //use reduce to sum each row[r]'s diagonal array, if greater than 1, return true; else continue
      if (
        diag.reduce(function(prev, curr) {
          curr === undefined ? curr = 0 : null;
          return prev = prev + curr;
        }, 0)
      > 1) { return true; } else {
        return false;
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let board = Object.keys(this.attributes).length - 1;
      //iterate rows, starting with positive rows that exceed the board       
      for (var r = 2 * (board - 1); r >= 0; r--) {
        let diag = [];
        //create loop to get +diagonal values
        for (var d = 0; d < board; d++) {
          //push all diagonal values from each row index by adding them for each r
          diag.push(this.attributes[0 + d][r - d]);
        }
        //use reduce to sum each row[r]'s diagonal array, if greater than 1, return true; else continue
        if (
          diag.reduce(function(prev, curr) {
            curr === undefined ? curr = 0 : null;
            return prev = prev + curr;
          }, 0)
        > 1) { return true; }
      }
      //if after complete iteration, no duplicates on diagonal are false, return false
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

var testBoard = [
  [0, 1, 0, 0],
  [1, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]; 

var board = new Board(testBoard);
