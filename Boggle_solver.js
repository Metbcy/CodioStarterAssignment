/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
 exports.findAllSolutions = function(grid, dictionary) {
  let solutions = [];
  var C = dictionary.length;
  var A = 6,
    B = 6;

  function LWsearch(str)
  {
    for (var i=0; i < C; i++) if (str==dictionary[i]) return true;
    return false;
  }
  function PrintAllWords(dictionary, done, i, l, str)
  {
    done[i][l] = true;
    str = str + dictionary[i][l];
    if(LWsearch(str)) console.log(str + "\n");
    for (var row = i - 1; row <= i + 1 && row < A; row++)
      for (var col = l; col <= l +1 && col < B; col++)
        if (row >= 0 && col >= 0 && !done[row][col])
          PrintAllWords(dictionary, done, row, col, str);
    str="" + str[str.length - 1];
    done[i][l]= false;
    
  }
  function removeDupes(grid,dictionary){
  return [...new Set(grid,dictionary)];
}
  function getwords(dictionary)
  {
    var done = Array.from(Array(A), () => new Array(B).fill(0));
    var str = "";
    for (var i = 0; i < A; i++)
      for (var l = 0; l < B; l++) PrintAllWords(dictionary, done, i, l, str); removeDupes(grid,dictionary);
  }

  solutions = getwords(dictionary);
  return solutions;
}


var grid = [['T', 'W', 'Y', 'R'],
              ['E', 'N', 'P', 'H'],
              ['G', 'Z', 'Qu', 'R'],
              ['St', 'N', 'T', 'A']];
var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];



console.log(exports.findAllSolutions(grid, dictionary));
// take the first char and check if the first char is in the dictionary...but it doesnt satistfy the 3 letters...then we iterate through the board, so then we try AB and we see AB is in the dictionary we go through the list to see it's not there 
// Credit for coding inspiration GeeksforGeeks
// Needs more tweaking and work but need more time to complete.
