Buffer.prototype.split = Buffer.prototype.split || function(b) {
    let arr = [],
        cur = 0,
        n = 0;
    
    while((n=this.indexOf(b, cur))!==-1){
        arr.push(this.slice(cur, n))
        cur = n + b.length
    }
    
    arr.push(this.slice(cur));
    return arr
}