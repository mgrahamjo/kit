import uav from 'uav';
import api from 'util/api';
import state from 'util/state';
import router from 'util/router';

function userTable(userId) {

    userId = parseInt(userId);

    const getUser = () => state.users.filter(user => user.id === userId)[0];

    const component = uav.component(`
    <div class="user-profile">
        <h1>User</h1>
        <form u-onsubmit="{save}">
            <fieldset>
                <label>id</label>
                <input type="text" u-bind="user.id"/>
            </fieldset>
            <fieldset>
                <label>name</label>
                <input type="text" u-bind="user.name"/>
            </fieldset>
            <fieldset>
                <label>email</label>
                <input type="text" u-bind="user.email"/>
            </fieldset>
            <fieldset>
                <label>company</label>
                <input type="text" u-bind="user.company.name"/>
            </fieldset>
            <fieldset>
                <label>phone</label>
                <input type="text" u-bind="user.phone"/>
            </fieldset>
            <fieldset>
                <label>website</label>
                <input type="text" u-bind="user.website"/>
            </fieldset>
            <input type="submit" value="save"/>
            <button u-onclick="{remove}">delete</button>
        </form>
    </div>`, {
        user: getUser(),
        save: () => {

            router.clear('user');

        },
        remove: () => {

            state.users.splice(state.users.indexOf(component.user), 1);

            router.clear('user');

        }
    }, '#app');

    if (!state.users) {

        api.get('users').then(users => {

            state.users = users;

            component.user = getUser();

        });

    }

}

export default userTable;
