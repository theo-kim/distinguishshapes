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

console.log(obj.A1);
