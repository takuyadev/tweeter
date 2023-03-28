$(document).ready(function () {
  console.log('ready!');

  $('#tweet-text').on('input', function () {
    $("output[for='tweet-text']").text(this.value.length);
    console.log(this.value.length);
  });
});
