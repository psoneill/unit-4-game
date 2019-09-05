//create Object of characters that each have the same variables
var characters = {
    //specific obiWan object inside the object characters
    obiWan: {
        //characterID used to reference the object
        id:"obiWan",
        //character Name to be displayed on Character Card
        name:"Obi-Wan Kenobi",
        //character Health which decreases as the game progresses
        health:170,
        //character Attack which increases throughout the game if character is chosen
        attack:6,
        //character original Attack which is added to user character each round
        originalAttack:6,
        // character counter Attack which is the attack used if character is selected as an enemy
        counterAttack:5
    },
    lukeSkywalker: {
        id:"lukeSkywalker",
        name:"Luke Skywalker",
        health:150,
        attack:7,
        originalAttack:7,
        counterAttack:10
    },
    darthSidious: {
        id:"darthSidious",
        name:"Darth Sidious",
        health:130,
        attack:8,
        originalAttack:8,
        counterAttack:20
    },
    darthMaul: {
        id:"darthMaul",
        name:"Darth Maul",
        health:100,
        attack:9,
        originalAttack:9,
        counterAttack:25
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

//hide attack button at the start of the game
$("#btnAttack").hide();

//add border to character select on hover
$(".characterSelectMenu").hover(function(){
    $(this).addClass("characterHover");
},function(){
    $(this).removeClass("characterHover");
});

//click event for selecting character view
$(".characterSelectMenu").on("click", function() {
    //checks if the user has selected a character if not
    if(!characterSelected) {
        //change user character image as well as the Name, HP, and ATK listed on Card
        $("#userCharacterImage").attr("src",$(this).attr("src"));
        $("#characterName").text(characters[$(this).attr("id")].name);
        $("#characterHP").text(characters[$(this).attr("id")].health);
        $("#characterATK").text(characters[$(this).attr("id")].attack);
        //sets user character Object to correct character
        selectedChar = characters[$(this).attr("id")];
    } else if (!enemySelected) {
        //if user has already selected a character then clicked Character populates on the Enemy Card
        //change Enemy image as well as the Name, HP, and ATK (counter)
        $("#enemyCharacterImage").attr("src",$(this).attr("src"));
        $("#enemyCharacterName").text(characters[$(this).attr("id")].name);
        $("#enemyHP").text(characters[$(this).attr("id")].health);
        $("#enemyATK").text(characters[$(this).attr("id")].counterAttack);
        //sets enemy character Oject to correct character
        enemyChar = characters[$(this).attr("id")];
    }
})

//Listener event for when User character Select Button is clicked
$("#characterSelectBtn").on("click", function() {
    //Checks to make sure that user has actually selected a character before clicking Select
    if($("#userCharacterImage").attr("src") !== "assets/images/placeholder.png") {
        //Add CSS class indicating that user has selected this character
        $("#userCharacter").addClass("userCharacterSelected");
        //hide selected character image from Character Select screen
        $("."+selectedChar.id).hide();
        //hide the Character Select button
        $("#characterSelectBtn").hide();
        //flag that user character has been selected
        characterSelected = true;
    }
})

//Listener event for when Enemy character Select Button is clicked
$("#enemySelectBtn").on("click", function() {
    if($("#enemyCharacterImage").attr("src") !== "assets/images/placeholder.png") {
        //reset the flag for attackFinished
        attackFinished = true;
        //Add CSS class indicating that user has selected this enemy
        $("#enemyCharacter").addClass("enemyCharacterSelected");
        //hide selected enemy image from Character Select screen
        $("."+enemyChar.id).hide();
        //hide the Enemy Select button
        $("#enemySelectBtn").hide();
        //flag that enemy character has been selected
        enemySelected = true;
        //show the Attack Button
        $("#btnAttack").show();
        //Checks to see if user cleared all enemies in which case the game displays You Win
        if ( $("div.character:visible").length === 0) {
            $("#characterSelectScreen").html('<h1 style="color:red;">FINAL BATTLE</h1>')
        }
    }
})

//click event for when the use clicks the Attack Button
$("#btnAttack").on("click", function(){
    //checks to make sure that an enemy is selected
    if(enemySelected) {
        //checks to make sure previous Attack Button click events have ended
        if(attackFinished) {
            //sets attackFinished to false to prevent double clicking
            attackFinished = false;
            //reduces enemy health by the attack of the user character
            enemyChar.health -= selectedChar.attack;
            //function for animating the user character's attack
            animateUserAttack();

            //displays lower enemy HP on Enemy Card
            $("#enemyHP").text(enemyChar.health);

            //timeout function to delay enemy attack
            setTimeout(function (){
                //checks if enemy has been defeated
                if(enemyChar.health > 0) {         
                    //if enemy is still alive then enemy attack occurs             
                    selectedChar.health -= enemyChar.counterAttack;
                    //animates enemy attack
                    animateEnemyAttack();
                    //lowers user character HP on User Character Card
                    $("#characterHP").text(selectedChar.health);

                    //checks to see if enemy attack defeats user character
                    if(selectedChar.health <= 0) {
                        //if user is defeated then sends alert for Game Over after 1 second and reloads game
                        setTimeout(function(){
                            alert("Game Over!");
                            window.location.reload();
                        },1000)
                    }
                } else {
                    //in the case where Enemy Character is defeated then reset Enemy Character Card image, name, and stats
                    $("#enemyCharacterImage").attr("src","assets/images/placeholder.png");
                    $("#enemyCharacterName").text("Enemy Name");
                    $("#enemyHP,#enemyATK").text("");
                    //resets enemy character object
                    enemyChar = "";
                    //sets enemySelected flag to false
                    enemySelected = false;
                    //unhides the enemy select button and removes all extra formatting
                    $("#enemySelectBtn").show();
                    $("#enemyCharacter").removeClass("enemyCharacterSelected");
                    $("#enemyCharacter").removeClass("deadCharacter");
                    //hides attack button
                    $("#btnAttack").hide();

                    //Checks to see if user cleared all enemies in which case the game displays You Win
                    if ( $("div.character:visible").length === 0) {
                        $("#characterSelectScreen").html("<h1>You Win!!!!</h1>");
                        $(".enemySide").hide();
                    }
                }

                //increases user character attack by original attack amount
                selectedChar.attack += selectedChar.originalAttack;
                //displays new user attack
                $("#characterATK").text(selectedChar.attack);
                //sets attackFinished flag to true which allows user to attack again
                attackFinished = true;
            },800);
        }
    }   
})

//animates the user attack
function animateUserAttack() {
    //declares the cards for user and enemy characters
    var userCharacterCard = $("#userCharacter");
    var enemyCharacterCard = $("#enemyCharacter");
    
    //animates character card to simulate an attack
    userCharacterCard.animate({ left: "+=500px" }, 150);
    if(enemyChar.health <= 0) {
        //if the attack defeats the enemy then change formatting on strike
        enemyCharacterCard.addClass("deadCharacter");
    }
    userCharacterCard.animate({ left: "-=500px" }, 150);
    
    //timeout to simulate the enemy damage being taken
    setTimeout(function() {
        enemyCharacterCard.animate({ left: "+=20px" }, 50);
        enemyCharacterCard.animate({ left: "-=40px" }, 50);
        enemyCharacterCard.animate({ left: "+=20px" }, 50);  
    },350);
}

function animateEnemyAttack() {
    //declares the cards for user and enemy characters
    var userCharacterCard = $("#userCharacter");
    var enemyCharacterCard = $("#enemyCharacter");
    //animates enemy character card to simulate an attack
    enemyCharacterCard.animate({ left: "-=500px" }, 150);
    if(selectedChar.health <= 0) {
        //if the attack defeats the user then change formatting on strike
        userCharacterCard.addClass("deadCharacter");
    }
    enemyCharacterCard.animate({ left: "+=500px" }, 150);

    //timeout to simulate user character taking damage
    setTimeout(function() {
        userCharacterCard.animate({ left: "-=20px" }, 50);
        userCharacterCard.animate({ left: "+=40px" }, 50);
        userCharacterCard.animate({ left: "-=20px" }, 50);
    },350);
}
});