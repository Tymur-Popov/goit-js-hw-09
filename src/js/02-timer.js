import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]')
};

let selectedDate = 0;
let timerId = 0;
// flatpickr - выбор даты в инпуте + проверка или не дата в прошлом
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    if (new Date() > selectedDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
     };
    // console.log(selectedDates[0].getTime());
  },
};
flatpickr(refs.input, options);
// flatpickr - конец
// отнимаем выбранную дату от текущей и каждую секунду выводим
refs.startBtn.addEventListener('click', onStartClick);
function onStartClick() {
  refs.input.disabled = true;
  refs.startBtn.disabled = true;
  timerId = setInterval(() => {
    const targetDate = selectedDate - new Date();
    if (targetDate <= 1000) {
      clearInterval(timerId);
      Notiflix.Notify.success('the time has come');
      refs.input.disabled = false;
      refs.startBtn.disabled = false;
     };
    const { days, hours, minutes, seconds} = convertMs(targetDate);
    console.log(days, hours, minutes, seconds);

    refs.days.textContent = modifyTime(days);
    refs.hours.textContent  = modifyTime(hours);
    refs.minutes.textContent  = modifyTime(minutes);
    refs.seconds.textContent  = modifyTime(seconds);   

  }, 1000);
 };

function modifyTime(time) {
  return String(time).padStart(2,0);
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