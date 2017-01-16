import uav from 'uav';

function button(callback) {

    const model = uav.model({
        callback
    });

    return uav.component(model, '<button onclick={callback}>Click here</button>');

}

export default button;
