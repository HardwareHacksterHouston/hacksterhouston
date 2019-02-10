import { Link } from './link.jsx';
import { NewLink } from './newLink.jsx';

class LinkList extends React.Component {
    constructor(props) {
        super(props); // controller, links, loggedIn
        this.state = { loginState: {} };
    }

    render() {
        const links = [];
        const firstLinkId = this.props.links.length > 0 ? this.props.links[0].id : null;
        const lastLinkId = this.props.links.length > 0 ? this.props.links[this.props.links.length - 1].id : 0;

        this.props.links.forEach((link) => {
            links.push(<Link
                           link={link}
                           key={link.id}
                           first={link.id === firstLinkId}
                           last={link.id === lastLinkId}
                           controller={this.props.controller}
                           editable={this.props.loggedIn}/>);
        });

        return <div>
          {links}
          {this.createControl()}
        </div>;
    }

    createControl() {
        if (this.state.newForm) {
            return <NewLink list={this} controller={this.props.controller}/>;
        } else if (this.props.loggedIn) {
            return <div className="row hackster-link mb-4">
              <div className="card col-md-8 offset-md-2 col-sm-12">
                <p className="card-text text-center">
                  <a onClick={() => this.setState({ newForm: true })}>Add new link</a>
                </p>
              </div>
            </div>;
        }
    }

    closeForm() {
        this.setState({ newForm: false });
    }
}

export { LinkList };
