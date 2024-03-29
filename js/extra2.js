
var letter_set = "spanish"

/*

How it works:


Step 1 - GENERATING WEIGHTS FOR PHONEMES

It takes an input of vowels and consonants and adds weights to each. The weights
are based on Pareto Principle and Zipf's law, much like the actual distribution
of language.


Step 2 - GENERATING MORPHEMES

It takes the weighted vowels and creates a list of morphemes. The morpheme rules
are taken from JSON that defines the chance of each letter appearing in the
beginning, middle and end of the morpheme.


Step 3 - GENERATING WORDS

Words are created from merging morphemes and given weights. Words are given
beginnings and ending to simulate real words.


Step 4 - GENERATING SENTENCES

Sentences are generated based on basic grammar rules. This is repeated to make
paragraphs.


*/

var VOWEL_SOUNDS = {
    "normal" : "a,e,i,o,u,y",
    "swedish" : "a,e,i,o,u,y,é,ä,ö,å,öj,ej,ig",
    "danish" : "a,e,i,o,u,y,æ,ø,å,øj,ej",
    "english" : "a,e,i,o,u,ey,ie,ee,oo,ea,oa,ou,ia,iu,au,ei,oi,oy",
    "spanish" : "a,e,i,o,u,ay,oy,uy,ua,ie,ia,au,io,iu,ue,uo,ui",
    "french" : "a,e,i,o,u,ay,oy,uy,ua,ie,ia,au,io,iu,ue,uo,ui,iu,eiu,eau,io,eo,œ,ê,ô",
    "finnish" : "a,e,i,o,u,y,ä,ü,ö,aa,ee,ii,oo,uu,yy,ää,üü,öö,äi,öi,ei,ui,yi,au,öy,ey,äy",
    "japanese" : "a,e,i,o,u,ei,ai",
    "russian" : "а,е,и,о,у,ы",
    "judoon" : "oe ",
    "kthongis" : "ang ,angtk ,arkt ,alfp ,amt ,arfpt ,arpt ,arp , atkt",
    "nugot" : "a,e,o,u,y,aa,ee,ii,oo,uu,yy"
}

var SECONDARY_VOWEL_SOUNDS = {
    "normal" : "a,e,i,o,u,y",
    "swedish" : "a,e,i,o,u,y,é,ä,ö,å,öj,ej,ig,aj",
    "danish" : "a,e,i,o,u,y,æ,ø,å,øj,ej,ig",
    "english" : "a,e,i,o,u,ey,ie,ee,oo,ea,oa,ou,ia,iu,au,ei,oi,oy",
    "french" : "a,e,i,o,u,ay,oy,uy,ua,ie,ia,au,io,iu,ue,uo,ui,iu,eiu,eau,eo,io,œ,ê,ô",
    "finnish" : "a,e,i,o,u,y,ä,ü,ö,aa,ee,ii,oo,uu,yy,ää,üü,öö,äi,öi,ei,ui,yi,au,öy,ey,äy",
    "spanish" : "a,e,i,o,u,ay,oy,uy,a,ie,ia,io,eo,uyo,ó,é,á,ú,í",
    "japanese" : "a,e,i,o,u,ei,ai",
    "russian" : "а,е,и,о,у,ы",
    "judoon" : "oe ",
    "kthongis" : "ang ,atk ,akt ,alp ,ampt ,arfpt ,arpt ,arp , athkt",
    "nugot" : "a,e,o,u,y,aa,ee,ii,oo,uu,yy"
}




