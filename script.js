let $input = $('input[type="text"]');

$("form").on("submit", handleGetImages);

function handleGetImages(event) {
  event.preventDefault();
  const userInput = $input.val();

  if (!userInput) {
    return;
  }

  $.ajax({
    url:
      "https://api.imgur.com/3/gallery/search/top/all/0.json?q=" +
      encodeURIComponent(userInput),
    headers: {
      Authorization: "Client-ID d156c8a308b4525",
    },
  }).then(
    (data) => {
      console.log(data);
      render(data);
    },
    (error) => {
      console.log("bad request", error);
    }
  );
}
render(); // to hold the picture until i get game to work, then remove it
function render(imgData) {
  // console.log(imgData.data[0].title);
  // $input.val("");

  // adding pictures to boxes
  // let insertImg = imgData.data[0].images[0].link;
  const imgUrls = [
    "https://i.imgur.com/2bvab7y.jpg",
    "https://i.imgur.com/uvFEcJN.jpg",
  ];

  const shuffledImgUrls = shuffle(duplicateArray(imgUrls));

  for (let i = 0; i < shuffledImgUrls.length; i++) {
    $(`.b${i + 1} img`).attr("src", shuffledImgUrls[i]);
  }
}

function shuffle(arr) {
  const randomArr = arr.slice(); //makes a copy of the array
  for (let i = 0; i < 100; i++) {
    const random1 = Math.floor(Math.random() * arr.length);
    const random2 = Math.floor(Math.random() * arr.length);
    const saveArr1 = randomArr[random1];
    randomArr[random1] = randomArr[random2];
    randomArr[random2] = saveArr1;
  }

  return randomArr;
}

function duplicateArray(arr) {
  return arr.concat(arr);
}

// next line will only work on boxes at this time,not the changes
$(".box").on("click", handleShowImage);

function handleShowImage() {
  const image = $(this).find(".bi");
  ///check if image is visible
  if (image.is(":visible")) {
    image.hide();
  } else {
    image.show();
  }
  handleCheckMatch(image);
}

let firstPick = null;
const $message = $(".message");

function handleCheckMatch(image) {
  const imgSrc = image.attr("src");
  const imgId = image.attr("id");
  if (!firstPick) {
    firstPick = { src: imgSrc, id: imgId };
    $message.text("Choose Another Card");
  } else if (firstPick.src === imgSrc && firstPick.id !== imgId) {
    $("#" + firstPick.id)
      .parent()
      .replaceWith(`<div class="box bz"></div>`);
    image.parent().replaceWith(`<div class="box bz"></div>`);
    firstPick = null;
    $message.text("Match");
    handleGameEnding();
  } else {
    //hide() doesn't work with a string. Selector needs # because your chosing ID.
    $("#" + firstPick.id).hide();
    //image is the second pick in this condition
    image.hide();
    firstPick = null;
    $message.text("No Match");
  }
}

// Check game ending ----game can only end after a match
function handleGameEnding() {
  if ($(".box").not(".bz").length === 0) {
    $message.text("You did it!");
  }
}
