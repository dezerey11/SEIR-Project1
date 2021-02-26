const $input = $('input[type="text"]');

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
}
