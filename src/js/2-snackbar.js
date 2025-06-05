import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const { delay, state } = event.target.elements;
    const delayValue = +delay.value;
    const stateValue = state.value;

    setTimeout(() => {
        new Promise((resolve, reject) => {
            if (stateValue === 'fulfilled') {
                resolve(delayValue)
            } else {
                reject(delayValue)
            }
        })
            .then(delayValue => {
                iziToast.success({
                    title: '✅ Fulfilled',
                    message: `Fulfilled promise in ${delayValue}ms`,
                    position: 'topRight',
                    backgroundColor: '#59A10D',
                    titleColor: '#fff',
                    messageColor: '#fff',
                });
            })
            .catch(delayValue => {
                iziToast.error({
                    title: '❌ Rejected',
                    message: `Rejected promise in ${delayValue}ms`,
                    position: 'topRight',
                    backgroundColor: '#EF4040',
                    titleColor: '#fff',
                    messageColor: '#fff',
                });
            });
        
    }, delayValue);
    event.target.reset();
}