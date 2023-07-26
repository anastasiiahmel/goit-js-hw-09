import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', currentPromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function currentPromise(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;

  let valueDelay = Number(delay.value);
  let valueStep = Number(step.value);
  let valueAmount = Number(amount.value);

  for (let i = 1; i <= valueAmount; i += 1) {
    createPromise(i, valueDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    valueDelay += valueStep;
    evt.currentTarget.reset();
  }
}
