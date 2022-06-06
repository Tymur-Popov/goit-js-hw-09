import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector(`.form`),
  button: document.querySelector(`button`),
  inputDelay: document.querySelector(`input[name="delay"]`),
  inputStep: document.querySelector(`input[name="step"]`),
  inputAmount: document.querySelector(`input[name="amount"]`)
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

refs.form.addEventListener('submit', onFormSubmit);
    
function onFormSubmit(evt) {
  evt.preventDefault();
  const step = Number(refs.inputStep.value);
  const delay = Number(refs.inputDelay.value);
  const amount = Number(refs.inputAmount.value);
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + i * step);
  }
}