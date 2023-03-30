// Listen counter text on document load
$(document).ready(function () {
  $('#tweet-text').on('input', function () {
    const $output = $("output[for='tweet-text']");

    if (this.value.length < MAX_LENGTH) {
      $output.css('color', 'black');
    }

    if (this.value.length > MAX_LENGTH) {
      $output.css('color', 'red');
    }

    $output.text(MAX_LENGTH - this.value.length);
  });
});
