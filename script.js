let $input = $('input[type="text"]');

$("form").on("submit", handleGetImages);

function handleGetImages(event) {
  event.preventDefault();
  const userInput = $input.val();

  if (!userInput) {
    return;
  }

  $.ajax({
    url: "https://api.imgur.com/3/gallery/search/top/all/0.json?q=" + userInput,
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

function render(imgData) {
  console.log(imgData.data[0].title);
  // $input.val("");
  let randomImg = imgData.data[0].images[0].link;
  $(".b1 img").attr("src", randomImg);
  $(".b2 img").attr("src", randomImg);
  $(".b3 img").attr("src", randomImg);
  $(".b4 img").attr("src", randomImg);
  $(".b5 img").attr("src", randomImg);
  $(".b6 img").attr("src", randomImg);
  $(".b7 img").attr("src", randomImg);
  $(".b8 img").attr("src", randomImg);
  $(".b9 img").attr("src", randomImg);
  $(".b10 img").attr("src", randomImg);
  $(".b11 img").attr("src", randomImg);
  $(".b12 img").attr("src", randomImg);
}
