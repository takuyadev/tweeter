/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetsData = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac',
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd',
    },
    content: {
      text: 'Je pense , donc je suis',
    },
    created_at: 1461113959088,
  },
];

let isFormOpen = false;
const MIN_LENGTH = 0;
const MAX_LENGTH = 140;

// Protect against XSS attacks / scripting in form
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Handles submitting tweet from submit
const submitTweetHandler = function (event) {
  event.preventDefault();
  const $textareaValue = $(this).find('textarea[name="text"]');

  // Handle error based on if content is too long or too short
  if ($textareaValue.val().length > MAX_LENGTH) {
    $('#error-message p').text(
      'Server bandwidth dont grow on trees. (140 max)'
    );
    return $('#error-message').slideDown('slow');
  }

  if ($textareaValue.val().length === MIN_LENGTH) {
    $('#error-message p').text('Theres nothin here (type anything)');
    return $('#error-message').slideDown('slow');
  }

  // Post tweet to server
  $.ajax({
    method: 'POST',
    data: $(this).serialize(),
    url: '/tweets',
    success: () => {
      // Clear text box, and reload tweets
      $textareaValue.val('');
      $('#error-message').slideUp('slow');
      loadTweets();
    },
    error: () => {},
  });
};

// Render multiple tweets
const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

// Renders tweets based on tweet data provided
const createTweetElement = function (tweet) {
  let $tweet = $(`
  <article class="tweet">
    <header class="tweet__header">
      <div class="tweet__user-info">
        <img
          class="tweet__user-avatar"
          src="${escape(tweet.user.avatars)}"
          alt="Avatar of ${escape(tweet.user.name)}"
        />
        <p class="tweet__user-name" src="" alt="">${escape(tweet.user.name)}</p>
      </div>
      <p class="tweet__user-tag">${escape(tweet.user.handle)}</p>
    </header>
    <p className="tweet__content">${escape(tweet.content.text)}</p>
    <footer class="tweet__footer">
      <time class="tweet__date">${escape(
        timeago.format(tweet.created_at)
      )}</time>
      <div class="tweet__btn-wrapper">
        <button class="tweet__icon-btn tweet__icon-btn--flag">
          <i class="fa-solid fa-flag"></i>
        </button>
        <button class="tweet__icon-btn tweet__icon-btn--like">
          <i class="fa-solid fa-heart"></i>
        </button>
        <button class="tweet__icon-btn tweet__icon-btn--retweet">
          <i class="fa-solid fa-retweet"></i>
        </button>
      </div>
    </footer>
  </article>
  `);
  return $tweet;
};

// Get all tweets from server and render them
const loadTweets = () => {
  $.ajax({
    method: 'GET',
    url: '/tweets',
  })
    .then((response) => {
      return renderTweets(response);
    })
    .catch((err) => {
      console.error(err);
    });
};

// Toggles form on and off
const toggleForm = () => {
  if (isFormOpen) {
    isFormOpen = false;
    return $(`#tweet-form`).slideUp('slow');
  }
  if (!isFormOpen) {
    isFormOpen = true;
    
    // Need to wait for form to be focusable
    setTimeout(() => $(`#tweet-text`).focus());
    return $(`#tweet-form`).slideDown('slow');
  }
};

$(document).ready(function () {
  loadTweets();
  $('#tweet-form').submit(submitTweetHandler);
  $(`#form-toggle`).click(toggleForm);
});
