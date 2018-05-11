//business logic
function Player(userName) {
    this.userName = userName;
    this.score = 0;

}

function Turn(player) {
    this.total = 0;
    this.randNumber = 0;
    this.player = player;
};

Turn.prototype.diceRolling = function(player1, player2) {
    var randNumber = Math.floor(Math.random() * 6) + 1;
    this.total += randNumber;

    if (randNumber == 1) {
        this.total = 0;
        this.endTurn(player1, player2);

        return randNumber;
    } else {
        this.randNumber += randNumber;
        return randNumber;
    };
};

Turn.prototype.endTurn = function(player1, player2) {
    this.player.score += this.total;
    this.total = 0;
    this.randNumber = 0;
    if (this.player == player1) {
        this.player = player2;
        $("#player2").toggleClass("active");
        $("#player1").toggleClass("active");
    } else if (this.player == player2) {
        this.player = player1;
        $("#player2").toggleClass("active");
        $("#player1").toggleClass("active");
    };
};



//user interface logic
$(document).ready(function() {
    var player1 = new Player("Player 1");
    var player2 = new Player("Player 2");


    var currentTurn = new Turn(player1);

    var total = currentTurn.total;

    //gives initial Turn Total of 0
    $("#total").text(total);

    //gives initial player scores of 0
    $('#plyer1').text(player1.score);
    $('#plyer2').text(player2.score);

    //gives current Player
    $('#current_player').text(currentTurn.player.userName);

    //This code runs when you click the spin button
    $("form#rolls").submit(function(event) {
        event.preventDefault();

        //Creates a dice spin number
        var result = currentTurn.diceRolling(player1, player2);

        //gives the dice number to the page
        $('#rolling').text(result);

        //gives the scores total to the page
        $('#total').text(currentTurn.total);

        //Determines the winner and prints player score to page
        if ((currentTurn.total + currentTurn.player.score) >= 100) {
            if (currentTurn.player == player1) {
                $('#plyer1').text(currentTurn.total + currentTurn.player.score);
                alert("You are the winner!");
            } else if (currentTurn.player == player2) {
                $('#plyer2').text(currentTurn.total + currentTurn.player.score)
                alert("You are the winner!");
            };
        };
    });

    //This code runs when you click the hold button
    $("form#end").submit(function(event) {
        event.preventDefault();

        currentTurn.endTurn(player1, player2);

        //gives current Player
        $('#current_player').text(currentTurn.player.userName);

        //shows players scores
        $('#plyer1').text(player1.score);
        $('#plyer1').text(player2.score);

        //Prints the cleared results and Total on page
        $('#rolling').text(currentTurn.randNumber);
        $('#total').text(currentTurn.total);
    });
});
