import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const btnStart = document.querySelector('button[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

btnStart.disabled = true;

const timer = {
  interval: null,
  start() {
    const startTimer = fp.selectedDates[0].getTime();
    this.interval = setInterval(() => {
      const currentDate = Date.now();
      const deltaTime = startTimer - currentDate;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      daysValue.textContent = days;
      hoursValue.textContent = hours;
      minutesValue.textContent = minutes;
      secondsValue.textContent = seconds;
      console.log(`${days}::${hours}::${minutes}::${seconds}`);
    }, 1000);
  },
  close() {
    clearInterval(this.interval);
  },
};

const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return Notiflix.Notify.failure('Please choose a date in the futur!');
    }
    btnStart.disabled = false;
    btnStart.addEventListener('click', timer.start());
  },
});

function numberOfDigits(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
