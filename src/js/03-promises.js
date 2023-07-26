const form = document.querySelector('.form');
const btn = document.querySelector('button');

btn.addEventListener('click', onMeNap);

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

function onMeNap(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;
  let valueDelay = Number(delay.value);
  let valueStep = Number(step.value);
  let valueAmount = Number(amount.value);

  for (let i = 1; i <= valueAmount; i += 1) {
    createPromise(i, valueDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    // evt.currentTarget.reset();
    valueDelay += valueStep;
  }
}
