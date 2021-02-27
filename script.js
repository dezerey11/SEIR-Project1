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
render();
function render(imgData) {
  // console.log(imgData.data[0].title);
  // $input.val("");

  // adding pictures to boxes
  // let insertImg = imgData.data[0].images[0].link;
  const imgUrls = [
    "https://i.imgur.com/2bvab7y.jpg",
    "https://i.imgur.com/uvFEcJN.jpg",
    "https://i.imgur.com/2bvab7y.jpg",
    "https://i.imgur.com/uvFEcJN.jpg",
  ];
  // $(".b1 img").attr("src", "https://i.imgur.com/2bvab7y.jpg");
  // $(".b2 img").attr("src", "https://i.imgur.com/uvFEcJN.jpg");

  const shuffledImgUrls = shuffle(imgUrls);

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
