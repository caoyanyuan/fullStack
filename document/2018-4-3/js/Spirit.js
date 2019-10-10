//img
//sx, sy
//w, h
//x, y
//rotation
//scale

class Spirit{
  constructor(options){
    this.img=options.img;

    this.sx=options.sx||0;
    this.sy=options.sy||0;

    this.w=options.w||this.img.width;
    this.h=options.h||this.img.height;

    this.x=options.x||0;
    this.y=options.y||0;

    this.rotation=options.rotation||0;
    this.scale=options.scale||1;

    //
    this.speed=options.speed||0;

    this.tick=0;
    this.max_tick=0;
    this.frame=0;
    this.max_fame=0;
  }

  draw(gd){
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

  move(){
    let speed_x=this.speed*Math.sin(this.rotation*Math.PI/180);
    let speed_y=this.speed*Math.cos(this.rotation*Math.PI/180);

    this.x+=speed_x;
    this.y-=speed_y;
  }

  setFrame(frame){
    this.sy=frame*this.h;
  }

  nextFrame(){
    this.tick++;

    if(this.tick==this.max_tick){
      this.tick=0;

      this.frame++;

      if(this.frame==this.max_fame){
        this.frame=0;
      }

      this.setFrame(this.frame);
    }
  }
}
