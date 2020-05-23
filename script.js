let tweetArea = document.getElementById("tweetArea")
let MAX_LETTER = 140
let itemList = []
let message = ''
let num = 0;

document.getElementById("returnButton").style.display = "none";



function getFilteredList(hashTag) {
    console.log(hashTag)
    showTweet(itemList.filter(item => {
        let parentContent = itemList.find(child => child.id == item.parents)

        return item.contents.split(" ").includes(hashTag) ||
            (parentContent && parentContent.contents.split(" ").includes(hashTag))
    }));

    document.getElementById("returnButton").style.display = "block";

    // var buttonBack = document.createElement("button");
    // buttonBack.innerHTML = "Back to original list"
    // var buttonPlace = document.getElementById("original-list");
    // buttonPlace.appendChild(buttonBack);
}

function showOriginalList() {
    showTweet(itemList)
    document.getElementById("returnButton").style.display = "none";
}

const countLetter = () => {
    //1. get the length of sentences you tupe into textares
    let lengthofSentence = tweetArea.value.length
        //console.log("length is : ", lengthofSentence)

    //2. MAC_LETTER - the length
    let remain = MAX_LETTER - lengthofSentence

    //3. show the remain number of  char
    if (remain < 0) {
        document.getElementById("remain").innerHTML = `${remain} characters left`
        document.getElementById("remain").style.color = 'red'
        document.getElementById("postButton").disabled = true
    } else {
        document.getElementById("remain").innerHTML = `${remain} characters left`
        document.getElementById("remain").style.color = 'black'
        document.getElementById("postButton").disabled = false
    }

}

tweetArea.addEventListener("input", countLetter)

let addTweet = () => {
    lengthOfSentence = tweetArea.value.length;
    document.getElementById("remain").innerHTML = "";

    if (lengthOfSentence > 140) {
        alert("You can only post 140 letters, please retype!")
    } else if (lengthOfSentence == 0) {
        alert("Please type something!")
    } else {
        let newTweet = {
            id: num,
            contents: document.getElementById("tweetArea").value,
            isLike: false,
            isReTweet: false,
            parents: null
                //comments:[]
        }
        itemList.unshift(newTweet)
        num++;
        showTweet(itemList)
        document.getElementById("tweetArea").value = '';
    }

}

function formatTweet(item) {
    var words = item.contents.split(" ")
    var text = ""
    for (i = 0; i < words.length; i++) {
        if (words[i][0] == "#") {
            text += ` <a onclick='getFilteredList("${words[i]}")' href="#0">${words[i]}</a>` //cong vao cai words thu i vao trong contents
        } else {
            text += ` ${words[i]}`
        }
    }
    return text;
}


let showTweet = (list) => {


    console.log("list ", list);
    lengthOfSentence = tweetArea.value.length;
    //    if (tweetArea.value.length == 0) {
    //         alert("please type some text");
    //    } else {

    document.getElementById('resultArea').innerHTML = list.map((item, id) => {

        // item.contents = text;

        var resultHTML = `
        <div class="box">
            <p>${formatTweet(item)}</p>
            <div class="reaction">`

        if (!item.isLike) {
            resultHTML += `<div id="like" onclick="toggleLike(${id})"><a href="#0">Like</a></div>`
        } else {
            resultHTML += `<div id="like" onclick="toggleLike(${id})"><a href="#0">Unlike</a></div>`
        }

        resultHTML +=
            `<div id="delete" onclick="remove(${id})"><a href="#0">Delete</a></div>`


        if (!item.isReTweet) {
            resultHTML += `<div id="retweet" onclick="reTweet(${item.id})"><a href="#0">Retweet</a></div>`
        }

        resultHTML += `</div>`

        if (item.isReTweet) {
            resultHTML += `<div id="reTweetArea">
                                <div class="box"><p>${
                                    formatTweet(itemList.filter(one => one.id == item.parents)[0])}</p>
                                </div>
                            </div>`

        }
        // resultHTML += ` <div class="postAt">
        //                     <p id="date">${moment(Date()).format('llll')}</p>
        //                 </div>
        //             </div>`
        resultHTML += `</div>`
        return resultHTML;
    }).join("")

    console.log(itemList)

}

function remove(id) {
    console.log(id);
    console.log(itemList);
    const orginialTweetId = itemList[id].id;

    itemList = itemList.filter(removedItem => !(removedItem.parents == orginialTweetId || removedItem.id == orginialTweetId));
    showTweet(itemList);
    console.log(itemList)
}


tweetArea.addEventListener("input", countLetter)

function toggleLike(id) {
    itemList[id].isLike = !itemList[id].isLike;
    showTweet(itemList);
}

//can't do retweet of a retweet

let reTweet = (id) => {

    let reTweetText = prompt("Content of retweet:");

    if (reTweetText == null) {
        //alert("type something")
    } else {
        const original = itemList.find((item) => item.id == id);
        let retweetObj = {
            id: num,
            contents: reTweetText,
            isLike: false,
            isReTweet: true,
            parents: original.id
        }

        itemList.unshift(retweetObj)
        showTweet(itemList)
        num++
    }
}

//Additional features:
/* 
1. Date
2. User posts
3. Style alert box
 */