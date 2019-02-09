import '@babel/polyfill';
import { LinkList } from './linkList.jsx';
import { LoginController } from './loginController.jsx';
import { postJson } from './utils.jsx';

class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [],
            loggedIn: false,
            currentUser: null
        };
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

    loggedIn(username) {
        this.setState({ loggedIn: true, currentUser: username });
    }

    loggedOut() {
        this.setState({ loggedIn: false });
    }

    setLink(id, link) {
        const index = this.state.links.findIndex(ln => ln.id == id);
        const links = this.state.links;
        links[index] = link;
        this.setState({ links });
    }

    removeLink(id) {
        const index = this.state.links.findIndex(ln => ln.id == id);
        const links = this.state.links;
        links.splice(index, 1);
        this.setState({ links });        
    }

    insertLink(link) {
        const links = this.state.links;
        links.push(link);
        this.setState({ links });
    }

    render() {
        return <React.Fragment>
          <LinkList
              loggedIn={this.state.loggedIn}
              links={this.state.links}
              controller={this}/>
          <LoginController
              controller={this}
              loggedIn={this.state.loggedIn}
              currentUser={this.state.currentUser}/>
        </React.Fragment>;
    }
}

ReactDOM.render(<Controller/>, document.getElementById('links'));

