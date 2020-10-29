function randomArray(l){
    var a = new Array(l);
    a.fill(0,0,a.length);
    return a.map(function(){
        return (Math.random() * 100);
    });
}

function arraySplit(ar){
    var a = ar.slice(0,ar.length/2)
    var b = ar.splice(ar.length/2,ar.length)
    return {a:a,b:b};
}

function remove1(a) {
    var n = a[0];
    a.splice(0,1);
    return n
}

function arrayMerge(a,b){
    var tmp = [];
    while ((a.length + b.length) > 0) {
        if (a[0] >= b[0]) {
            tmp.push(remove1(b))
        }
        if (a[0] < b[0]) {
            tmp.push(remove1(a))
        }
        if ((a.length == 0) && (b.length == 0)  ) {
            return tmp;
        }
        if (a.length == 0) {
            tmp.push(remove1(b))
        }
        if (b.length == 0 && a.length > 0) {
            tmp.push(remove1(a))
            // Array.prototype.push.apply(tmp,a); // this assumes that A is sorted
        }
    }
    return tmp;
}

function shuffle(a){
    var tmp = [];
    while (a.length > 0) {
        var n = Math.floor(Math.random() * a.length);
        tmp.push(a[n]);
        a.splice(n,1);
    }
    return tmp;
}

function histogram(a){ //for human generated numbers
    var d = {};
    var max = Math.max.apply(null,a)
    var min = Math.min.apply(null,a)
    var delta = max - min;
    for (var j = 0; j < 10; j++) {
        for (var i = 0; i < a.length; i++) {
            // if ()
            // a[i]
        }
    }
}

function StatSort(){
    var dict = {};

}

function Heapify(){

}

function HeapSort(){

}

var ar = [];

var maxUses = 0;

var uses = 0;



function mergeSort(a) {
    if (a.length > 1) {
        var o = arraySplit(a)
        return arrayMerge(mergeSort(o.a),mergeSort(o.b));
    }
    else {
        return a;
    }
    console.error("hit the end.")
    return -1;
}
