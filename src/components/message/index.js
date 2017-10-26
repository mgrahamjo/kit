import uav from 'uav';

function message() {

    const component = uav.component(`
    <div u-class="message {visible} {klass}">
        {content}
        <i class="close" u-onclick={close}>&times;</i>
    </div>`, {
        visible: false,
        content: null,
        klass: null,
        close: () => {

            component.visible = false;

        }
    });

    function show(klass) {

        return content => {

            component.content = uav.component(`<span>${content}</span>`);

            component.klass = klass;

            // Animate the message in:
            component.visible = true;

            // Close the message after 5 seconds:
            setTimeout(component.close, 5000);

        };

    }

    message.error = show('error');
    message.warning = show('warning');
    message.success = show('success');

    return component;

}

export default message;
