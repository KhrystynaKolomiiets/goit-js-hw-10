import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const datetimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;
let userSelectedDate = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if (selectedDate <= new Date())  {
          iziToast.error({
              title: 'Помилка',
              message: 'Будь ласка, виберіть дату в майбутньому!',
              position: 'topRight',
              timeout: 3000,
          });
          btnStart.disabled = true;
          userSelectedDate = null;
      } else {
          userSelectedDate = selectedDate;
          btnStart.disabled = false;
      }
  },
};

flatpickr('#datetime-picker', options);
btnStart.addEventListener('click', handleClick);

function handleClick() {
    if (!userSelectedDate) {
        return;
    }
    btnStart.disabled = true;
    datetimePicker.disabled = true;
    const startTime = userSelectedDate;
    const intervalId = setInterval(() => {
        const currentTime = new Date;
        const deltaTime = startTime - currentTime;
        if (deltaTime <= 0) {
            clearInterval(intervalId);
            update({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            datetimePicker.disabled = false;
            iziToast.info({
              title: 'Завершено',
              message: 'Відлік часу закінчився!',
              position: 'topRight',
            
            });
            return;
        }
        const time = convertMs(deltaTime);
        update(time);
       
    }, 1000)
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
function pad(value) {
   return String(value).padStart(2, '0')
}
function update({ days, hours, minutes, seconds }) {
    spanDays.textContent = pad(days);
    spanHours.textContent = pad(hours);
    spanMinutes.textContent = pad(minutes);
    spanSeconds.textContent = pad(seconds);
}

