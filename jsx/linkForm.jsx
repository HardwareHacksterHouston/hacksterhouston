class LinkForm extends React.Component {
    constructor(props) {
        // saving, delegate, link (optional)
        // saving is whether we're waiting for a server response
        // delegate should have a closeForm and a save
        // link is the initial state of the form
        super(props);
        this.state = props.link || {}; // name, url, and description
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
            <button type="button" className="btn btn-primary mr-1" onClick={() => this.props.delegate.save(this.state)}>Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => this.props.delegate.closeForm()}>Cancel</button>
            {this.savingIndicator()}
          </form>
        </div>;
    }

    savingIndicator() {
        if (this.props.saving) {
            return <span className="float-right">Saving...</span>;
        }
    }
}

export { LinkForm };
