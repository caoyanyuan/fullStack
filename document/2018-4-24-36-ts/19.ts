interface Shape{
  area():number
}

class Rect implements Shape{
  constructor(private width:number, private height:number){
  }

  area():number{
    return this.width*this.height;
  }
}

let r:Shape=new Rect(100, 200);
console.log(r.area());