var CONSONANT_START = {
    "normal" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z",
    "swedish" : "b,d,f,g,h,j,k,l,m,n,p,kv,r,s,t,v,x,st,stj,sj,sk,skr,tr,pr,kr,vr,dr,br,fr,gr,hj,pl,fl,gl,kl,bl,mn,tj,lj,dj,fj,pj,mj,vj,str,sv,sl,sm,sp,spl,spr,str,fn",
    "danish" : "b,d,f,g,h,j,k,l,m,n,p,kv,r,s,t,v,x,st,stj,sj,sk,skr,tr,pr,kr,vr,dr,br,fr,gr,hj,pl,fl,gl,kl,bl,mn,tj,lj,dj,fj,pj,mj,vj,str,ck,sv,sl,sm,sp,spl,spr,str",
    "english" : "b,c,d,f,g,h,j,k,l,m,n,p,qu,r,s,t,v,w,st,sk,skr,tr,pr,cr,wr,dr,br,fr,gr,pl,fl,gl,cl,bl,str,sl,sm,sp,spl,spr,str,chr,bl,dw,gn,kn,ph,pn,ps,pt,rh,sw,th,tw,thr,wr,wh,pt",
    "french" : "b,c,d,f,g,h,j,k,l,m,n,p,qu,r,s,t,v,w,st,tr,pr,cr,vr,dr,br,fr,gr,pl,fl,gl,cl,bl,sm,sp",
    "finnish" : "m,p,b,f,v,n,t,d,s,l,r,j,k,g",
    "spanish" : "b,c,d,f,g,h,j,l,m,n,p,qu,r,s,t,v,z,bl,br,ch,cr,dr,fl,fr,gl,gr,ll,pr,pl,est,estr,tr,tl,esp,gu,cu,su",
    "japanese" : "b,d,g,h,j,k,ch,m,n,p,r,s,sh,t,ts,w,z",
    "russian" : "б,ц,д,ф,г,ч,й,к,л,м,н,п,я,р,с,т,в,ш,х,з,ж,ь,ъ,сптк,дк,дж,др,дп,тп,пт,всп,ст,вк,вр,кп",
    "judoon" : "t,p,r,m,f,k,s,n",
    "kthongis" : "c,f,h,j,k,l,m,n,p,qu,r,s,t,st,tr,pr,cr,dr,br,fr,gr,pl,fl,gl,cl,bl,sm,sp,kth,rtk,ft,pt,xk,x,ch,tl,lp,pl,ts,skt,tks,skt,pst,pts,tps,tsp",
    "nugot" : "m,n,b,d,g,l,z,v,j",
}

var CONSONANT_MID = {
    "normal" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z",
    "swedish" : "b,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,x,pp,nn,mm,lm,rn,rm,lp,ln,ll,rr,tt,dd,ck,sk,sp,lk,gg,ss,bb,ff,nd,rk,rg,rs,rt,rl,rp,ng,rv,rm,mp,rp,lv",
    "danish" : "b,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,x,pp,nn,mm,lm,rn,rm,lp,ln,ll,rr,tt,dd,ck,sk,sp,lk,gg,ss,bb,ff,nd,rk,rg,rs,rt,rl,rp,ng,",
    "english" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z,bb,ck,dd,gg,ch,ll,mm,nn,pp,rr,ss,tt,zz,str,st,sl,sm,sn,sp,spr,spl,sh,sk,ph,pl,pr,pt,gr,gl,lg,rg,tr,rt,lp,lm,ln,lt,ld,lf,nd,nt,mpt,th,ch,rn,rp,rf,rd,tch,pt,rst,der,rve,lve,rf,rl,pt",
    "french" : "b,c,d,f,g,h,j,k,l,m,n,p,qu,r,s,t,v,w,st,tr,pr,cr,vr,dr,br,fr,gr,pl,fl,gl,cl,bl,sm,sp,ll,gu,cu",
    "finnish" : "m,p,b,f,v,n,t,d,s,l,r,j,k,g,mm,pp,bb,ff,vv,nn,tt,dd,ss,ll,rr,kk,gg,nt,lt,rt,rp,mp",
    "spanish" : "b,c,d,f,g,h,j,l,m,n,ñ,p,qu,r,s,t,v,z,bl,br,ch,cr,cc,nn,pp,ld,lv,lz,ll,p,rr,rd,rg,rc,rs,rp,rm,rl,rt,rv,rn,rqu,rc",
    "japanese" : "b,d,g,h,j,k,ch,m,n,p,r,s,sh,t,ts,w,z,-",
    "russian" : "б,ц,д,ф,г,ч,й,к,л,м,н,п,я,р,с,т,в,ш,х,з,ж,ь,ъ",
    "judoon" : "t,p,r,m,f,k,s,n",
    "kthongis" : "c,f,h,j,k,l,m,n,p,qu,r,s,t,st,tr,pr,cr,dr,br,fr,gr,pl,fl,gl,cl,bl,sm,sp,kth,rtk,ft,pt,xk,x,ch,tl,lp,pl,ts,skt,tks,skt,pst,pts,tps,tsp",
    "nugot" : "m,n,b,d,g,l,z,v,j",

}

