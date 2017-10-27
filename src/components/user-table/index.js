import uav from 'uav';
import router from 'uav-router';
import api from 'util/api';
import state from 'util/state';
import message from 'components/message';

function userTable() {

    const component = uav.component(`
    <div u-class="view {state.users.length ? '' : 'hidden'}">
        <h1>Users</h1>
        <table class="user-table">
            <thead>
                <tr>
                    <td>id</td>
                    <td>name</td>
                    <td>email</td>
                    <td>company</td>
                    <td>phone</td>
                    <td>website</td>
                    <td>delete</td>
                </tr>
            </thead>
            <tbody u-for="user, index in state.users">
                <tr u-onclick="{select(user)}">
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.company.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                    <td u-onclick="{remove(index)}">&times;</td>
                <tr>
            </tbody>
        </table>
    </div>`, {
        state,
        select: user => () => {

            // Navigate to the user profile
            router.set({user: user.id});

        },
        remove: index => e => {

            e.stopPropagation();

            message.warning(`Deleted ${state.users[index].name}.`);

            // Remove the user from the list
            state.users.splice(index, 1);

        }
    });

    // If we reached this view from elsewhere in the app, 
    // state.users will already be defined. If however we
    // arrived directly on this component, we need to fetch
    // the user list.
    if (!state.users.length) {

        api.get('users').then(users => {

            state.users = users;

        });

    }

    return component;

}

export default userTable;
