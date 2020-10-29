var letter_set = "english"

var VOWEL_SOUNDS = {
    "normal" : "a,e,i,o,u,y",
    "swedish" : "a,e,i,o,u,y,é,ä,ö,å,öj,ej,ig",
    "danish" : "a,e,i,o,u,y,æ,ø,å,øj,ej",
    // "english" : "a,e,i,o,u,ey",
    "english" : "a,e,i,o,u,ey,ie,ee,oo,ea,oa,ou,ia,iu,au,ei,oi,oy",
    "spanish" : "a,e,i,o,u,ay,oy,uy,ua,ie,ia,au,io,iu,ue,uo,ui",
    "french" : "a,e,i,o,u,ay,oy,uy,ua,ie,ia,au,io,iu,ue,uo,ui,iu,eiu,eau,io,eo,œ,ê,ô",
    "finnish" : "a,e,i,o,u,y,ä,ü,ö,aa,ee,ii,oo,uu,yy,ää,üü,öö,äi,öi,ei,ui,yi,au,öy,ey,äy",
    "japanese" : "a,e,i,o,u,ei,ai",
    "russian" : "а,е,и,о,у,ы",
    "judoon" : "oe ",
    "kthongis" : "ang ,atk ,akt ,alp ,ampt ,arfpt ,arpt ,arp , athkt"

}

var SECONDARY_VOWEL_SOUNDS = {
    "normal" : "a,e,i,o,u,y",
    "swedish" : "a,e,i,o,u,y,é,ä,ö,å,öj,ej,ig,aj",
    "danish" : "a,e,i,o,u,y,æ,ø,å,øj,ej,ig",
    "english" : "a,e,i,o,u,ey,ie,ee,oo,ea,oa,ou,ia,iu,au,ei,oi,oy",
    "french" : "a,e,i,o,u,ay,oy,uy,ua,ie,ia,au,io,iu,ue,uo,ui,iu,eiu,eau,eo,io,œ,ê,ô",
    "finnish" : "a,e,i,o,u,y,ä,ü,ö,aa,ee,ii,oo,uu,yy,ää,üü,öö,äi,öi,ei,ui,yi,au,öy,ey,äy",
    "spanish" : "a,e,i,o,u,ay,oy,uy,ua,ie,ia,au,io,iu,ue,uo,ui",
    "japanese" : "a,e,i,o,u,ei,ai",
    "russian" : "а,е,и,о,у,ы",
    "judoon" : "oe ",
    "kthongis" : "ang ,atk ,akt ,alp ,ampt ,arfpt ,arpt ,arp , athkt"
}




var CONSONANT_START = {
    "normal" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z",
    "swedish" : "b,d,f,g,h,j,k,l,m,n,p,kv,r,s,t,v,x,st,stj,sj,sk,skr,tr,pr,kr,vr,dr,br,fr,gr,hj,pl,fl,gl,kl,bl,mn,tj,lj,dj,fj,pj,mj,vj,str,sv,sl,sm,sp,spl,spr,str",
    "danish" : "b,d,f,g,h,j,k,l,m,n,p,kv,r,s,t,v,x,st,stj,sj,sk,skr,tr,pr,kr,vr,dr,br,fr,gr,hj,pl,fl,gl,kl,bl,mn,tj,lj,dj,fj,pj,mj,vj,str,ck,sv,sl,sm,sp,spl,spr,str",
    "english" : "b,c,d,f,g,h,j,k,l,m,n,p,qu,r,s,t,v,w,st,sk,skr,tr,pr,cr,wr,dr,br,fr,gr,pl,fl,gl,cl,bl,str,sl,sm,sp,spl,spr,str,chr,bl,dw,gn,kn,ph,pn,ps,pt,rh,sw,th,tw,thr,wr,wh",
    "french" : "b,c,d,f,g,h,j,k,l,m,n,p,qu,r,s,t,v,w,st,tr,pr,cr,vr,dr,br,fr,gr,pl,fl,gl,cl,bl,sm,sp",
    "finnish" : "m,p,b,f,v,n,t,d,s,l,r,j,k,g",
    "spanish" : "b,c,d,f,g,h,j,l,m,n,p,qu,r,s,t,v,x,z,bl,br,ch,cr,dr,fl,fr,ff,gl,gr,ll,pr,pl,est,tr,tl",
    "japanese" : "b,d,g,h,j,k,ch,m,n,p,r,s,sh,t,ts,w,z",
    "russian" : "б,ц,д,ф,г,ч,й,к,л,м,н,п,я,р,с,т,в,ш,х,з,ж,ь,ъ,сптк,дк,дж,др,дп,тп,пт,всп,ст,вк,вр,кп",
    "judoon" : "t,p,r,m,f,k,s,n",
    "kthongis" : "c,f,h,j,k,l,m,n,p,qu,r,s,t,st,tr,pr,cr,dr,br,fr,gr,pl,fl,gl,cl,bl,sm,sp,kth,rtk,ft,pt,xk,x,ch,tl,lp,pl,ts,skt,tks,skt,pst,pts,tps,tsp"
}

