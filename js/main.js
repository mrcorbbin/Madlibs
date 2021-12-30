/*


MadLib Sentence
¬ Mustache
¬ JSON


*/

var sentences = [
    {
        content : "I decided to go to the _0_, where I _1_ some _2_ _3_",
        blanks : [
            {type:"noun",id:0},
            {type:"verb",id:1},
            {type:"adjective",id:2},
            {type:"noun",id:3}
        ]
    },
    {
        content : `

The President regularly takes _0_ and uses it to _1_ _2_, and also _1_ his _3_.
This process is politically called _4_-_5_.

        `,
        blanks : [
            {type:"noun",id:0},
            {type:"inf. verb",id:1},
            {type:"plural noun",id:2},
            {type:"noun",id:3},
            {type:"noun",id:4},
            {type:"verb ending in 'ing'",id:5},
        ]
    },
    {
        content : `In the Art of War, Sun Tsu saif that it was better to _0_ the enemy than _1_ him _2_`,
        blanks : [
            {type:"inf. verb",id:0},
            {type:"inf. verb",id:1},
            {type:"adverb",id:2},
        ]
    },
    {
        content : `

        Albert Einstein was a German-born _0_ _1_ who developed
        the theory of _2_, one of the two pillars of modern _3_.
        His _4_ is also known for its _5_ on the philosophy of _6_.


        `,
        blanks : [
            {type:"adv/noun",id:0},
            {type:"verb -d",id:1},
            {type:"noun",id:2},
            {type:"noun",id:3},
            {type:"noun",id:4},
            {type:"noun",id:5},
            {type:"noun",id:6},
        ]
    },
    {
        content : `

        OUR _0_ <br>

        All of your _0_ needs can be _1_ by our _0_
        experts. Our _2_ arrive on-site to get the _0_ job done with
        _3_ _4_. We have two _5_ _6_ and a _7_. with access to _8_,
        if needed.

        `,
        blanks : [
            {type:"noun",id:0},
            {type:"verb -d",id:1},
            {type:"plural noun",id:2},
            {type:"adj",id:3},
            {type:"noun",id:4},
            {type:"noun",id:5},
            {type:"plural noun",id:6},
            {type:"noun",id:7},
            {type:"plural noun/adj",id:8},
        ]
    },

    {
        content : `

MY HANDS WERE _0_ again.

_1_ down at the floor to avoid the blinding _2_ _3_, I was
supposedly one of the best in the _4_, but it just didn’t register.
My partner Alicia _5_ as we stood in line with nine other _6_,
all chosen from over 1,000 _7_ from 29 countries and four
continents.

        `,
        blanks : [
            {type:"verb -ing",id:0},
            {type:"verb -ing",id:1},
            {type:"adj",id:2},
            {type:"noun",id:3},
            {type:"noun",id:4},
            {type:"verb -d",id:5},
            {type:"plural noun",id:6},
            {type:"plural noun",id:7},
        ]
    },


    {
        content : `
_0_ are a part of nature. Think about _1_. If you look at Huygens,
_1_ is a wave, as confirmed by the _2_ experiments. But along comes
Albert Einstein and he discovers that _1_ behaves like _3_, too.
        `,
        blanks : [
            {type:"noun",id:0},
            {type:"noun",id:1},
            {type:"adj",id:2},
            {type:"noun",id:3},
        ]
    },


    {
        content : `

        “The whole history of the world is summed up in the fact that,
        when nations are _0_, they are not always _1_, and when they
        _2_, they are no longer _3_.”

        <br>
        <br>
        — Winston Churchill

        `,
        blanks : [
            {type:"adj/verb -ing",id:0},
            {type:"adj/verb -ing",id:1},
            {type:"adj/verb -ing",id:2},
            {type:"adj/verb -ing",id:3},
        ]
    },


    {
        content : `

        “_0_ your time in improving _1_ by other men’s _2_ so
        that you shall _3_ easily by what others have _4_ hard for.”

        <br>
        <br>
        — Winston Churchill

        `,
        blanks : [
            {type:"verb",id:0},
            {type:"noun",id:1},
            {type:"noun/plural noun",id:2},
            {type:"verb",id:3},
            {type:"verb -d",id:4},
        ]
    },




]

var editor_template = $("#tmp_editor").html();
var reader_template = $("#tmp_reader").html();
var history_template = $("#tmp_history").html();

var current_sentence = Math.floor(Math.random() * sentences.length);

var current_array = [];

var current_view = "edit";

function init(){

    $(".editor-field").on("keyup",function(){
        current_array[$(this).attr("data-id")] = ($(this).text()).toLowerCase();
    })

    $("#save").click(function(){
        var data = $("#reader_content").text()
        save(data);
    });
    $("#next").click(function(){
        reset();
    });
}

function reset(){

    current_sentence = Math.floor(Math.random() * sentences.length);

    current_array = [];

    current_view = "edit";

    $(".icon-button").removeClass("active")

    $(".icon-button[data-target='edit']")
        .addClass("active");

    $("#main").html(Mustache.render(editor_template,{items:sentences[current_sentence].blanks}))

    init();

}

function save(content){

    var obj = {
        sentence: current_sentence,
        date : new Date() + "",
        content : content
    }

    if (localStorage.madlib_history) {
        var data = JSON.parse(localStorage.madlib_history);
        data.push(obj)
        localStorage.madlib_history = JSON.stringify(data);
    }
    else {
        localStorage.madlib_history = JSON.stringify([obj]);

    }
}

function loadHistory(){
    if (localStorage.madlib_history) {
        var data = JSON.parse(localStorage.madlib_history);
        return data;
    }
    return [];
}

$(function(){

    $(".icon-button").click(function(){
        $(".icon-button").removeClass("active")
        $(this).addClass("active")
        current_view = $(this).attr("data-target")
        console.log(current_view)
    })

    $(".icon-button[data-target='edit']")
        .addClass("active")
        .click(function(){
            items = sentences[current_sentence].blanks;
            if (current_array.length > 0) {
                for (var i = 0; i < current_array.length; i++) {
                    items[i].value = current_array[i];
                }
            }
            $("#main").html(Mustache.render(editor_template,{items:items}))
            init()
        })

    $(".icon-button[data-target='read']")
        .click(function(){
            var text = sentences[current_sentence].content;

            for (var i = 0; i < current_array.length; i++) {
                if (current_array[i]) {
                    text = text.replaceAll("_"+i+"_","<b>"+current_array[i]+"</b>")
                }
            }

            $("#main").html(Mustache.render(reader_template,{content:text}))
            init();
        })

    $(".icon-button[data-target='history']")
        .click(function(){
            var items = loadHistory();
            for (var i = 0; i < items.length; i++) {
                items[i].date = moment(items[i].date).fromNow();
            }
            $("#main").html(Mustache.render(history_template,{items:items}))
            init();
        })

    $(".icon-button[data-target='words']")
        .click(function(){
            $("#main").html(generateParagraph(40));
            init();
        })
    $("")

    items = sentences[current_sentence].blanks;

    // $("#main").html(Mustache.render(editor_template,{items:items}))
    $("#main").html(generateParagraph(40))

    init();
})
