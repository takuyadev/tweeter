/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
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

const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

const createTweetElement = function (tweet) {
  let $tweet = $(`
  <article class="tweet">
    <header class="tweet__header">
      <div class="tweet__user-info">
        <img
          class="tweet__user-avatar"
          src="${tweet.user.avatars}"
          alt="Avatar of ${tweet.user.name}"
        />
        <p class="tweet__user-name" src="" alt="">${tweet.user.name}</p>
      </div>
      <p class="tweet__user-tag">${tweet.user.handle}</p>
    </header>
    <p className="tweet__content">${tweet.content.text}</p>
    <footer class="tweet__footer">
      <time class="tweet__date">${tweet.created_at}</time>
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

$(document).ready(function () {
  renderTweets(data);
  $('#tweet-form').submit((event) => {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      data: $('#tweet-form').serialize(),
      url: '/tweets',
      success: () => {
        console.log('True');
      },
      error: () => {
        console.log('Error');
      },
    });
  });
});
