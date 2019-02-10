import { LinkForm } from './linkForm.jsx';
import { postJson } from './utils.jsx';

class Link extends React.Component {
    constructor(props) {
        super(props); // link, controller, editable, first, last
        this.state = {
            form: false, // Whether to show an edit form
            confirm: false, // Are we trying to confirm a delete?
            saving: false, // Waiting for a server response from a save
            deleting: false, // Waiting for a server response from a delete
            error: null // Error message from the last server response
        };
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
            return <LinkForm delegate={this} link={this.props.link} saving={this.state.saving} />;
        } else {
            return <React.Fragment>
              <h4 className="card-title">
                {this.editLink()}
                <a href={this.props.link.url}>{this.props.link.name}</a>
              </h4>
              <h6 className="card-subtitle mb-2 text-muted">{this.props.link.url}</h6>
              <p className="card-text">
                {this.props.link.description}
              </p>
            </React.Fragment>;
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
              <span key="s4" className="mr-2">are you sure?</span>
              <a key="d2" className="mr-2" onClick={() => this.deleteLink()}>yes</a>
              <a key="d3" onClick={() => this.setState({ confirm: false })}>no</a>
            </React.Fragment>;
        } else {
            return <a key="d1" onClick={() => this.setState({ confirm: true })}>delete</a>;
        }
    }

    editLink() {
        if (this.props.editable) {
            const controls = [];
            controls.push(<a key="1" onClick={() => this.openForm()}>edit</a>);
            controls.push(<span key="s1">&nbsp;|&nbsp;</span>);
            controls.push(this.deleteControl());

            if(!this.props.first) {
                controls.push(<span key="s2">&nbsp;|&nbsp;</span>);
                controls.push(<a key="2" onClick={() => this.props.controller.move(this.props.link.id, 'up')}>up</a>);
            }

            if(!this.props.last) {
                controls.push(<span key="s3">&nbsp;|&nbsp;</span>);
                controls.push(<a key="3" onClick={() => this.props.controller.move(this.props.link.id, 'down')}>down</a>);
            }
            
            return <span className="small float-right">{controls}</span>;
        } else {
            return null;
        }
    }

    async save(link) {
        this.setState({ saving: true });
        try {
            const newLink = JSON.parse(await postJson('/link', link));
            this.props.controller.setLink(this.props.link.id, newLink);
            this.setState({ error: null, form: false });
        } catch(err) {
            this.setState({ error: err });
        }
        this.setState({ saving: false });
    }

    async deleteLink() {
        this.setState({ deleting: true });
        const response = await fetch(`/delete/${this.props.link.id}`, { method: 'post' });
        if (response.ok) {
            this.props.controller.removeLink(this.props.link.id);
        } else {
            const err = await response.text();
            this.setState({ deleting: false, confirm: false, error: err });
        }
    }

    openForm() {
        this.setState({ form: true });
    }

    closeForm() {
        this.setState({ form: false, error: null });
    }
}

export { Link };
