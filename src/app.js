import 'util/polyfills';
import uav from 'uav';
import router from 'uav-router';
import userTable from 'components/user-table';
import userProfile from 'components/user-profile';
import message from 'components/message';

/**
 * Our app has a wrapper component which contains
 * the elements which are shared by all views, such
 * as a header and footer.
 */
const app = uav.component(`
<div>
    {message}
    <header>
        <a u-onclick="{home}">My App</a>
    </header>
    {view()}
    <footer>Footer.</footer>
</div>
`, {
    message,
    view: null,
    home: () => router.set()
}, '#app');

/**
 * Here we register our app rendering code with the router.
 * We can use the URL params, as well as any other information
 * we have, to decide what view to render.
 *
 * This function will be called when the URL changes or the
 * page is refreshed.
 */
router.init(params => {

    app.view = params.user ? userProfile : userTable;

});
