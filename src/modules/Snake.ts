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
        this.movBody();
        this.head.style.left = value+'px';
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
        this.movBody();
        this.head.style.top = value+'px';
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
}

export default Snake;