class Snake {
    // 蛇头
    head: HTMLElement;
    // 蛇的身体,包括蛇头
    bodies: HTMLCollection;
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('snake')!;
        //取snake的第一个div
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div');

    }

    //获取蛇头的坐标
    get X(){
        return this.head.offsetLeft;
    }

    get Y(){
        return this.head.offsetTop;
    }

    set X(value){
        if(this.X===value){
            return;
        }
        //X的合法范围0-290之间
        if(value<0 || value>290){
            //蛇撞墙了
            throw new Error("蛇撞墙了!");
        }
        //蛇向左走时，不能向右掉头;同理蛇向右走时，不能向左掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            if(value > this.X){
                //说明是往右走,此时发生掉头，应该继续往左走
                value = this.X - 10;
            }else{
                value = this.X + 10;
            }
        }

        this.movBody();
        this.head.style.left = value+'px';

        //检查有没有撞到自己
        this.checkHeadBody();
    }

    set Y(value){
        if(this.Y===value){
            return;
        }
        //y的合法范围0-290之间
        if(value<0 || value>290){
            //蛇撞墙了
            throw new Error("蛇撞墙了!");
        }

        //蛇向上走时，不能向下掉头;同理蛇向下走时，不能向上掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            if(value > this.Y){
                //说明是往上走,此时发生掉头，应该继续往上走
                value = this.Y - 10;
            }else{
                value = this.Y + 10;
            }
        }

        this.movBody();
        this.head.style.top = value+'px';

        //检查有没有撞到自己
        this.checkHeadBody();
    }

   //蛇增加身体的方法
    addBody(){
        this.element.insertAdjacentHTML("beforeend","<div></div>");
    }
    //蛇身体移动的方法
    movBody(){
        //将后面身体的位置，设置为前面的位置
        for(let i=this.bodies.length-1;i>0;i--){
            //获取前面身体的位置
            let x = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let y = (this.bodies[i-1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = x+"px";
            (this.bodies[i] as HTMLElement).style.top = y+"px";

        }

    }

    checkHeadBody(){
        //检查所有的身体，检查是否和所有的坐标发生碰撞
        for(let i = 1;i<this.bodies.length;i++){
            let bd = this.bodies[i] as HTMLElement;
            if(this.X===bd.offsetLeft && this.Y === bd.offsetTop){
                // 说明蛇头碰到了身体
                throw new Error("撞到自己了");
            }
        }
    }
}

export default Snake;