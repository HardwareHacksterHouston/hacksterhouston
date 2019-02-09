class LoginModal extends React.Component {
    constructor(props) {
        super(props); // error and controller
        this.state = {};
    }

    render() {
        return <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-hidden="false">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">{this.errorMessage()}{this.loginForm()}</div>
            </div>
          </div>
        </div>;
    }

    errorMessage() {
        if (this.props.error) {
            return <div className="alert alert-danger" role="alert">{this.props.error}</div>;
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

    login() {
        this.props.controller.login(this.state.username, this.state.password);
    }
}

export { LoginModal };
