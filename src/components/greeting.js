import u from '../util/u';

function counter(count) {

  return u.html`You've clicked this button ${count} time${count === 1 ? '' : 's'}.`;

}

function greeting() {

  return u.html`
    <h3>Hi! You are using the ${navigator.platform} platform.</h3>
    <p>${counter(0)}</p>`;

}

greeting.update = count => {
  
  u('p').innerHtml(counter(count));

};

export default greeting;
