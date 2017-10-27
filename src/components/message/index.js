import uav from 'uav';

const message = uav.component(`
<div u-class="message {visible} {klass}">
    {content}
    <i class="close" u-onclick={close}>&times;</i>
</div>`, {
    visible: false,
    content: null,
    klass: null,
    close: () => {

        message.visible = false;

    }
});

function show(content, klass) {

    message.content = uav.component(`<span>${content}</span>`);

    message.klass = klass;

    // Animate the message in:
    message.visible = true;

    // Close the message after 5 seconds:
    setTimeout(message.close, 5000);

}

message.error = content => show(content, 'error');
message.warning = content => show(content, 'warning');
message.success = content => show(content, 'success');

export default message;
