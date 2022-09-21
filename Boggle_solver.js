/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
 exports.findAllSolutions = function(grid, dictionary) {
    let solutions = [];

    if(grid == null || dictionary == null)
       return solutions;
  
     let N = grid.length;
     for(let i = 0; i < N; i++) {
        if(grid[i].length != N ){
  
            return solutions;
        }
     }
  
    LowerCase(grid, dictionary);
  
  
     if(!GridValidator(grid)){
        return solutions;
     }
  
    let solutionSet = new Set();
  
    let hash = createHashMap(dictionary);
  
    for(let y = 0; y < N; y++){
  
        for(let x = 0; x < N; x++){
             let word = "";
  
             let visited = new Array(N).fill(false).map(() => new Array(N).fill(false));
  
             PrintAllWords(word, y, x, grid, visited, hash, solutionSet);
        }
  
    }
  
    solutions = Array.from(solutionSet);
  
    return solutions;
  }
  
  PrintAllWords = function(word, y, x, grid, visited, hash, solutionSet){
  
      let adjMatrix = [[-1, -1],
                     [-1, 0],
                     [-1, 1],
                     [0, 1],
                     [1, 1],
                     [1, 0],
                     [1,-1],
                     [0, -1]];
  
    if (y < 0 || x < 0 || y >= grid.length || x >= grid.length || visited[y][x] == true)
           return;
  
    word += grid[y][x];
  
    if(WordChecker(word, hash)) {
           visited[y][x] = true;
  
           if(isWord(word, hash)) {
               if(word.length >= 3)
                    solutionSet.add(word);
           }
  
           for(let i = 0; i < 8; i++){
            PrintAllWords(word, y + adjMatrix[i][0], x + adjMatrix[i][1], grid, visited, hash, solutionSet);
            }
  
    }
  
    visited[y][x] = false;
  }
  
  WordChecker = function(word, hash) {
     return hash[word] != undefined;
  }
  
  
  isWord = function(word, hash) {
    return hash[word] == 1;
  }
  
  createHashMap = function(dictionary){
    var dict = {};
    for(let i = 0; i < dictionary.length ; i++){
      dict[dictionary[i]]= 1;
      let wordlength = dictionary[i].length;
      var str = dictionary[i];
      for(let j = wordlength; wordlength > 1; wordlength--){
        str = str.substr(0,wordlength-1);
        if(str in dict){
          if(str == 1 ){
            dict[str]= 1;
          }
        }
        else{
          dict[str]= 0;
        }
      }
    }
    return dict;
  }
  
  LowerCase = function(grid, dict){
  
      for(let i = 0; i < grid.length; i++) {
        for( let j = 0; j < grid[i].length; j++) {
             grid[i][j] = grid[i][j].toLowerCase();
        }
      }
  
      for(let i = 0; i < dict.length; i++) {
        dict[i] = dict[i].toLowerCase();
      }
  }
  
    GridValidator = function(grid){
      raexp = /(st|qu)|[a-prt-z]/;
      for(let i = 0; i < grid.length; i++) {
        for( let j = 0; j < grid[i].length; j++) {
            if(!grid[i][j].match(raexp)){
                 return false;
            }
        }
  
      }
  
      return true;
  }
  
