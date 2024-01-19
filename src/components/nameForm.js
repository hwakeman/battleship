export default function nameForm() {
  const nameFormDiv = document.createElement('div');
  nameFormDiv.classList.add('name-form-container');

  const form = document.createElement('form');
  form.classList.add('name-form');
  form.onsubmit = function () {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    nameFormDiv.style.display = 'none';
  };

  const nameInput = document.createElement('input');
  nameInput.classList.add('name-input');
  nameInput.placeholder = 'Name:';
  form.appendChild(nameInput);

  const submitButton = document.createElement('button');
  submitButton.classList.add('submit-button');
  submitButton.innerHTML = 'Submit';
  form.appendChild(submitButton);

  nameFormDiv.appendChild(form);

  const background = document.createElement('div');
  background.classList.add('name-form-background');

  nameFormDiv.appendChild(background);

  return nameFormDiv;
}
