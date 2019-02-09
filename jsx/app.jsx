import '@babel/polyfill';
import { LinkList } from './linkList.jsx';
import { LoginLink } from './loginLink.jsx';

class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = { links: [], loginState: {} };
        this.fetchLinks();
    }

    fetchLinks() {
        fetch('/links')
            .then(response => response.json())
            .then(links => this.setState({ links }));
    }

    fetchLogin() {
        fetch('/loginStatus')
            .then(response => response.json())
            .then(status => this.setState({ loginState: status }));
    }

    async postJson(path, obj) {
        const response = await fetch(path, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        });
        const text = await response.text();

        if (response.ok) {
            return text;
        } else {
            throw text;
        }
    }

    login(username, password) {
        return this.postJson('/login', { username, password });
    }

    render() {
        return <React.Fragment>
          <LinkList links={this.state.links} controller={this}/>
          <LoginLink loginState={this.state.loginState} controller={this} />
        </React.Fragment>;
    }
}

ReactDOM.render(<Controller/>, document.getElementById('links'));

