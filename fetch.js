var next;

function set(post) {
    $("#title a").text(post.title);
    $("#title a").attr("href", "https://www.reddit.com" + post.permalink);
    $("#author a").text("u/" + post.author);
    $("#author a").attr("href", "https://www.reddit.com/u/" + post.author);
    $("#image").attr("src", post.url);
}

function fetch() {
    console.log($("#sub").val());
    $.getJSON( "https://www.reddit.com/r/" + $("#sub").val() + ".json", function( result ) {
        var count = result.data.dist;
        while (true) {
            var post = result.data.children[Math.floor(count * Math.random())].data;
            if (!next) {
                set(post);
                next = post;
                break;
            } else {
                if (next != post) {
                    next = post;
                    break;
                }
            }
        }
    });
}

function update() {
    if (next) {
        set(next);
        console.log("set");
    }    
    fetch();
}

update();
