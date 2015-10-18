/* Name: Kevin Do
   Course: 443
   Assignment: #2
*/

//card constructor
var Card = function (suit, number) {
	
    //returns cardvalue, JQK = 10, A = 11
    this.getCardValue = function () {
        var cardValue;
        if (number >= 10) {
            cardValue = 10;
        } else if(number == 1) {
            cardValue = 11;
        } else {
		cardValue = number;
		}
        return cardValue;
    };

	//returns suit symbol
    this.getSuitSymbol = function () {
        var suitSymbol;
		if (suit == 1) {
			suitSymbol = "&spades;";
		} else if (suit == 2) {
			suitSymbol = "&hearts;";
		} else if (suit == 3) {
			suitSymbol = "&diams;";
		} else if (suit == 4) {
			suitSymbol = "&clubs;";
		}
        return suitSymbol;	
    };
	
	//returns suit name for CSSing reference
    this.getSuitName = function () {
        var suitName;
		if (suit == 1) {
			suitName = "Spades";
		} else if (suit == 2) {
			suitName = "Hearts";
		} else if (suit == 3) {
			suitName = "Diamonds";
		} else if (suit == 4) {
			suitName = "Clubs";
		}
        return suitName;
    };
	
    //returns card name
    this.getCardName = function () {
        var cardName;
		if (number == 1) {
			cardName = "A";
		} else if (number == 11) {
			cardName = "J";
		} else if (number == 12) {
			cardName = "Q";
		} else if (number == 13) {
			cardName = "K";
		} else {
			cardName = number;
		}
		return cardName+this.getSuitSymbol();
    };
	
};

//deck constructor
var Deck = function () {
    var deck = [];
    
	//creates a full 52 card deck
    var newDeck = function () {
        var suit;
        var number;
		
        for (var i = 0; i < 52; i++){
            suit = i%4+1;
            number = i%13+1;
            deck.push(new Card(suit,number));
        }
    };
	
	//creates deck
    newDeck();
	
	//returns deck
	this.getDeck = function (){
        return deck;
    };
	
    //shuffles deck by swapping every card in descending order with a random card ie fisher yates shuffle
    this.shuffleDeck = function () {
		var toSwap;
		var numberOfCards = deck.length - 1;
		var temp;
		
        for (var i = deck.length; i > 0; i--) {
			toSwap = Math.floor(Math.random()* i); //random position to swap to
			temp = deck[i]; //position to swap from
			deck[i] = deck[toSwap];
			deck[toSwap] = temp;
		}
        return this.getDeck();
    };

    //deal card from top of deck and remove, create new deck if no cards are left
    this.dealCard = function () {
        if (deck.length == 0) {
            newDeck();
            this.shuffleDeck();
        }
        return deck.pop();
    };
	
};

//hand constructor
var Hand = function (deck) {
    var hand = [];

    //deals two cards
    hand.push(deck.dealCard(), deck.dealCard());
	
	//returns hand
    this.getHand = function () {
        return hand;
    };
	
    //calculates and returns value of hand
    this.value = function () {
        var handValue = 0;
		var cardValue = 0;
        var aces = 0; //counts number of aces 
        
        for (var i = 0; i < hand.length;i ++) {
            cardValue = hand[i].getCardValue();
            if (cardValue == 11) {
                aces += 1;
            }
            handValue += cardValue;
        }
		
        //ace control for 1 or 11
        while (handValue > 21 && aces > 0){
            handValue -= 10;
            aces -=1;
        }
        return handValue;
    };

	//hit function
    this.hit = function () {
        if (hand.length < 6){
            hand.push(deck.dealCard());
        }
    };
	
	//dealer hits
	this.dealerHit = function () {
		while (hand.value() < 17) {
			hand.push(deck.dealCard());
		}
	};
	
	//prints out dealer hand
	this.printDealerHand = function () {
		var printD = [];
		printD.push('<div class="card ',hand[0].getSuitName(),'">',hand[0].getCardName(),'</div>');
		return printD.join('');
	};
	
	//prints out player hand
    this.printPlayerHand = function () {
        var printP = [];

        for (var i = 0; i < hand.length; i++){
            printP.push('<div class="card ',hand[i].getSuitName(),'">',hand[i].getCardName(),'</div>');
        }
        return printP.join('');
    };
	
};

