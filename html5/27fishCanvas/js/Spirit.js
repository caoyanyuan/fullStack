class Spirit{
    constructor(options) {
        this.img = options.img

        this.sx=options.sx||0;
        this.sy=options.sy||0;

        this.w=options.w||this.img.width;
        this.h=options.h||this.img.height;

        this.x=options.x||0;
        this.y=options.y||0;

        this.rotation=options.rotation||0;
        this.scale=options.scale||1;

        this.speed = options.speed || 0

        // 跳入下一帧的次数限制
        this.tick = 0
        this.max_tick = 0
        //帧  
        this.frame = 0
    }

    draw(gd){
        // save 保存canvs的设置 restore释放save保存的设置
        // 不加的话 canvas的设置会乱七八糟
        gd.save();
    
        gd.translate(this.x, this.y);
        gd.rotate(this.rotation*Math.PI/180);
    
        gd.drawImage(
          this.img,
          this.sx, this.sy, this.w, this.h,
          -this.w/2, -this.h/2, this.w, this.h
        );
    
        gd.restore();
    }

    //改变sy的值
    nextFrame() {
        this.tick++;

        if(this.tick==this.max_tick){
          this.tick=0;
    
          this.frame++;
    
          if(this.frame==this.max_fame){
            this.frame=0;
          }
    
          this.sy=this.frame*this.h;
        }
    }

    //游动
    move() {
        let speedX = this.speed * Math.sin(this.rotation * Math.PI/180)
        let speedY = this.speed * Math.cos(this.rotation * Math.PI/180)

        this.x += speedX
        this.y -= speedY
    }
}