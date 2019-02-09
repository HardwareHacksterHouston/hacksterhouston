class LoginLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        PubSub.publish('loggedIn', this.state.loginState);
        if (this.props.loginState.loggedIn) {
            return <a href="#" className="hackster-logout-link" onClick={() => this.logout()}>
              Logout {this.props.loginState.currentUser}
            </a>;
        } else {
            const link = <a href="#"
                            className="hackster-login-link mt-2"
                            onClick={() => $('#loginModal').modal()}>
              Login
            </a>;

            const modal = <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body">{this.errorMessage()}{this.loginForm()}</div>
                </div>
              </div>
            </div>;

            return <div>{link}{modal}</div>;
        }
    }

    errorMessage() {
        if (this.state.error) {
            return <div className="alert alert-danger" role="alert">{this.state.error}</div>;
        }
    }

    loginForm() {
        return <form>
          <div className="form-group">
            <input type="text"
                   className="form-control"
                   id="username"
                   placeholder="Username"
                   onChange={e => this.setState({ username: e.target.value })} />
          </div>
          <div className="form-group">
            <input type="password"
                   className="form-control"
                   id="password"
                   placeholder="Password"
                   onChange={e => this.setState({ password: e.target.value })} />
          </div>
          <button type="button" className="btn btn-primary" onClick={() => this.login()}>Login</button>
        </form>;
    }

    async login() {
        try {
            await this.props.controller.login(this.state.username, this.state.password);
            $('#loginModal').modal('hide');
            //this.setState({ error: null });
            this.controller.setState({ loginState: { loggedIn: true, currentUser: this.state.username } });
        } catch (err) {
            this.setState({ error: err });
        }
    }

    logout() {
        fetch('/logout', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            if (response.ok) {
                this.setState({ loginState: { loggedIn: false, currentUser: null } });
            }
        })
    }
}

export { LoginLink };