/*
let A = 4;
let B = 4;
let D=26;

                   
class TrieTree
{
    constructor()
    {
        this.parent=false;
        this.child = new Array(D)
        for (let i = 0; i < D; i++)
            this.child[i]=null;
    }
}

function LWSearch1(root,Key)
{
    let c = Key.length;
        let ParChi= root;
        for (let i = 0; i < c; i++){
            let index = Key[i].charCodeAt(0) - 'A'.charCodeAt(0);

            if (ParChi.child[index] == null)
                ParChi.child[index] =  new TrieTree();

            ParChi = ParChi.child[index];
        }
        ParChi.parent = true;
        
    }

function location(i,l,done)
{
    return(i>=0 && i < A && l >= 0
            && l < B && !done[i][l]);
}

    /* function LWsearch(str) {
      for (var i=0; i < C; i++) if (str==dictionary[i]) return true;
      return false;
    } 
function PrintAllWords(root,grid, i, l, done, str){
    if(root.parent == true)
        console.log(str+"<br>");

    if(location(i,l,done)){
        done[i][l] = true;

        for(let M=0; M < D; M++){
            if (root.child[M] != null){
                let chara = String.fromCharCode(M + 'A'.charCodeAt(0));
                if(location(i+1,l+1,done)
                    && grid[i+1][l+1] == chara)
                    PrintAllWords(root.child[M], grid,
                                i + 1, l + 1,
                                done, str + chara);
                if (location(i,l +1, done)
                    && grid[i][l+1] == chara)
                    PrintAllWords(root.child[M], grid,
                                i, l + 1,
                                done, str + chara);
                if (location(i-1, l+1, done)
                    && grid[i-1][l+1] == chara)
                    PrintAllWords(root.child[M], grid,
                                i - 1, l + 1,
                                done, str + chara);
                if(location(i+1,l,done)
                    && grid[i+1][l] == chara)
                    PrintAllWords(root.child[M], grid,
                                i + 1, l,
                                done, str + chara);
                if(location(i+1,l-1,done)
                    && grid[i+1][l-1] == chara)
                    PrintAllWords(root.child[M], grid,
                                i + 1, l - 1,
                                done, str + chara);
                if(location(i,l-1,done)
                    && grid[i][l-1] == chara)
                    PrintAllWords(root.child[M], grid,
                                i, l - 1,
                                done, str + chara);
                if(location(i-1,l-1,done)
                    && grid[i-1][l] == chara)
                    PrintAllWords(root.child[M], grid,
                                i - 1, l - 1,
                                done, str + chara);
                if(location(i-1,l,done)
                    && grid[i-1][l] == chara)
                    PrintAllWords(root.child[M], grid,
                                i - 1, l,
                                done, str + chara);
                }
            }

            done[i][l] = false;
        }

    }

function getwords(grid,root){
    let done = new Array(A);
    for (let i=0;i<A;i++)
    {
        done[i]= new Array(B);
        for(let l=0; l<B;l++)
            {
                done[i][l]=false;
            }
        }
        let ParChi = root;

        let str = "";

        for(let i=0; i<A; i++){
            for (let l = 0; l<B; l++){

                if(ParChi.child[(grid[i][l]).charCodeAt(0)-'A'.charCodeAt(0)] != null){
                    str = str + grid[i][l];
                    PrintAllWords(ParChi.child[(grid[i][l]).charCodeAt(0)-'A'.charCodeAt(0)],
                                grid, i, l, done, str);
                    str= "";
            }
        }
    }
}
   /* function PrintAllWords(dictionary, done, i, l, str)
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
    */
   /* function getwords(dictionary)
    {
      var done = Array.from(Array(A), () => new Array(B).fill(0));
      var str = "";
      for (var i = 0; i < A; i++)
        for (var l = 0; l < B; l++) PrintAllWords(dictionary, done, i, l, str); removeDupes(grid,dictionary);
    }
  
    solutions = getwords(dictionary);
    return solutions;
    */



  
let dictionary = ["ART", "EGO", "GENT", "GET", "NET", "NEW", "NEWT", "PRAT",
"PRY", "QUA", "QUART", "QUARTZ", "RAT", "TAR", "TARP",
"TEN", "WENT", "WET", "ARTY", "EGG", "NOT", "QUAR"];

/* let root = new TrieTree();

let C = dictionary.length;
for(let i=0; i<C; i++)
    LWSearch1(root, dictionary[i]);
*/

let grid = [['T', 'W', 'Y', 'R'],
['E', 'N', 'P', 'H'],
['G', 'Z', 'QU', 'R'],
['St', 'N', 'T', 'A']];
  
console.log(exports.findAllSolutions(grid, dictionary));
  // take the first char and check if the first char is in the dictionary...but it doesnt satistfy the 3 letters...then we iterate through the board, so then we try AB and we see AB is in the dictionary we go through the list to see it's not there 
  // Credit for coding inspiration GeeksforGeeks
