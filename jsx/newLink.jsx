import { LinkForm } from './linkForm.jsx';
import { postJson } from './utils.jsx';

class NewLink extends React.Component {
    constructor(props) {
        super(props); // controller and list
        this.state = { saving: false };
    }

    render() {
        return <div className="row hackster-link mb-4">
          <div className="card col-md-8 offset-md-2 col-sm-12">
            {this.errorMessage()}
            <LinkForm delegate={this} link={{}} saving={this.state.saving} />
          </div>
        </div>;
    }

    errorMessage() {
        if (this.state.error) {
            return <div className="alert alert-danger mt-2" role="alert">{this.state.error}</div>;
        }
    }

    async save(link) {
        this.setState({ saving: true });
        try {
            const newLink = JSON.parse(await postJson('/create', link));
            this.props.controller.insertLink(newLink);
            this.props.list.closeForm();
        } catch(err) {
            this.setState({ error: err });
        }
    }

    closeForm() {
        this.props.list.closeForm();
    }
}

export { NewLink };
