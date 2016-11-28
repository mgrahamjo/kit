import u from '../util/u';
import greeting from './greeting';

let clickCount = 0;

const click = text => u.on('click', (el, e) => {

  console.log('element:');
  console.log(el);
  console.log('event:');
  console.log(e);
  console.log('button text:');
  console.log(text);

  clickCount++;

  greeting.update(clickCount);

});

export default text => {

  return u.html`
  <button ${click(text)}>
    ${text}
  </button>`;

};
