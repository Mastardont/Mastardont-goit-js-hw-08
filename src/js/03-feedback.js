import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

// застосовуємо throttle
form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormFeedback);

formOutput();

// Зберігаємо текс у сховище
function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// // Перевіряємо ємність сховища та застосовуємо його
function formOutput() {
  const saveFormValue = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (saveFormValue) {
    form[0].value = saveFormValue['email'];
    form[1].value = saveFormValue['message'];
  }
}

// Налаштування кнопки submit
// (очищення сховища та форми, виводимо ємність у консоль)
function onFormFeedback(evt) {
  // прибираємо поведінку за замовчуванням
  evt.preventDefault();

  // виводимо ємність у консоль
  console.log(localStorage.getItem(STORAGE_KEY));

  // очищення сховища та форми
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
