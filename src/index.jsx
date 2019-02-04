$(document).ready(() => {
    ReactDOM.render(<DotDisplay/>,
                    $('#content')[0]);
});

class DotInput extends React.Component {
    constructor(props) {
        super(props);
        this.onCountChanged = this.props.onCountChanged.bind(this);
    }

    updateCount(event) {
        this.props.onCountChanged(Number(event.target.value));
    }

    render() {
        return <div>
          <label>Number of dots: </label>
          <input type="number" value={this.props.value} onChange={this.updateCount.bind(this)}/>
        </div>;
    }
}

class DotDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { numDots: 0 };
    }

    updateCount(newCount) {
        this.setState({ numDots: newCount });
    }

    render() {
        const dots = [];
        for(var n=0; n<this.state.numDots; n++) {
            dots.push(<div key={n}>dot.</div>);
        }

        return <div>
          <DotInput value={this.state.numDots} onCountChanged={this.updateCount.bind(this)}/>
          {dots}
        </div>;
    }
}
