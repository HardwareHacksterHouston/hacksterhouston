class Link extends React.Component {
    constructor(props) {
        super(props);
        this.state = { form: false, confirm: false, link: this.props.link };
    }

    loginState() {
        return this.props.list.state.loginState;
    }

    render() {
        return <div className="row hackster-link mb-4">
          <div className="card col-md-8 offset-md-2 col-sm-12">
            {this.errorMessage()}
            {this.cardContent()}
          </div>
        </div>;
    }

    cardContent() {
        if (this.state.form) {
            return <div className="card-text mt-2">
              <form>
                <div className="form-group">
                  <input type="text"
                         className="form-control"
                         value={this.state.editedName}
                         onChange={e => this.setState({ editedName: e.target.value })} />
                </div>
                <div className="form-group">
                  <input type="text"
                         className="form-control"
                         value={this.state.editedUrl}
                         onChange={e => this.setState({ editedUrl: e.target.value })} />
                </div>
                <div className="form-group">
                  <input type="text"
                         className="form-control"
                         value={this.state.editedDescription}
                         onChange={e => this.setState({ editedDescription: e.target.value })} />
                </div>
                <button type="button" className="btn btn-primary mr-1" onClick={() => this.saveLink()}>Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => this.setState({ form: false, error: null })}>Cancel</button>
                {this.savingIndicator()}
              </form>
            </div>;
        } else {
            return <React.Fragment>
              <h4 className="card-title">
                {this.editLink()}
                <a href={this.state.link.url}>{this.state.link.name}</a>
              </h4>
              <h6 className="card-subtitle mb-2 text-muted">{this.state.link.url}</h6>
              <p className="card-text">
                {this.state.link.description}
              </p>
            </React.Fragment>;
        }
    }

    savingIndicator() {
        if (this.state.saving) {
            return <span className="float-right">Saving...</span>;
        }
    }

    errorMessage() {
        if (this.state.error) {
            return <div className="alert alert-danger mt-2" role="alert">{this.state.error}</div>;
        }
    }

    deleteControl() {
        if (this.state.deleting) {
            return 'deleting...';
        } else if (this.state.confirm) {
            return <React.Fragment>
              <span className="mr-2">are you sure?</span>
              <a className="mr-2" onClick={() => this.deleteLink()}>yes</a>
              <a onClick={() => this.setState({ confirm: false })}>no</a>
            </React.Fragment>;
        } else {
            return <a onClick={() => this.setState({ confirm: true })}>delete</a>;
        }
    }

    editLink() {
        if (this.loginState().loggedIn) {
            return <span className="small float-right">
              <a onClick={() => this.openForm()}>edit</a>&nbsp;|&nbsp;
                   {this.deleteControl()}
            </span>;
        } else {
            return null;
        }
    }

    saveLink() {
        this.setState({ saving: true });
        fetch('/link', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.editedName,
                                   url: this.state.editedUrl,
                                   description: this.state.editedDescription,
                                   id: this.props.link.id })
        }).then((response) => {
            if (response.ok) {
                response.json().then((link) => this.setState({ link }));
                this.setState({ saving: false, error: null, form: false });
            } else {
                response.text().then(err => this.setState({ saving: false, error: err }));
            }
        });
    }

    deleteLink() {
        this.setState({ deleting: true });
        fetch(`/delete/${this.state.link.id}`, { method: 'post' }).then((response) => {
            if (response.ok) {
                populateLinks();
            } else {
                response.text().then(err => this.setState({ deleting: false, confirm: false, error: err }));
            }
        });
    }

    openForm() {
        this.setState({ form: true,
                        editedName: this.props.link.name,
                        editedUrl: this.props.link.url,
                        editedDescription: this.props.link.description });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

class LinkList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginState: {}, links: this.props.links };
        PubSub.subscribe('loggedIn', (_, loginState) => this.setState({ loginState }));
    }

    render() {
        const links = [];

        this.state.links.forEach((link) => {
            links.push(<Link link={link} list={this} key={link.id}/>);
        });

        return <div>{links}</div>;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////////

const linkList = ReactDOM.render(<LinkList links={[]}/>, document.getElementById('links'));
const loginLink = ReactDOM.render(<LoginLink loginState={{}} />, document.getElementById('login_link'));

const populateLinks = () => fetch('/links')
    .then(response => response.json())
    .then(links => linkList.setState({ links }));

populateLinks();

fetch('/loginStatus')
    .then(response => response.json())
    .then(status => loginLink.setState({ loginState: status }));
