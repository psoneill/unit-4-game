var characters = {
    obiWan: {
        id:"obiWan",
        name:"Obi-Wan Kenobi",
        health:50,
        attack:15,
        originalAttack:15
    },
    lukeSkywalker: {
        id:"lukeSkywalker",
        name:"Luke Skywalker",
        health:60,
        attack:13,
        originalAttack:13
    },
    darthSidious: {
        id:"darthSidious",
        name:"Darth Sidious",
        health:80,
        attack:14,
        originalAttack:14
    },
    darthMaul: {
        id:"darthMaul",
        name:"Darth Maul",
        health:100,
        attack:12,
        originalAttack:12
    }
}

$(function() {
//sets character selected to false at beginning
var characterSelected = false;
var enemySelected = false;
var attackFinished = true;
var enemyDead = false;
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
        attackFinished = true;
        $("#enemyCharacter").addClass("enemyCharacterSelected");
        $("."+enemyChar.id).hide();
        $("#enemySelect").hide();
        enemySelected = true;
        $("#btnAttack").show();
    }
})

$("#btnAttack").on("click", function(){
    if(enemySelected) {
        if(attackFinished) {
            attackFinished = false;
            enemyChar.health -= selectedChar.attack;
            animateUserAttack();

            $("#enemyHP").text(enemyChar.health);

            setTimeout(function (){
                if(enemyChar.health > 0) {                      
                    selectedChar.health -= enemyChar.attack;
                    animateEnemyAttack();
                    $("#characterHP").text(selectedChar.health);

                    if(selectedChar.health <= 0) {
                        setTimeout(function(){
                            alert("Game Over!");
                            window.location.reload();
                        },1000)
                    }
                } else {
                    $("#enemyCharacterImage").attr("src","assets/images/placeholder.png");
                    $("#enemyCharacterName").text("Enemy Name");
                    $("#enemyHP,#enemyATK").text("");
                    enemyChar = "";
                    enemySelected = false;
                    $("#enemySelect").show();
                    $("#enemyCharacter").removeClass("enemyCharacterSelected");
                    $("#enemyCharacter").removeClass("deadCharacter");
                    $("#btnAttack").hide();

                    if ( $("div.character:visible").length === 0) {
                        $("#characterSelectScreen").html("<h1>You Win!!!!</h1>")
                    }
                }

                selectedChar.attack += selectedChar.originalAttack;
                $("#characterATK").text(selectedChar.attack);
                attackFinished = true;
            },800);
        }
    }   
})

function animateUserAttack() {
    var userCharacterCard = $("#userCharacter");
    var enemyCharacterCard = $("#enemyCharacter");
    userCharacterCard.animate({ left: "+=500px" }, 150);
    if(enemyChar.health <= 0) {
        enemyCharacterCard.addClass("deadCharacter");
    }
    userCharacterCard.animate({ left: "-=500px" }, 150);
    setTimeout(function() {
        enemyCharacterCard.animate({ left: "+=20px" }, 50);
        enemyCharacterCard.animate({ left: "-=40px" }, 50);
        enemyCharacterCard.animate({ left: "+=20px" }, 50);  
    },350);
}

function animateEnemyAttack() {
    var userCharacterCard = $("#userCharacter");
    var enemyCharacterCard = $("#enemyCharacter");
    enemyCharacterCard.animate({ left: "-=500px" }, 150);
    if(selectedChar.health <= 0) {
        userCharacterCard.addClass("deadCharacter");
    }
    enemyCharacterCard.animate({ left: "+=500px" }, 150);
    setTimeout(function() {
        userCharacterCard.animate({ left: "-=20px" }, 50);
        userCharacterCard.animate({ left: "+=40px" }, 50);
        userCharacterCard.animate({ left: "-=20px" }, 50);
    },350);
}
});