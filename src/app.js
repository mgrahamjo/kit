import 'util/polyfills';
import router from 'util/router';
import userTable from 'components/user-table';
import userProfile from 'components/user-profile';

function app(params) {

    if (params.user) {

        userProfile(params.user);

    } else {

        userTable();

    }

}

router.init(app);
