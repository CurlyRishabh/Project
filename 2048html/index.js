const rows = 4;
const columns = 4;
const twoDArray = [];
let col=1;
const pastelColors = {
    " ":"white",
    2: '#ffb6c1',   // Light pink
    4: '#add8e6',   // Light blue
    8: '#90ee90',   // Light green
    16: '#e6e6fa',  // Lavender
    32: '#ffdab9',  // Peach
    64: '#f5fffa',  // Mint
    128: '#ff7f50', // Coral
    256: '#87cefa', // Sky blue
    512: '#e6e6fa', // Lilac
    1024: '#ffffe0', // Pale yellow
    2048: '#ffd700'  // Gold
};
const monochromeColors = {
    " ":"white",
    2: '#d3d3d3',    // Light gray
    4: '#a9a9a9',    // Dark gray
    8: '#696969',    // Dim gray
    16: '#808080',   // Gray
    32: '#c0c0c0',   // Silver
    64: '#778899',   // Light slate gray
    128: '#708090',  // Slate gray
    256: '#2f4f4f',  // Dark slate gray
    512: '#000000',  // Black
    1024: '#ffffff', // White
    2048: '#ffd700'  // Gold
};

for (let i = 0; i < rows; i++) {
  twoDArray.push(new Array(columns).fill(" "));
}

class board{
    constructor(){
        let score=0;

        this.setScore = function(x){
            score=x;
        }
        this.getScore = function(){
            return score;
        } 
    }

    color(x){
        col = x==1?col=pastelColors:col=monochromeColors;
    }

    fill(){
        let no=0;
        for(let i=0;i<4;i++)
        for(let j=0;j<4;j++)
        {   
            document.getElementById(no).innerHTML=twoDArray[i][j];
            document.getElementById(no).style.backgroundColor = col[twoDArray[i][j]];
            no++;
        }
    }
    notFull(){
        for(let i=0;i<4;i++)
            for(let j=0;j<4;j++){ 
                if(twoDArray[i][j]==" ")
                    return true; 
        }
        return false;
    }
    fillRandom(){
        while(true){
            let i= Math.floor(Math.random() * 4);
            let j= Math.floor(Math.random() * 4);
            if(twoDArray[i][j] == 0){
                twoDArray[i][j]=2;
                return;
            }
        }
    }
    merge(){
        let d=false;
        for(let i=0;i<4;i++)
            for(let j=0;j<3;j++){ 
                if(twoDArray[i][j]==twoDArray[i][j+1]){
                    twoDArray[i][j]*=2;
                    twoDArray[i][j+1]=" ";
                    this.setScore(this.getScore()+twoDArray[i][j]);
                    j++;
                    d=true;
                }
            }
        
        if(d==true){
            document.getElementById("score").innerHTML=this.getScore();
        }
    
        return d;
    }
    mirror(){
        for(let i=0;i<4; i++){
            for(let j=0;j<(columns/2);j++){
                this.swap(i,j,i,columns-j-1);
            }
        }
    }
    swap(i,j,k,l){
        const temp = twoDArray[i][j];
        twoDArray[i][j] = twoDArray[k][l];
        twoDArray[k][l] = temp;
    }
    transpose(){    
        for(let i=0;i<4; i++)
            for(let j=i;j<4;j++)
            this.swap(i,j,j,i);
    }
    moveleft(){
        let x=0;
        for(let i=0;i<4;i++){
            x=0;
           const arr = new Array(columns).fill(" ");
            for(let j=0;j<4;j++){
                if(twoDArray[i][j] != " "){
                    arr[x]=twoDArray[i][j];
                    x+=1;
                }
            }
            twoDArray[i]=arr;
        }
    }
    moveright(){
        this.mirror();
        this.moveleft();
        if(this.merge()){
            this.moveleft();
        } 
        this.mirror();
        
    }
    movedown(){
        this.transpose()
        this.mirror()
        this.moveleft()
        if(this.merge())
        this.moveleft();
        this.mirror();
        this.transpose();
    }
    moveup(){
        this.transpose();
        this.moveleft();
        if(this.merge())
        this.moveleft();
        this.transpose();
    }
    valid_move(){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(twoDArray[i][j]==twoDArray[i][j+1] || twoDArray[i+1][j]==twoDArray[i][j])
                    return true;
            }
            if(twoDArray[i][3]==twoDArray[i+1][3])
                return true;
        }
        return false;
    }
}

function handleKeyDown(event,game) {
    // Get the key code of the pressed key
    const keyCode = event.keyCode || event.which;
    switch (keyCode) {
        case 37:
        //   arrowKey = "Left";
            game.moveleft();      
            if(game.merge()){
                game.moveleft();
            }      
          break;
        case 38:
        //   arrowKey = "Up";
        game.moveup();  
            break;
        case 39:
            // arrowKey = "Right";
            game.moveright();
            // fill(twoDArray);
            break;
        case 40:
        //   arrowKey = "Down";
        game.movedown();
            break;
        default:
          return; // Exit function if the pressed key is not an arrow key
      }
      
    if(keyCode == 37 || keyCode ==38 || keyCode ==39 || keyCode ==40){
        if(!game.notFull()){
            //console.log("sd");
            if(!game.valid_move()){
                console.log("Game Over");
                alert("restart");
                for(let i=0;i<4;i++)
                for(let j=0;j<4;j++)
                    twoDArray[i][j] =" ";
                game.setScore(0);
                game.fill(twoDArray);
                game.fillRandom();
               
            }
        }else{
            game.fillRandom();
            game.fill();
        }
    }
    return;
}

const start = new board();
function mode(x){
    start.color(x);
    start.fill()
}
start.fillRandom();
start.fill(twoDArray);
document.addEventListener('keydown', (x)=> handleKeyDown(x,start));