var CONSONANT_END = {
    "normal" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z",
    "swedish" : "b,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,x,pp,nn,mm,lm,rn,rm,lp,ln,ll,rr,tt,dd,ck,sk,sp,lk,gg,ss,bb,ff,nd,rk,is,rv,lv,",
    "danish" : "b,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,x,pp,nn,mm,lm,rn,rm,lp,ln,ll,rr,tt,dd,ck,sk,sp,lk,gg,ss,bb,ff,nd,rk,is",
    "english" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z,ck,ch,ll,r,ss,ng,ing,tion,st,rt,rld,lp,lm,ln,rln,rn,rs,rp,rd,ld,ls,th,sh,rk,rst,fy,ly,mb,ft,ght,le,ler,some,ial,rsh,rth,rch,pt",
    "french" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z,bb,ck,dd,ch,ll,r,ss,tt,ng,ing,tion,st,rt,rld,lp,lm,ln,rln,rn,rs,rp,rd,ld,ls,th,sh,rk,rst,fy,ly,mb,ft,ght,le,ler,some,ial",
    "finnish" : "m,p,b,f,v,n,t,d,s,l,r,j,k,g,ng,nt,lt,rt",
    "spanish" : "b,c,d,f,g,h,j,l,m,n,p,qu,r,s,t,v,z,ste,nde,ndo,nd,nda,lp",
    "japanese" : "b,d,g,h,j,k,ch,m,n,p,r,s,sh,t,ts,w,z",
    "russian" : "б,ц,д,ф,г,ч,й,к,л,м,н,п,я,р,с,т,в,ш,х,з,ж,ь,ъ",
    "judoon" : "t,p,r,m,f,k,s,n",
    "kthongis" : "c,f,h,j,k,l,m,n,p,qu,r,s,t,st,tr,pr,cr,dr,br,fr,gr,pl,fl,gl,cl,bl,sm,sp,kth,rtk,ft,pt,xk,x,ch,tl,lp,pl,ts,skt,tks,skt,pst,pts,tps,tsp",
    "nugot" : "p,k,f,t,s,x,k,lp,lt,rl,r,t,lk,rt,ft,lf,st,rf,rp"
}

var morpheme_rules = {
	spanish : {
		"quu" : "que",
		"qua" : "ca",
		"cuu" : "cu"
	}
}

var settings = {

    start_chance : 1.39,
    ending_chance : 1.13,
    secondary_phoneme_chance : 8,
    tertiary_phoneme_chance : 18,
    quaternary_phoneme_chance : 193,
    adverb_chance : 5,
    vowel_ending_chance : 2,
    // ending_chance : .2
    // secondary_morpheme_chance : 1
}


function Set(s,_delim,_nosplit){
    this.cache = {};
    this.items = [];
    if (!_nosplit) {
        var a = s.split(_delim?_delim:",");
    }
    else {
        a = s;
    }
    for (var i = 0; i < a.length; i++) {
        if (!(a[i] in this.cache) && !(a[i][0] instanceof Set)) {
            this.items.push([a[i],1]);
            this.cache[a[i]] = this.items.length;
        }
        else if (a[i][0] instanceof Set) {
            this.items.push([a[i],1]);
        }
        else {
            if (this.items[this.cache[a[i]]]) {
                this.items[this.cache[a[i]]][1] += 0.01
            }
        }
    }
    this.weight = this.items.length;
}

Set.prototype.getRandom = function () {
    return this.items[this.w_rand()][0];
};

Set.prototype.add = function(idx) {
    this.items[idx][1] += 1;
    this.weight++;
};

Set.prototype.shuffle = function () {
    var tmp = [];
    while (this.items.length > 0) {
        var r = Math.floor(Math.random() * this.items.length);
        tmp.push(this.items[r]);
        this.items.splice(r,1);
    }
    this.items = tmp;
};

Set.prototype.scale = function(size) {
    this.shuffle();
    var offset = (Math.random() * 30) >> 0;
    var start = (Math.random() * 1000000);
    this.weight = 0;
    for (var i = 0; i < this.items.length; i++) {
        this.items[i][1] = start / (i + offset);
        this.weight += this.items[i][1];
    }
    this.setProportion();
}

