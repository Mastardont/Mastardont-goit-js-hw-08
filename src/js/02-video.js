import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('timeupdate', function (data) {
  // Зберігаємо час відтворення в локальне сховище
  localStorage.setItem(STORAGE_KEY, data.seconds);
});

player.on('play', function () {
  // Перевіряємо наявність збереженого часу відтворення
  if (localStorage.getItem(STORAGE_KEY)) {
    // Використовуємо збережений час відтворення.
    player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
  }
});

player.on('ended', function () {
  // Видаляємо збережений час відтворення з локального сховища по закінченню відео
  localStorage.removeItem(STORAGE_KEY);
});
