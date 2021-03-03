const $theme = $("#theme");

$("form").on("submit", handleGetImages);

function handleGetImages(event) {
  event.preventDefault();
  $('button[type="submit"]').attr("disabled", "disabled");
  $("select").attr("disabled", "disabled");

  $.ajax({
    url:
      "https://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/champion.json",
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

function render(imgData) {
  // add pictures to boxes
  const imgUrls = getChampImageUrls(imgData, 6);
  const shuffledImgUrls = shuffle(duplicateArray(imgUrls));

  for (let i = 0; i < shuffledImgUrls.length; i++) {
    $(`.b${i + 1} img`).attr("src", shuffledImgUrls[i]);
  }

  $(".box").on("click", handleImageClick);
}

// function that takes imageData as input and returns the image urls in an array
function getChampImageUrls(imgData, count) {
  const imgUrls = [];
  for (const champ in imgData.data) {
    if (imgData.data[champ].tags.includes($theme.val())) {
      const imgFull = imgData.data[champ].image.full;
      const imgUrl =
        "http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/" + imgFull;
      imgUrls.push(imgUrl);
    }
  }

  const shuffledImgUrls = shuffle(imgUrls);
  return shuffledImgUrls.slice(0, count);
}

function shuffle(arr) {
  //make a copy of the array
  const randomArr = arr.slice();
  //shuffle the array
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

//toggle image on click and checks match
function handleImageClick() {
  const image = $(this).find(".bi");
  ///check if image is visible
  if (image.is(":visible")) {
    image.hide();
  } else {
    image.show();
  }
  handleCheckMatch(image);
}

//This variable is for an object that keeps track of the matches
let firstPick = null;
const $message = $(".message");

function handleCheckMatch(image) {
  const imgSrc = image.attr("src");
  const imgId = image.attr("id");
  if (!firstPick) {
    firstPick = { src: imgSrc, id: imgId };
    $message.text("Choose Another Card");
  } else if (firstPick.src === imgSrc && firstPick.id !== imgId) {
    //for first pick remove/replace the image if they match
    $("#" + firstPick.id)
      .parent()
      .replaceWith(`<div class="box empty-box"></div>`);

    //for second pick remove/replace the image if they match
    image.parent().replaceWith(`<div class="box empty-box"></div>`);

    firstPick = null;
    $message.text("Match");
    handleGameEnding();
  } else {
    //Hide first image
    //hide() doesn't work with a string. Selector needs # because it's chosing ID.
    $("#" + firstPick.id).hide();

    //Hide second image
    image.hide();

    firstPick = null;
    $message.text("No Match");
  }
}

// Check game has ended ----game can only end after a match
function handleGameEnding() {
  // Check if all boxes are empty
  if ($(".box").not(".empty-box").length === 0) {
    $message.text("You did it!");
  }
}

$("#refresh").on("click", () => {
  window.location.reload();
});