var CONSONANT_MID = {
    "normal" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z",
    "swedish" : "b,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,x,pp,nn,mm,lm,rn,rm,lp,ln,ll,rr,tt,dd,ck,sk,sp,lk,gg,ss,bb,ff,nd,rk,rg,rs,rt,rl,rp,ng,rv,rm,mp,rp,lv",
    "danish" : "b,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,x,pp,nn,mm,lm,rn,rm,lp,ln,ll,rr,tt,dd,ck,sk,sp,lk,gg,ss,bb,ff,nd,rk,rg,rs,rt,rl,rp,ng,",
    "english" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z,bb,ck,dd,gg,ch,ll,mm,nn,pp,rr,ss,tt,zz,str,st,sl,sm,sn,sp,spr,spl,sh,sk,ph,pl,pr,pt,gr,gl,lg,rg,tr,rt,lp,lm,ln,lt,ld,lf,nd,nt,mpt,th,ch,rn,rp,rf,rd,tch,pt,rst,der,rve,lve,rf,rl",
    "french" : "b,c,d,f,g,h,j,k,l,m,n,p,qu,r,s,t,v,w,st,tr,pr,cr,vr,dr,br,fr,gr,pl,fl,gl,cl,bl,sm,sp",
    "finnish" : "m,p,b,f,v,n,t,d,s,l,r,j,k,g,mm,pp,bb,ff,vv,nn,tt,dd,ss,ll,rr,kk,gg,nt,lt,rt,rp,mp",
    "spanish" : "b,c,d,f,g,h,j,l,m,n,ñ,p,qu,r,s,t,v,x,z,bl,br,ch,cr,cc,nn,pp,ld,lv,lz,ll,p,rr,rd,rg,rc,rs,rp,rm,rl,rt,rv,rn,rqu",
    "japanese" : "b,d,g,h,j,k,ch,m,n,p,r,s,sh,t,ts,w,z,-",
    "russian" : "б,ц,д,ф,г,ч,й,к,л,м,н,п,я,р,с,т,в,ш,х,з,ж,ь,ъ",
    "judoon" : "t,p,r,m,f,k,s,n",
    "kthongis" : "c,f,h,j,k,l,m,n,p,qu,r,s,t,st,tr,pr,cr,dr,br,fr,gr,pl,fl,gl,cl,bl,sm,sp,kth,rtk,ft,pt,xk,x,ch,tl,lp,pl,ts,skt,tks,skt,pst,pts,tps,tsp"

}

