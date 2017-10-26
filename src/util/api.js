import ajax from 'util/ajax';
import constants from 'util/constants';
import message from 'components/message';

export default {

    get: path => 
        ajax.get(`${constants.apiURL}/${path}`)
            .catch(err => message.error(err))

};
