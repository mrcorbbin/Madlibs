// phoneme generator
var thongs = [
    "EY",
    "IY",
    "AY",
    "OW",
    "UW",
    "EH",
    "IH",
    "AE",
    "AW",
    "AX",
    "UX",
    "AO",
    "AA",
    "UH"
]

// thongs = ["a","e","i","o","u","y","ei","ay","aw","au","ai","ea","ee","oo"];
// thongs = ["a","e","i","o","u","y","ei","ö","ï","ü","ő","é","í","á","ó","ú"];
// thongs = ["a","e","i","o","u","y"];
// thongs = ["a","e","i","o","u","y","e","ua","oy","á","ó","é","í","ú"];
thongs = ["oo","a","e","i","o","u","y","e","ua","oy","á","ó","é","í","ú","a","e","i","o","u","y","e","ua","oy","á","ó","é","í","ú"];
thongs = ["a","e","i","o","u","y","ä","ö","å","ej","ig","öj","aj","au"]
// thongs = ["a","e","i","o","u","y","ei","ay","aw","au","ai","ea","ee","oo","oa","oe","ia","io","iu","iou","uou"];


var dips = [
    "b",
    "C",
    "d",
    "D",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "p",
    "r",
    "s",
    "S",
    "t",
    "T",
    "v",
    "w",
    "z",
    "Z",
    "sk",
    "str",
    "st",
    "Tr",
    "dr",
    "gr",
    "pr",
    "Cr",
    "pl",
    "bl",
    "bl",
    "sp",
    "Sp",
    "gl",
    "sl",
    "Sl",
    "kl",
    "sm",
    "sn",
    "Sm",
    "Sm",
    "sw",

];

// dips = ["b","c","d","f","g","h","gh","ch","th","j","k","m","n","p","qu","r","s","sh","t","tr","str","sl","sm","sw","sn","sk","sp","z","pl","pr","gl","bl","gr","br"]
// dips = ["b","c","d","f","g","h","gh","ch","th","j","k","m","n","p","qu","r","s","sh","t","tr","str","sl","sm","sw","sn","sk","sp","z","pl","pr","gl","bl","gr","br"]
// dips = ["b","c","d","f","g","h","gh","ch","th","j","k","m","n","p","qu","r","s","sh","t","tr","str","sl","sm","sw","sn","sk","sp","z","pl","pr","gl","bl","gr","br"]
// dips = ["b","c","d","f","g","h","ch","j","k","m","n","p","qu","r","s","t","u","v","z"]
// dips = ["b","b","c","d","d","f","g","h","ch","j","j","m","n","m","n","m","n","p","qu","qu","r","rr","s","t","u","v","v","v","z","z"] // spanish
// dips = ["b","b","c","d","d","f","g","h","ch","j","j","l","ll","ll","m","n","m","n","ñ","m","n","p","qu","qu","r","rr","s","t","u","v","v","v","z","z","tl"] // spanish

dips = ["b","d","f","g","h","j","k","m","n","p","r","s","sj","t","tr","stj","sl","sm","sv","sn","sk","sp","pl","pr","gl","bl","gr","br","rd","rd","um","thur","et","en","i"]
// dips = ["b","d","f","g","h","j","k","m","n","p","r","s","sh","t","tr","st","sl","sm","sw","sn","sk","sp","pl","pr","gl","bl","gr","br","rd","rd","en","i"]

var endings = [
    "b",
    "C",
    "d",
    "D",
    "f",
    "g",
    "j",
    "k",
    "l",
    "m",
    "n",
    "p",
    "pIY",
    "r",
    "rIY",
    "s",
    "S",
    "t",
    "T",
    "v",
    "z",
    "Z",
    "sk",
    "st",
    "Dr",
    "dUXr",
    "gUXr",
    "pUXr",
    "CUXr",
    "pl",
    "bl",
    "bl",
    "sp",
    "Sp",
    "gl"
]

endings = ["b","c","d","f","g","h","gh","ch","th","j","k","m","n","p","qu","r","s","sh","t","tr","str","sl","sm","sw","sn","sk","sp","z","pl","pr","gl","bl","gr","br"]

