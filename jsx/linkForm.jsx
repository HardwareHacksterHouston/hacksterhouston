class LinkForm extends React.Component {
    constructor(props) {
        super(props);
        this.delegate = props.delegate;
        this.state = props.link;
    }

    render() {
        return <div className="card-text mt-2">
          <form>
            <div className="form-group">
              <input type="text"
                     className="form-control"
                     value={this.state.name || ''}
                     placeholder="Name"
                     onChange={e => this.setState({ name: e.target.value })} />
            </div>
            <div className="form-group">
              <input type="text"
                     className="form-control"
                     value={this.state.url || ''}
                     placeholder="http://example.com"
                     onChange={e => this.setState({ url: e.target.value })} />
            </div>
            <div className="form-group">
              <input type="text"
                     className="form-control"
                     value={this.state.description || ''}
                     placeholder="Description"
                     onChange={e => this.setState({ description: e.target.value })} />
            </div>
            <button type="button" className="btn btn-primary mr-1" onClick={() => this.saveLink()}>Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => this.setState({ form: false, error: null })}>Cancel</button>
            {this.savingIndicator()}
          </form>
        </div>;
    }

    saveLink() {
        this.delegate.save(this.state);
    }

    savingIndicator() {
        if (this.props.saving) {
            return <span className="float-right">Saving...</span>;
        }
    }
}

export { LinkForm };