var CONSONANT_END = {
    "normal" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z",
    "swedish" : "b,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,x,pp,nn,mm,lm,rn,rm,lp,ln,ll,rr,tt,dd,ck,sk,sp,lk,gg,ss,bb,ff,nd,rk,is,rv,lv,",
    "danish" : "b,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,x,pp,nn,mm,lm,rn,rm,lp,ln,ll,rr,tt,dd,ck,sk,sp,lk,gg,ss,bb,ff,nd,rk,is",
    "english" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z,ck,ch,ll,r,ss,ng,ing,tion,st,rt,rld,lp,lm,ln,rln,rn,rs,rp,rd,ld,ls,th,sh,rk,rst,fy,ly,mb,ft,ght,le,ler,some,ial,rsh,rth,rch",
    "french" : "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,z,bb,ck,dd,ch,ll,r,ss,tt,ng,ing,tion,st,rt,rld,lp,lm,ln,rln,rn,rs,rp,rd,ld,ls,th,sh,rk,rst,fy,ly,mb,ft,ght,le,ler,some,ial",
    "finnish" : "m,p,b,f,v,n,t,d,s,l,r,j,k,g,ng,nt,lt,rt",
    "spanish" : "b,c,d,f,g,h,j,l,m,n,p,qu,r,s,t,v,x,z,ste,nde,ndo,nd,nda,lp",
    "japanese" : "b,d,g,h,j,k,ch,m,n,p,r,s,sh,t,ts,w,z",
    "russian" : "б,ц,д,ф,г,ч,й,к,л,м,н,п,я,р,с,т,в,ш,х,з,ж,ь,ъ",
    "judoon" : "t,p,r,m,f,k,s,n",
    "kthongis" : "c,f,h,j,k,l,m,n,p,qu,r,s,t,st,tr,pr,cr,dr,br,fr,gr,pl,fl,gl,cl,bl,sm,sp,kth,rtk,ft,pt,xk,x,ch,tl,lp,pl,ts,skt,tks,skt,pst,pts,tps,tsp"
}


// the hierarchical object oriented version

function countType(a,type){
    return a.reduce(function(accum,value,idx,src){
        if (src[i].type == type) {
            return accum + value;
        }
    })
}

function Collection(){
    this.items = [];
    this.netweight = 0;
    this.cache = {};
}

Collection.prototype.add = function(o){
    if (!(o.value in this.cache)) {
        this.cache[o.value] = o;
        o.id = (this.items.length + 0);
        this.items.push(o);
        this.netweight += o.weight;
    }
}

Collection.prototype.addWeight = function(o,amt){
    if (o in this.cache) {
        this.cache[o.value].weight += amt;
    }
    else {
        console.error(o.value + " not found");
    }
}

Collection.prototype.__defineGetter__("length",function(){
    return this.items.length;
})

Collection.prototype.shuffle = function () {
    var tmp = [];
    while (this.items.length > 0) {
        var r = Math.floor(Math.random() * this.items.length);
        tmp.push(this.items[r]);
        this.items.splice(r,1);
    }
    console.log(this.items)
    this.items = tmp;
};

Collection.prototype.getItemValues = function(){
    return this.items.map(function(v,i,a){
        return v.value;
    })
}

Collection.prototype.randomItem = function (){
    return this.items[(Math.random() * this.items.length) >> 0];
}

Collection.prototype.w_rand = function (){
    var r = Math.random();
    var c_weight = 0;
    for (var i = 0; i < this.items.length; i++) {
        c_weight += this.items[i].weight;
        if ((c_weight / this.netweight) > r) {
            return this.items[i];
        }
    }
    console.error("nothing chosen");
    return false;

}

Collection.prototype.addAllophones = function(s,type){
    var a = s.split(",");
    for (var i = 0; i < a.length; i++) {
        var allo = new Allophone(a[i],type);
        allo.parent = this;
        this.add(allo);
    }
}

var ALLOPHONES = new Collection();

function CollectionItem(){
    this.id = null;
    this.weight = 1;
    this.parent = null;
}

CollectionItem.prototype.addWeight = function(amt){
    this.weight+=amt;
    this.parent.netweight += amt;
}

function Allophone(s,type,parent,_initfn) {
    CollectionItem.call(this);
    this.value = s;
    this.type = type;
    this.parent = parent
    // function construc() {
    //
    // }
    // (_initfn || construc).call(this);
    ALLOPHONES.add(this);
}
Allophone.prototype = Object.create(CollectionItem.prototype);

function Phoneme(__collection__,parent){
    CollectionItem.call(this,s,type);
    this.items = __collection__ || new Collection();
    var a = __collection__.items;
    this.vowels = countType(a,"vowel");
    this.consonants = countType(a,"consonant");
    this.weight = 1;
    this.parent = parent;
}
Phoneme.prototype = Object.create(CollectionItem.prototype);

Phoneme.prototype.__defineGetter__("value",function(){
    return this.items.reduce(function(acc,v){
        return acc+v.value;
    })
})

function extra3init(){
    ALLOPHONES.addAllophones(VOWEL_SOUNDS[letter_set],"vowel");
    ALLOPHONES.addAllophones(CONSONANT_START[letter_set],"consonants");
    
}

extra3init()


















///
