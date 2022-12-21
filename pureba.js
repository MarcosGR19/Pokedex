const fn = (a,b)=>{
    return [a, a+1];
}

let c = 0;
let d =2;
[c,d] = fn(3,4);
console.log(c)
console.log(d)
