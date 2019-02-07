class Link extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginState: this.props.loginState };
        PubSub.subscribe('loggedIn', (_, loginState) => this.setState({ loginState }));
    }

    render() {
        return <div className="row hackster-link">
          <div className="card col-md-8 offset-md-2 col-sm-12">
            <h4 className="card-title">
              <a href={this.props.link.url}>{this.props.link.name}</a>
            </h4>
            <h6 className="card-subtitle mb-2 text-muted">{this.props.link.url}</h6>
            <p className="card-text">
              {this.props.link.description}
            </p>
          </div>
        </div>;
    }
}

class LinkList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginState: {}, links: this.props.links };
        PubSub.subscribe('loggedIn', (_, loginState) => this.setState({ loginState }));
    }

    render() {
        const links = [];

        this.state.links.forEach((link) => {
            links.push(<Link link={link} key={links.length / 2 + 1}/>);
        });

        return <div>{links}</div>;
    }
}

class LoginLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginState: this.props.loginState };
    }

    render() {
        PubSub.publish('loggedIn', this.state.loginState);
        if (this.state.loginState.loggedIn) {
            return <a href="#" className="hackster-logout-link" onClick={() => this.logout()}>
              Logout {this.state.loginState.currentUser}
            </a>;
        } else {
            const link = <a href="#"
                            className="hackster-login-link"
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
        } else {
            return '';
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
        fetch('/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        }).then((response) => {
            if (response.ok) {
                $('#loginModal').modal('hide');
                this.setState({ loginState: { loggedIn: true, currentUser: this.state.username }, error: null });
            } else {
                response.text().then(err => this.setState({ error: err }));
            }
        });
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

const linkList = ReactDOM.render(<LinkList links={[]}/>, document.getElementById('links'));
const loginLink = ReactDOM.render(<LoginLink loginState={{}} />, document.getElementById('login_link'));

fetch('/links')
    .then(response => response.json())
    .then(links => linkList.setState({ links }));

fetch('/loginStatus')
    .then(response => response.json())
    .then(status => loginLink.setState({ loginState: status }));
