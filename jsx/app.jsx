import '@babel/polyfill';
import { LinkList } from './linkList.jsx';
import { LoginController } from './loginController.jsx';
import { postJson } from './utils.jsx';

class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = { links: [] };
        this.fetchLinks();
        this.fetchLogin();
    }

    fetchLinks() {
        fetch('/links')
            .then(response => response.json())
            .then(links => this.setState({ links }));
    }

    fetchLogin() {
        fetch('/loginStatus')
            .then(response => response.json())
            .then(({ loggedIn, currentUser }) => this.setState({ loggedIn, currentUser }));
    }

    render() {
        //<LinkList links={this.state.links} controller={this}/>
        return <React.Fragment>
          <LoginController
              controller={this}
              loggedIn={this.state.loggedIn}
              currentUser={this.state.currentUser}/>
        </React.Fragment>;
    }
}

ReactDOM.render(<Controller/>, document.getElementById('links'));

