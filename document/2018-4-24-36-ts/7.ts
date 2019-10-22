//let a: undefined=undefined;
//let a:null=null;

//let a:never=12;

function show():never{
  let a=12;
  let b=5;

  alert(a+b);

  throw new Error('有错');
}

show();