// endings = ["n","nte","ng","ndo","ngo","nga","mo","nche","sas","nsa","nso","n","m","r","gue","que","tl"]
// endings = ["ning","era","nde","de","n","ll","nn","den","t","s","pp","j","d","m","mm","st","sp","ns","lls","ll","l","v","r","pp","tt","rt","rn","rm","rv","lm","mn","ck","ck","by"];

endings = ["ing","tion","er","es","s","t","st","ts","mbs","rs","ms","ps","tion","ing","er","ll","lls","pper","ew","tain","fore","ct","c","m","g","ck","lp","rf","pple","ffle","ggle","mmel","ttle","ddle","ssion","sion","sure","mmer","pper","ish","ant","ting"]

function randomItem(a){
    return a[Math.floor(Math.random()*a.length)];
}

function oneIn(n,fn){
    if (Math.random() * n < 1) {
        fn();
    }
}

var morphemes = [];

function generateMorpheme(){
    var s1 = "";
    oneIn(1.1,function() {
        s1 += randomItem(dips);
    })
    s1 += randomItem(thongs);

    var s2 = "";
    s2 += randomItem(thongs);
    oneIn(1.1,function() {
        s2 += randomItem(dips);
    })

    var s = randomItem([s1,s1,s1,s1,s2])

    if (Math.random() * 100 <  3) { //3% chance
        var r = Math.random() * 4 + 1;
        for (var i = 0; i < r; i++) {
            s += randomItem(dips);
            s += randomItem(thongs);
            // if (Math.random() * 100 < 50) {
            //     s += randomItem([1]);
            // }
        }
    }

    if (Math.random() * 100 <  25 && (!(s == s2))) { //25% chance
        s += randomItem(endings);
    }
    return s;
}

var words = [];

var verbs = [];
var adverbs = [];
var nouns = [];
var adjectives = [];
var prepositions = [];
var verbs = [];
var verbs = [];

function sentence(l){
    var tmp = [];
    for (var i = 0; i < l; i++) {
        var r = randomItem(words);
        r = (i == 0) ? r.charAt(0).toUpperCase() + r.slice(1) : r;
        tmp.push(r);
        oneIn(6,function(){
        if (!(i > l - 1)){
            tmp.push(",");
        }
        })
    }
    if (tmp.length > 0) {
        tmp[tmp.length-1] += ".";
    }
    return tmp.join(" ");
}

// function sentence(l){
//     var tmp = [];
//     for (var i = 0; i < l; i++) {
//         tmp.push(generateMorpheme());
//     }
//     tmp.push(".")
//     return tmp.join(" ");
// }

function paragraph(){
    var l = Math.random() * 8;
    var tmp = [];
    for (var i = 0; i < l; i++) {

        tmp.push(sentence(Math.random() * 17));

    }
    return tmp.join(" ");
}



function init(){

    for (var i = 0; i < 140; i++) {
        morphemes.push(generateMorpheme())
    }

    // endings= [];
    //
    // for (var i = 0; i < 30; i++) {
    //     endings.push((randomItem(morphemes).substr(0,4)));
    // }

    for (var i = 0; i < 16900; i++) {
        endings.push(randomItem(endings));
        thongs.push(randomItem(thongs));
        dips.push(randomItem(dips));
    }

    for (var i = 0; i < 7000; i++) {
        morphemes.push(randomItem(morphemes));
    }

    for (var i = 0; i < 800; i++) {
        var s = randomItem(morphemes);
        oneIn(7.5, function(){
            s+= randomItem(morphemes);
            oneIn(3, function(){
                s+= randomItem(morphemes);
            })
        })
        words.push(s);
    }

    for (var i = 0; i < 300000; i++) {
        words.push(randomItem(words));
    }
}


init();


console.log(paragraph(),"\n",paragraph(),"\n",paragraph(),"\n",paragraph(),"\n",paragraph(),"\n",paragraph(),"\n",paragraph(),"\n")
