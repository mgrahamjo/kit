import uav from 'uav';
import button from 'components/button';

export default () => {

    const model = uav.model({
        count: 0,
        button: button(() => {
            model.count++;
        })
    });

    uav.component(model, `
        <div class="greeting">
            <h3>Hi! You are using the ${navigator.platform} platform.</h3>
            <p>You've clicked this button {count} time{count === 1 ? '' : 's'}.</p>
            <button></button>
        </div>`,
        '#app');

};