// +function helloWorld() {
//     return "";
// }

// Set.prototype.scale = function(size) {
//     for (var i = 0; i < size; i++) {
//         this.add(this.w_rand());
//     }
//     this.setProportion();
//     this.items.sort(function(a,b){
//         return (b[1] - a[1]);
//     })
// }

Set.prototype.setProportion = function(){
    for (var i = 0; i < this.items.length; i++) {
        this.items[i][2] = ((this.items[i][1] / this.weight) * 100).toFixed(4) + "%";
    }
}

Set.prototype.w_rand = function() {
    var sum = 0;
    var r = Math.random();
    for (var i = 0; i < this.items.length; i++) {
        sum += this.items[i][1];
        if (r < (sum / this.weight)) {
            return i;
        }
    }
    return 0

}

function oneIn(n,fn,_fn){
    if (Math.random() * n < 1) {
        fn();
    }
    else {
        if (_fn){
            _fn()
        }
    }
}



var vowels = new Set(VOWEL_SOUNDS[letter_set]);
var vowels_secondary = new Set(SECONDARY_VOWEL_SOUNDS[letter_set]);
var consonants = new Set(CONSONANT_START[letter_set]);
var consonants_mid = new Set(CONSONANT_MID[letter_set]);
var consonants_end = new Set(CONSONANT_END[letter_set]);

soften(consonants,1)
soften(consonants_end,1)
soften(consonants_mid,1)

function soften(__set__,amt){
    var items = __set__.items;
    for (var i = 0; i < items.length; i++) {
        if ("bdfgkjcxmn".indexOf(items[i][0]) > -1) {
            __set__.items[i][1] *= amt;
        }
    }
}

var morphemes = null;
var verb_morphemes = null;
var noun_morphemes = null;

var verb_ending_morphemes = null;
var verb_secondary_morphemes = null;
var noun_secondary_morphemes = null;

var verbs = null;
var nouns = null;
var adjectives = null;
var adverbs = null;
var adverbs = null;
var prepositions = null;
var structures = null;

var words = null;

// INDO-European word settings

// var settings = {
//     start_chance : 2,
//     ending_chance : 7,
//     secondary_phoneme_chance : 50,
//     tertiary_phoneme_chance : 16,
//     quaternary_phoneme_chance : 32,
//     adverb_chance : 3,
//     secondary_morpheme_chance : 1.3
// }




function morpheme(){
    var s = "";

    function addEnding(){
        s += consonants_end.getRandom();
        oneIn(settings.vowel_ending_chance,function(){
            s += vowels.getRandom();
        })
    }

    oneIn(settings.start_chance,function() {
        s += consonants.getRandom();
    })
    s += vowels.getRandom();
    oneIn(settings.secondary_phoneme_chance,function(){
        s += consonants_mid.getRandom();
        s += vowels_secondary.getRandom();
        oneIn(settings.tertiary_phoneme_chance,function(){
            s += consonants_mid.getRandom();
            s += vowels_secondary.getRandom();
            oneIn(settings.quaternary_phoneme_chance,function(){
                s += consonants_mid.getRandom();
                s += vowels_secondary.getRandom();
            },addEnding)
        },addEnding)
    })

    oneIn(4,function(){
        s += consonants_mid.getRandom();
        s += vowels_secondary.getRandom();
        oneIn(settings.tertiary_phoneme_chance,function(){
            s += consonants_mid.getRandom();
            s += vowels_secondary.getRandom();
        },addEnding)
    })

    oneIn(settings.ending_chance,addEnding)
    return s;
}

function generateMorphemes(l) {
    var tmp = [];
    for (var i = 0; i < l; i++) {
        tmp.push(morpheme());
    }
    return new Set(tmp.join(","));
}

function generateWordSet(__set__,l,_secondary_morphemes){
    var tmp = [];
    for (var i = 0; i < l; i++) {
        var s = __set__.getRandom();
        oneIn(settings.secondary_morpheme_chance,function(){
            if (_secondary_morphemes) {
                s += _secondary_morphemes.getRandom();
            }
            else {
                s += __set__.getRandom();
            }
        })
        tmp.push(s);
    }
    return new Set(tmp.join(","));
}

