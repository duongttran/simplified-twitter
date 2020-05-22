let tweetListArea = document.getElementById("textArea");
let MAX_LETTER = 140;
let num = 0;

const countLetter = () => {

    console.log("here");
    //console.log(event.target.value)
    let lengthOfSentence = tweetListArea.value.length;
    console.log("length is ", lengthOfSentence);
    let remain = MAX_LETTER - lengthOfSentence;

    if (remain < 0) {
        document.getElementById("remain").innerHTML = `${remain} left`;
        document.getElementById("remain").style.color = 'red';
    } else {
        document.getElementById("remain").innerHTML = `${remain} left`;
        document.getElementById("remain").style.color = 'black';
    }
}

tweetListArea.addEventListener("input", countLetter)

function post() {
    lengthOfSentence = tweetListArea.value.length;

    if (lengthOfSentence > 140) {
        alert("You can only post 140 letters, please retype!")
    } else {
        // document.getElementById("tweetContent").innerHTML = `<p>${tweetListArea.value}</p>`;
        var tweetItem = document.createElement("div");
        var tweetText = document.createTextNode(`${tweetListArea.value}`);
        tweetItem.appendChild(tweetText);

        document.getElementById("tweetContent").appendChild(tweetItem);
        tweetListArea.value = "";
    }
    countLetter();
}