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
        this.snake.X = x;
        this.snake.Y = y;

        this.isLive && setTimeout(this.run.bind(this),300 * (this.scorePanel.level-1)*30);
    }


}
export default GameControl;