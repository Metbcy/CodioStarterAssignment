/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
 
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

exports.findAllSolutions = function(grid, dictionary) {
let A = 4;
let B = 4;
let D=26;

                   


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
    } */
function PrintAllWords(root,grid, i, l, done, str){
    if(root.parent == true)
        console.log(str+"\n");

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

function findAllSolutions(grid,root){
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


}
  
let dictionary = ["ART", "EGO", "GENT", "GET", "NET", "NEW", "NEWT", "PRAT",
"PRY", "QUA", "QUART", "QUARTZ", "RAT", "TAR", "TARP",
"TEN", "WENT", "WET", "ARTY", "EGG", "NOT", "QUAR"];
    
let root = new TrieTree();

let C = dictionary.length;
for(let i=0; i<C; i++)
    LWSearch1(root, dictionary[i]);

let grid = [['T', 'W', 'Y', 'R'],
['E', 'N', 'P', 'H'],
['G', 'Z', 'QU', 'R'],
['St', 'N', 'T', 'A']];
  
console.log(exports.findAllSolutions(grid,root))
  // take the first char and check if the first char is in the dictionary...but it doesnt satistfy the 3 letters...then we iterate through the board, so then we try AB and we see AB is in the dictionary we go through the list to see it's not there 
  // Credit for coding inspiration GeeksforGeeks
  // Needs more tweaking and work but need more time to complete.
