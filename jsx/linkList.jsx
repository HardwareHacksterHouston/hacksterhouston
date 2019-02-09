import { Link } from './link.jsx';
import { NewLink } from './newLink.jsx';

class LinkList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginState: {} };
    }

    render() {
        const links = [];
        let newCount = 0;

        this.props.links.forEach((link) => {
            links.push(<Link
                           link={link}
                           key={link.new ? `new-${++newCount}`: link.id}
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
}

export { LinkList };
