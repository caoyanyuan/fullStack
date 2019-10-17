class Fish extends Spirit{
    constructor(type) {
        if(type < 1 ||type > 5) {
            throw new Error('鱼的类型只能是1-5')
        }
        
        let data = __g_resouce['fish'][`fish${type}`]
        super({
            img: data.img,
            w:  data.frame.w,   h: data.frame.h,
            sx: data.frame.sx,  sy: data.frame.sy,
            rotation: 90,
            speed: Math.random()*2.5+0.5
        })

        this.x = 10
        this.y = 300

        this.max_tick=5;
        this.max_fame=4;
    }

    draw(gd){
        this.rotation-=90;
    
        super.draw(gd);
    
        this.rotation+=90;
    }

    
}