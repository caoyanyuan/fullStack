class Person{
  public static user:string='blue';

  constructor(name:string, private age:number){
    //this.name=name;     //?
  }
}

let p:Person=new Person('blue', 18);

console.log(Person.user);
