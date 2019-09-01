var characters = {
    obiWan: {
        id:"obiWan",
        name:"Obi-Wan Kenobi",
        health:200,
        attack:18
    },
    lukeSkywalker: {
        id:"lukeSkywalker",
        name:"Luke Skywalker",
        health:240,
        attack:16
    },
    darthSidious: {
        id:"darthSidious",
        name:"Darth Sidious",
        health:280,
        attack:14
    },
    darthMaul: {
        id:"darthMaul",
        name:"Darth Maul",
        health:300,
        attack:12
    }
}

$(function() {
//sets character selected to false at beginning
var characterSelected = false;
var enemySelected = false;
var selectedChar = "";
var enemyChar = "";

$("#btnAttack").hide();


//add border to character select on hover
$(".characterSelect").hover(function(){
    $(this).addClass("characterHover");
},function(){
    $(this).removeClass("characterHover");
});

//click event for selecting character view
$(".characterSelect").on("click", function() {
    if(!characterSelected) {
        $("#userCharacterImage").attr("src",$(this).attr("src"));
        $("#characterName").text(characters[$(this).attr("id")].name);
        $("#characterHP").text(characters[$(this).attr("id")].health);
        $("#characterATK").text(characters[$(this).attr("id")].attack);
        selectedChar = characters[$(this).attr("id")];
    } else if (!enemySelected) {
        $("#enemyCharacterImage").attr("src",$(this).attr("src"));
        $("#enemyCharacterName").text(characters[$(this).attr("id")].name);
        $("#enemyHP").text(characters[$(this).attr("id")].health);
        $("#enemyATK").text(characters[$(this).attr("id")].attack);
        enemyChar = characters[$(this).attr("id")];
    }
})

$("#characterSelect").on("click", function() {
    if($("#userCharacterImage").attr("src") !== "assets/images/placeholder.png") {
        $("#userCharacter").addClass("userCharacterSelected");
        $("."+selectedChar.id).hide();
        $("#characterSelect").hide();
        characterSelected = true;
    }
})

$("#enemySelect").on("click", function() {
    if($("#enemyCharacterImage").attr("src") !== "assets/images/placeholder.png") {
        $("#enemyCharacter").addClass("enemyCharacterSelected");
        $("."+enemyChar.id).hide();
        $("#enemySelect").hide();
        enemySelected = true;
        $("#btnAttack").show();
    }
})

$("#btnAttack").on("click", function(){
    enemyChar.health -= selectedChar.attack;
    $("#enemyHP").text(enemyChar.health);

    if(enemyChar.health > 0) {
        selectedChar.health -= enemyChar.attack;
        $("#characterHP").text(selectedChar.health);

        selectedChar.attack += 8;
        $("#characterATK").text(selectedChar.attack);
    } else {
        $("#enemyCharacterImage").attr("src","assets/images/placeholder.png");
        $("#enemyCharacterName").text("Enemy Name");
        $("#enemyHP").text("");
        $("#enemyATK").text("");
        enemyChar = "";
        enemySelected = false;
        $("#enemySelect").show();
        $("#enemyCharacter").removeClass("enemyCharacterSelected");
    }
})

});