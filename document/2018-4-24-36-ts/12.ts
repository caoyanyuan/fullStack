class Person{
  constructor(private name:string, private age:number){
  }

  public show():void{
    console.log(`名字：${this.name}，年龄：${this.age}`);
  }
}

let p:Person=new Person('blue', 18);

p.show();
