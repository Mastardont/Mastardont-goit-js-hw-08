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

  if (form[0].value) {
    formData[form[0].name] = form[0].value;
  } else {
    formData[form[0].name] = ' ';
  }

  if (form[1].value) {
    formData[form[1].name] = form[1].value;
  } else {
    formData[form[1].name] = ' ';
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// // Перевіряємо ємність сховища та застосовуємо його
function formOutput() {
  const saveFormValue = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (saveFormValue) {
    form[0].value = saveFormValue['email'];
    form[1].value = saveFormValue['message'];
  }

  if (form[0].value) {
    formData[form[0].name] = form[0].value;
  } else {
    formData[form[0].name] = ' ';
  }

  if (form[1].value) {
    formData[form[1].name] = form[1].value;
  } else {
    formData[form[1].name] = ' ';
  }
}

// Налаштування кнопки submit
// (очищення сховища та форми, виводимо ємність у консоль)
function onFormFeedback(evt) {
  // прибираємо поведінку за замовчуванням
  evt.preventDefault();

  // виводимо ємність у консоль
  console.log(formData);

  // очищення сховища та форми
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
