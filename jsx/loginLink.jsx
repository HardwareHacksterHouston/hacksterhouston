class LoginLink extends React.Component {
    constructor(props) {
        super(props); // controller, loggedIn, username
    }

    render() {
        if (this.props.loggedIn === "true") {
            return <a href="#" className="hackster-logout-link" onClick={() => this.props.controller.logout()}>
              Logout {this.props.username}
            </a>;
        } else {
            const link = <a href="#"
                            className="hackster-login-link mt-2"
                            onClick={() => this.props.controller.openModal()}>
              Login
            </a>;
            return link;

        }
    }
}

export { LoginLink };
