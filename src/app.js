import greeting from 'components/greeting';
import api from 'util/api';

greeting();

api.getUsers().then(users => console.log(users));
