
var letter_set = "english"

var VOWEL_SOUNDS = {
    "normal" : "a,e,i,o,u,y",
    "swedish" : "a,e,i,o,u,y,é,ä,ö,å,öj,ej,ig",
    "english" : "a,e,i,o,u,ey,ie,ee,oo,ea,oa,ou,ia,iu,au,ei,oi,oy",
    "spanish" : "a,e,i,o,u,ay,oy,uy,ua,ie,ia,au,io,iu,ue,uo,ui",
    "japanese" : "a,e,i,o,u,ei,ai",
}

var CONSONANT_START = {
    "normal" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z",
    "swedish" : "b,d,f,g,h,j,k,l,m,n,p,kv,r,s,t,v,x,st,stj,sj,sk,skr,tr,pr,kr,vr,dr,br,fr,gr,hj,pl,fl,gl,kl,bl,mn,tj,lj,dj,fj,pj,mj,vj,str,ck,sv,sl,sm,sp,spl,spr,str",
    "english" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z",
    "spanish" : "b,c,d,f,g,h,j,l,m,n,p,qu,r,s,t,v,x,z,bl,br,ch,cr,dr,fl,fr,ff,gl,gr,ll,pr,pl,est,tr,tl",
    "japanese" : "",
}

var CONSONANT_MID = {
    "normal" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z",
    "swedish" : "b,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,x,pp,nn,mm,lm,rn,rm,lp,ln,ll,rr,tt,dd,ck,sk,sp,lk,gg,ss,bb,ff,nd,rk,rg,rs,rt,rl,rp,ng,",
    "english" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z,bb,ck,dd,gg,ch,ll,mm,nn,pp,rr,ss,tt,zz,str,st,sl,sm,sn,sp,spr,spl,sh,sk,ph,pl,pr,pt,gr,gl,lg,rg,tr,rt,lp,lm,ln,lt,ld,lf,nd,nt,mpt,th,ch,rn,rp,rf,rd,tch,pt",
    "spanish" : "b,c,d,f,g,h,j,l,m,n,ñ,p,qu,r,s,t,v,x,z,bl,br,ch,cr,cc,nn,pp,ld,lv,lz,ll,p,rr,rd,rg,rc,rs,rp,rm,rl,rt,rv,rn,rqu",
    "japanese" : "a,e,i,o,u,y,ay,oy,uy,ua,ie,ia,au,io,iu,ue,uo,ui",
}

var CONSONANT_END = {
    "normal" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z",
    "swedish" : "b,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,x,pp,nn,mm,lm,rn,rm,lp,ln,ll,rr,tt,dd,ck,sk,sp,lk,gg,ss,bb,ff,nd,rk,is",
    "english" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z,bb,ck,dd,gg,ch,ll,r,ss,tt,zz,ng,ing,tion,st,rt,rld,lp,lm,ln,rln,rn,rs,rp,rd,ld,ls,th,sh,rk",
    "spanish" : "b,c,d,f,g,h,j,l,m,ñ,n,p,qu,r,s,t,v,x,z,ste,nde,ndo,nd,nda,lp",
    "japanese" : "a,e,i,o,u,y,ay,oy,uy,ua,ie,ia,au,io,iu,ue,uo,ui",
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
        this.items.push([a[i],1]);
        this.cache[a[i]] = i;
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

Set.prototype.scale = function(size) {
    for (var i = 0; i < size; i++) {
        this.add(this.w_rand());
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
var vowels_secondary = new Set(VOWEL_SOUNDS[letter_set]);
var consonants = new Set(CONSONANT_START[letter_set]);
var consonants_mid = new Set(CONSONANT_MID[letter_set]);
var consonants_end = new Set(CONSONANT_END[letter_set]);

var morphemes = null;
var verb_morphemes = null;
var noun_morphemes = null;

var verbs = null;
var nouns = null;
var adjectives = null;
var adverbs = null;
var adverbs = null;
var structures = null;

var words = null;

var settings = {
    start_chance : 2,
    ending_chance : 9,
    secondary_phoneme_chance : 10,
    tertiary_phoneme_chance : 16,
    quaternary_phoneme_chance : 32,
    adverb_chance : 3,
    secondary_morpheme_chance : 1.3
}



function morpheme(){
    var s = "";

    function addEnding(){
        s += consonants_end.getRandom();
        oneIn(6,function(){
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

    oneIn(2,addEnding)
    return s;
}

function generateMorphemes(l) {
    var tmp = [];
    for (var i = 0; i < l; i++) {
        tmp.push(morpheme());
    }
    return new Set(tmp.join(","));
}

function generateWordSet(__set__,l){
    var tmp = [];
    for (var i = 0; i < l; i++) {
        var s = __set__.getRandom();
        oneIn(settings.secondary_morpheme_chance,function(){
            s += __set__.getRandom();
        })
        tmp.push(s);
    }
    return new Set(tmp.join(","));
}

function generateAll(a) {
    var tmp = [];
    for (var i = 0; i < a.length; i++) {
        tmp.push(a[i].getRandom());
    }
    return tmp.join(" ");
}

function init(){
    vowels.scale(30000);
    vowels_secondary.scale(30000);
    consonants.scale(75000);
    consonants_mid.scale(70500);
    consonants_end.scale(40000);
    morphemes = generateMorphemes(400);
    verb_morphemes = generateMorphemes(200);
    noun_morphemes = generateMorphemes(200);
    morphemes.scale(1000000)
    verb_morphemes.scale(1000000)
    noun_morphemes.scale(1000000)
    nouns = generateWordSet(verb_morphemes,2300);
    nouns.scale(300000)
    verbs = generateWordSet(verb_morphemes,1200);
    verbs.scale(100000)
    adverbs = generateWordSet(morphemes,500);
    adverbs.scale(100000)
    adjectives = generateWordSet(morphemes,1000);
    adjectives.scale(10000)

    structures = [
        [nouns, verbs, nouns],
        [nouns, verbs, adjectives, nouns],
        [nouns, verbs, adjectives, nouns],
        [adjectives, nouns, adverbs, verbs, nouns],
        [adjectives, nouns, verbs, adverbs, adjectives, nouns],
        [nouns, verbs, adverbs, verbs],
        [adverbs, nouns, verbs]
    ]

    words = new Set(structures,"m",true);
    words.scale(1400)

}


function generateParagraph(l) {
    var tmp = [];
    for (var i = 0; i < l; i++) {
        s = generateAll(words.getRandom());
        oneIn(1.7,function(){
            s += ", " +generateAll(words.getRandom());
        })
        tmp.push(s);


    }
    return tmp.join(". ");
}


init()


console.log(generateParagraph(7))





















//
