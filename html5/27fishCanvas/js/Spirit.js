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
}