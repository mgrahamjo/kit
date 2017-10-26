import uav from 'uav';
import api from 'util/api';
import state from 'util/state';
import router from 'util/router';

function userTable() {

    uav.component(`
    <div>
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

            router.set({user: user.id})();

        },
        remove: index => e => {

            e.stopPropagation();

            state.users.splice(index, 1);

        }
    }, '#app');

    if (!state.users) {

        api.get('users').then(users => {

            state.users = users;

        });

    }

}

export default userTable;
