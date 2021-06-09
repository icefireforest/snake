import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
// 游戏控制器,控制其它的所有类
class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    //存储蛇的移动方向
    direction: string = 'Right';
    // 是否活着
    isLive = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }

    //游戏初始化,调用后游戏开始
    init(){
        document.addEventListener('keydown',this.keydownHandler.bind(this));
        this.run();
    }

    //键盘按下的响应函数
    keydownHandler(event: KeyboardEventInit){
        if(event.key==='ArrowRight' || event.key==='Right'
            || event.key==='ArrowLeft' || event.key==='Left'
            || event.key==='ArrowUp' || event.key==='Up'
            || event.key==='ArrowDown' || event.key==='Down'){
            this.direction = event.key!;
        }
    }
    //让蛇跑起来
    run(){
        let x = this.snake.X;
        let y = this.snake.Y;
        switch (this.direction){
            case "ArrowUp":
            case "Up":
                y-=10;
                break;
            case "ArrowDown":
            case "Down":
                y+=10;
                break;
            case "ArrowLeft":
            case "Left":
                x-=10;
                break;
            case "ArrowRight":
            case "Right":
                x+=10;
                break;

        }
        this.checkEat(x,y);
           
        
        try{
            this.snake.X = x;
            this.snake.Y = y;    
        }catch(e){
            //弹框提示错误
            alert(e.message);
            // 游戏结束
            this.isLive = false;
        }
        
        this.isLive && setTimeout(this.run.bind(this),300 - (this.scorePanel.level-1)*30);
    }

    //检查蛇是否吃到食物
    checkEat(x: number,y: number){
        if (x===this.food.X && y===this.food.Y){
             //食物位置变换
             this.food.change();
             //分属加1
             this.scorePanel.addScore();
             //蛇的身体加一节
             this.snake.addBody();
        }
    }


}
export default GameControl;