import uav from 'uav';
import button from 'components/button';

function greeting(params) {

    const model = uav.model({
        params,
        count: 0,
        button: button(() => {
            model.count++;
        })
    });

    uav.component(model, `
        <div class="greeting">
            <h3>Hi! You are using the ${navigator.platform} platform.</h3>
            <div loop="params" as="key.val">
                <p>{key} = {val}</p>
            </div>
            <p>You've clicked this button {count} time{count === 1 ? '' : 's'}.</p>
            <button></button>
        </div>`,
        '#app');

}

export default greeting;
