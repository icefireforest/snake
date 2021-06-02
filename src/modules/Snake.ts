class Snake {
    // 蛇头
    head: HTMLElement;
    // 蛇的身体,包括蛇头
    bodies: HTMLCollection;
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('sname')!;
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
        this.head.style.left = value+'px';
    }

    set Y(value){
        this.head.style.top = value+'px';
    }

   //蛇增加身体的方法
    addBody(){
        this.element.insertAdjacentHTML("beforeend","<div></div>");
    }
}

export default Snake;