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

    $("")

    items = sentences[current_sentence].blanks;

    $("#main").html(Mustache.render(editor_template,{items:items}))

    init();
})