//game
(function blackjack (){
	//rules
	alert("Welcome to Blackjack!\n\nThis version of Blackjack uses a single deck. Double down, split, forfeit, and insurance are not permitted. The dealer stands on soft 17, and having six cards without busting is an autowin.\n\nGood luck and have fun!");
  
    //create and shuffle deck
    var deck = new Deck();
	deck.shuffleDeck();

    //track record
    var win = 0;
    var loss = 0;
	var tie = 0;
	
    //player hand
    var playerHand;	
	var dealerHand;
	
	/*
    var dealerHand = function () {
        var hand = new Hand(deck);
        while (hand.value() < 17){
            hand.hit();
        }
        return hand;
    };
*/

	
    //list of possible results
    var game = function (playerHand, dealerHand){
        var result;
        var dealerValue = dealerHand.value();
        var playerValue = playerHand.value();
 
        if (playerValue > 21){
			loss++;
            result = "You busted, you lose!";
		} else if (playerValue == 21 && playerHand.getHand().length == 2 && dealerValue == 21 && dealerHand.getHand().length == 2) {
			tie++;
			result = "Aww, the dealer pushed! That's a tie.";
		} else if (playerValue == 21 && playerHand.getHand().length == 2) {
			win++;
			result = "WOOHOO! BLACKJACK!";
		}else if (dealerValue > 21) {
			win++;
			result = "Dealer busted, you win!";
		} else if (playerValue > dealerValue) {
			win++;
			result = "You have a higher hand, you win!";
		} else if (dealerValue == playerValue) {
			tie++;
			result = "It's a push, you tied!";
		} else if (dealerValue > playerValue) {
			loss++;
			result = "Dealer has a higher hand, you lose!";
		} else if (playerValue <= 21 && playerHand.getHand().length >= 6) {
            win++;
			result = "Charlie, that's a win!";
        } else if (playerValue == 21) {
			win++;
            result = "21, you win!";
        } 
		//print results
        return result+"<br />Dealer: "+dealerHand.value()+"<br />You: "+playerValue;
    };

    //define buttons and play areas
	var $dealButton = $("#dealButton");
    var $hitButton = $("#hitButton");
    var $standButton = $("#standButton");
    var $handValue = $("#handValue");
    var $playerHand = $('#playerHand');
    var $dealerHand = $('#dealerHand');

	//deal button
    $dealButton.on('click', function () {
		// alert("deal test"); debug
        playerHand = new Hand(deck);
		dealerHand = new Hand(deck);
		
		while (dealerHand.value () < 17) {
			dealerHand.hit();
		}
		
		refresh();
        hideDealButton();
    });

    //hit button
    $hitButton.on('click', function () {
		playerHand.hit();
		//alert("hit test") debug
        if (playerHand.getHand().length >= 6 || playerHand.value() > 21){
            $standButton.trigger('click');
        } else {
            refresh();
        }
    });

    //stand button
    $standButton.on('click', function (){
		// alert("stand test"); debug
        $playerHand.html(game(playerHand, dealerHand));
		$dealerHand.html(dealerHand.printPlayerHand());
        showDealButton();
    });
	
    //Show only deal button at beginning of game
    var showDealButton = function () {
        $dealButton.show();
		$hitButton.hide();
        $standButton.hide();
    };

	//hide dealer button, show hit and stand
    var hideDealButton = function () { 
        $dealButton.hide();
		$hitButton.show();
        $standButton.show();
    };

	//refresh window after events
    var refresh = function () {
		$("#win").html(win);
        $("#loss").html(loss);
		$("#tie").html(tie);
        $playerHand.html(playerHand.printPlayerHand());
		$dealerHand.html(dealerHand.printDealerHand());
        $handValue.find(".number").html(playerHand.value());
    };

}());
