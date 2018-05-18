/**
 * Created by Suhan on 07/06/2017.
 */
var obj={
    A1:0,
    set:function (x) {
        obj[x] = 1;
        // console.log(obj.x);
    },
    print:function () {
        console.log(obj.A1);
    }

}

obj.set('A1');
obj.print();
var sum100 = [0.255,0.135,0.065,0.127,0.105,0.093,0.09,0.08,0.05];
var sum = 0;
sum100.forEach(x=>{
    sum+=x
})
bonuslist = [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,4,4,4,4,4,4,8,8,8,8,8,16,16,16,32,32];

console.log(bonuslist.length);
