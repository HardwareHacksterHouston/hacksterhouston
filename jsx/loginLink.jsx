class LoginLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        PubSub.publish('loggedIn', this.state.loginState);
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
