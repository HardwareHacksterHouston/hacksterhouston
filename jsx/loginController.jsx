import { LoginLink } from './loginLink.jsx';
import { LoginModal } from './loginModal.jsx';
import { postJson } from './utils.jsx';

class LoginController extends React.Component {
    constructor(props) {
        super(props); // controller, loggedIn, currentUser
        this.state = { error: null };
    }

    render() {
        if (this.props.loggedIn) {
            return <LoginLink loggedIn="true" username={this.props.currentUser} controller={this}/>;
        } else {
            return <React.Fragment>
              <LoginLink controller={this}/>
              <LoginModal controller={this} error={this.state.error}/>
            </React.Fragment>;
        }
    }

    async login(username, password) {
        try {
            await postJson('/login', { username, password });
            $('#loginModal').modal('hide');
            this.setState({ error: null });
            this.props.controller.loggedIn(username);
        } catch (err) {
            this.setState({ error: err });
        }
    }

    async logout() {
        await postJson('/logout', {});
        this.props.controller.loggedOut();
    }

    openModal() {
        $('#loginModal').modal('show');
    }
}

export { LoginController };
