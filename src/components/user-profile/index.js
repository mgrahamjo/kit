import uav from 'uav';
import router from 'uav-router';
import api from 'util/api';
import state from 'util/state';
import message from 'components/message';

function userTable() {

    const userId = parseInt(router.params.user);

    const getUser = () => state.users.filter(user => user.id === userId)[0];

    const component = uav.component(`
    <div class="user-profile view">
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
        save: e => {

            // Don't let the form actually post
            e.preventDefault();

            message.success(`Saved changes to ${component.user.name}.`);

            // Calling router.set() with no arguments is equivalent
            // to saying "remove all params from the URL and re-render"
            router.set();

        },
        remove: e => {

            // Don't let the form actually post
            e.preventDefault();

            const userIndex = state.users.indexOf(component.user);

            // Remove the user from the user list
            state.users.splice(userIndex, 1);

            message.warning(`Deleted ${component.user.name}.`);

            // Calling router.set() with no arguments is equivalent
            // to saying "remove all params from the URL and re-render"
            router.set();

        }
    });

    // If we reached this view from elsewhere in the app, 
    // state.users will already be defined. If however we
    // arrived directly on this component, we need to fetch
    // the user list.
    if (!state.users.length) {

        api.get('users').then(users => {

            state.users = users;

            component.user = getUser();

        });

    }

    return component;

}

export default userTable;
