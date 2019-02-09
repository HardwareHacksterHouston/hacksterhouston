class Link extends React.Component {
    constructor(props) {
        super(props);
        this.state = { form: !this.props.link.id, confirm: false, link: this.props.link };
    }

    loginState() {
        return this.props.list.state.loginState;
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
            return <div className="card-text mt-2">
              <form>
                <div className="form-group">
                  <input type="text"
                         className="form-control"
                         value={this.state.editedName}
                         placeholder="Name"
                         onChange={e => this.setState({ editedName: e.target.value })} />
                </div>
                <div className="form-group">
                  <input type="text"
                         className="form-control"
                         value={this.state.editedUrl}
                         placeholder="http://example.com"
                         onChange={e => this.setState({ editedUrl: e.target.value })} />
                </div>
                <div className="form-group">
                  <input type="text"
                         className="form-control"
                         value={this.state.editedDescription}
                         placeholder="Description"
                         onChange={e => this.setState({ editedDescription: e.target.value })} />
                </div>
                <button type="button" className="btn btn-primary mr-1" onClick={() => this.saveLink()}>Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => this.setState({ form: false, error: null })}>Cancel</button>
                {this.savingIndicator()}
              </form>
            </div>;
        } else {
            return <React.Fragment>
              <h4 className="card-title">
                {this.editLink()}
                <a href={this.state.link.url}>{this.state.link.name}</a>
              </h4>
              <h6 className="card-subtitle mb-2 text-muted">{this.state.link.url}</h6>
              <p className="card-text">
                {this.state.link.description}
              </p>
            </React.Fragment>;
        }
    }

    savingIndicator() {
        if (this.state.saving) {
            return <span className="float-right">Saving...</span>;
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
              <span className="mr-2">are you sure?</span>
              <a className="mr-2" onClick={() => this.deleteLink()}>yes</a>
              <a onClick={() => this.setState({ confirm: false })}>no</a>
            </React.Fragment>;
        } else if (this.props.link.id) {
            return <a onClick={() => this.setState({ confirm: true })}>delete</a>;
        } else {
            return '---';
        }
    }

    editLink() {
        if (this.loginState().loggedIn) {
            return <span className="small float-right">
              <a onClick={() => this.openForm()}>edit</a>&nbsp;|&nbsp;
                   {this.deleteControl()}
            </span>;
        } else {
            return null;
        }
    }

    saveLink() {
        this.setState({ saving: true });
        fetch((this.props.link.id ? '/link' : '/create'), {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.editedName,
                                   url: this.state.editedUrl,
                                   description: this.state.editedDescription,
                                   id: this.props.link.id })
        }).then((response) => {
            if (response.ok) {
                response.json().then((link) => this.setState({ link }));
                this.setState({ saving: false, error: null, form: false });
            } else {
                response.text().then(err => this.setState({ saving: false, error: err }));
            }
        });
    }

    deleteLink() {
        this.setState({ deleting: true });
        fetch(`/delete/${this.state.link.id}`, { method: 'post' }).then((response) => {
            if (response.ok) {
                populateLinks();
            } else {
                response.text().then(err => this.setState({ deleting: false, confirm: false, error: err }));
            }
        });
    }

    openForm() {
        this.setState({ form: true,
                        editedName: this.props.link.name,
                        editedUrl: this.props.link.url,
                        editedDescription: this.props.link.description });
    }
}

export { Link };
