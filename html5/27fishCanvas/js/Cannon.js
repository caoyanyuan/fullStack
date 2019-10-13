
class Cannon extends Spirit{
    constructor(type) {
        if(type < 1 ||type > 7) {
            throw new Error('炮的类型只能是1-7')
        }
        
        let data = __g_resouce['cannon'][`cannon${type}`]
        super({
            img: data.img,
            w:  data.frame.w,   h: data.frame.h,
            sx: data.frame.sx,  sy: data.frame.sy,
            
        })

        this.x = 440
        this.y = 570

        this.max_tick=5;
        this.max_fame=4;

        this.type = type
    }
    
    setType(newType) {
        if(newType < 1 ||newType > 7) {
            throw new Error('炮的类型只能是1-7')
        }


        let data=__g_resouce['cannon'][`cannon${newType}`];
        this.img=data.img;
        this.sx=data.frame.x;
        this.sy=data.frame.y;
        this.w=data.frame.w;
        this.h=data.frame.h;

        this.type=newType;

        console.log(this)
    }
}