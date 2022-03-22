const prompt = require('prompt-sync')();
var figlet = require('figlet');


//console.log ("Welcome to the H A N G M A N");  // import library of hangman

function chooseRandomWord(){
    var fruits = ["apple", "apricot", "avocado", "banana", "cherry","kiwi","lemon", "lime","mango","orange"]
    var index = Math.floor(Math.random() * 10);
    return fruits[index];
}
// function that choosing a random word from category of fruits
function HideWord(WordToGuess) {
    var HiddenWord = WordToGuess.replace(/[A-Z]/ig,'*')
    return HiddenWord;
}
///function that hiding the word
var failures = 0;

function matchShowLetter(choosingLetter, word, HiddenWord){
    var found = false;
    var NewHiddenWord = "";
    for(i = 0; i < word.length; i++){
        if(word[i] === choosingLetter){
            found = true;
            NewHiddenWord = NewHiddenWord + choosingLetter;
        }
        else{
            NewHiddenWord = NewHiddenWord + HiddenWord[i];
        }
    }
    if(!found){
        failures = failures + 1;
    }
    return NewHiddenWord;
}
// function that showing back the letter if there is macth
function startgame(){
    var word = chooseRandomWord();
    var HiddenWord = HideWord(word);
    console.log(HiddenWord);
    var done = false
/// a while loop that doing the sane and showing remaining tries and uncovering the letters
    while (!done){
        console.log("choose a letter");
        var choosingLetter = prompt();//var choosingLetter = prompt()
        HiddenWord = matchShowLetter(choosingLetter,word, HiddenWord);
        console.log(HiddenWord);
        console.log(10 - failures + " remaining tries");
        if(HiddenWord.indexOf("*") < 0 ) {
            done = true;
            console.log("welldone");
            var numtries = failures + word.length;
            console.log("you guessed the word in " + numtries + " tries");
            console.log(" for restart press y");
            restartY();
        }
        if (failures === 10){
            done = true;
            console.log("you lost");
            console.log(" for restart press y");
            restartY()
            }
        }
}
function restartY(letter) {
        var restart = prompt()
        if (restart.indexOf('y') >= 0) {
            failures = 0
            return startgame();
        }
        else
        {
            console.log("byby");
        }
}
// import this front library
figlet('Hangman!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    startgame ()
});