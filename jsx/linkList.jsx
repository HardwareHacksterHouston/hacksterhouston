import { Link } from './link.jsx';

class LinkList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginState: {} };
        PubSub.subscribe('loggedIn', (_, loginState) => this.setState({ loginState }));
        this.newCount = 0;
    }

    render() {
        const links = [];

        this.props.links.forEach((link) => {
            links.push(<Link link={link} list={this} key={link.id || link.newCount}/>);
        });

        return <div>{links}{this.createControl()}</div>;
    }

    createControl() {
        if (this.state.loginState.loggedIn) {
            return <div className="row hackster-link mb-4">
              <div className="card col-md-8 offset-md-2 col-sm-12">
                <p className="card-text text-center">
                  <a onClick={() => this.createLink()}>Add new link</a>
                </p>
              </div>
            </div>;
        }
    }

    createLink() {
        this.setState({ links: this.props.links.concat([{ newCount: `new-${++this.newCount}` }]) });
    }
}

export { LinkList };
