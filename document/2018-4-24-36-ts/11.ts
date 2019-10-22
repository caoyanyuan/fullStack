class Person{
  protected name:string;
  private age:number;

  constructor(name:string, age:number){
    this.name=name;
    this.age=age;
  }

  public show():void{
    console.log(`名字：${this.name}，年龄：${this.age}`);
  }
}

class Staff extends Person{
  private job:string;

  constructor(name:string, age:number, job:string){
    super(name, age);

    this.job=job;
  }

  private show():void{
    super.show();

    console.log(`岗位：${this.job}`);
  }
}

let s:Staff=new Staff('blue', 18, '打杂的');

s.show();

/*let p:Person=new Person('blue', 18);
p.show();

console.log(p.name);*/
