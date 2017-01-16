import greeting from 'components/greeting';
import api from 'util/api';
import url from 'util/url';

function app(params) {

    greeting(params);

}

api.getUsers().then(users => console.log(users));

url.setApp(app);