function generateWordFromMorphemeSets(a){

}

function generateAll(a,_joiner) {
    var tmp = [];
    for (var i = 0; i < a.length; i++) {
        tmp.push(a[i].getRandom());
    }
    var s
    if (_joiner === "") {
        s = tmp.join((_joiner));
    }
    else {
        s = tmp.join((" "));
    }
    return s;
}

function printReadout(__set__) {
    var tmp = [];
    for (var i = 0; i < __set__.items.length; i++) {
        tmp.push(__set__.items[i][0] + "\t" + __set__.items[i][1] + "\t" + __set__.items[i][2] + "\n");
    }
    console.log(tmp.join(""));

}

function init2(){

    vowels.scale();
    vowels_secondary.scale();
    consonants.scale();
    consonants_mid.scale();
    consonants_end.scale();

    morphemes = generateMorphemes(1400);
    morphemes.scale()

    verb_morphemes = generateMorphemes(1000);
    noun_morphemes = generateMorphemes(1000);

    verb_secondary_morphemes = generateMorphemes(100);
    verb_ending_morphemes = generateMorphemes(100);
    noun_secondary_morphemes = generateMorphemes(100);

    verb_morphemes.scale(300000)
    verb_ending_morphemes.scale(300000)
    noun_morphemes.scale(300000)

    verb_secondary_morphemes.scale(30000)
    noun_secondary_morphemes.scale(30000)

    nouns = generateWordSet(noun_morphemes,5030,noun_secondary_morphemes);
    nouns.scale()

    prepositions = generateWordSet(verb_morphemes,303);
    prepositions.scale(30000)

    verbs = generateWordSet(verb_morphemes,8000,verb_secondary_morphemes);
    // var verb_s = [];

    for (var i = 0; i < 100; i++) {
        // verb_s.push(generateAll([verb_morphemes,verb_secondary_morphemes,verb_ending_morphemes],""))
    }

    // verbs = new Set(verb_s, "", true);

    verbs.scale(100000)

    adverbs = generateWordSet(morphemes,300);
    adverbs.scale(100000)

    adjectives = generateWordSet(morphemes,10004);
    adjectives.scale(10000)

	conjunctions = generateWordSet(morphemes,7);
	conjunctions.scale(1000)




    // printReadout(morphemes);
    // printReadout(consonants);
    // printReadout(consonants_mid);
    // printReadout(consonants_end);
    // printReadout(consonants_morphemes);


    structures = [
        [nouns, verbs, nouns],
        [nouns, verbs, adjectives, nouns],
        [nouns, verbs, adjectives, nouns],
        [adjectives, nouns, adverbs, verbs, nouns],
        [adjectives, nouns, verbs, adverbs, adjectives, nouns],
        [nouns, verbs, adverbs, verbs],
        [adverbs, nouns, verbs],
        [nouns, prepositions ,nouns, verbs],
        [nouns, verbs, prepositions, conjunctions, nouns, verbs],
        [morphemes, adjectives, nouns, verbs, prepositions, morphemes, prepositions, nouns, adverbs, verbs],

    ]

    words = new Set(structures,"m",true);
    words.scale(1400)

}

var LIB = {
    verb_ending_morphemes : {
        set : null,
        size : 39,
        scale : 4910,
    },
    noun_morphemes : {
        set : null,
        size : 401,
        scale : 30109
    },
    noun_endings : {
        set: null,
        size : 35,
        scale : 3941
    },
    verb_morphemes : {
        set : null,
        size : 91,
        scale : 30030
    }
}

function init_roots() {

}

function generateParagraph(l) {
    var tmp = [];
    for (var i = 0; i < l; i++) {
        s = generateAll(words.getRandom());
        oneIn(1.7,function(){
            s += ", " +generateAll(words.getRandom());
        })
        oneIn(3,function(){
            s += ", " +generateAll(words.getRandom());
        })
        s=s.charAt(0).toUpperCase() + s.slice(1);
        tmp.push(s);


    }
    return tmp.join(" . ");
}

init2()

console.log(generateParagraph(3))
console.log(generateParagraph(10))
console.log("vowels",vowels.items);
console.log("consonants",consonants);
console.log("consonants",consonants_mid);
console.log(consonants_end);
















//
