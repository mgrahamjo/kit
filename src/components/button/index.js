import uav from 'uav';

export default callback => {

    const model = uav.model({callback});

    return uav.component(model, '<button onclick={callback}>Click here</button>');

};
