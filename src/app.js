import u from './util/u';
import greeting from './components/greeting';
import button from './components/button';

u('.app').innerHtml(greeting() + button('click me'));
