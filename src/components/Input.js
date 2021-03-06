import React from 'react';

export default class DetailsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dirty:false,
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange({ target: {value}}) {
        const { onChange } = this.props;
        this.setState({
            dirty: true,
        })
        onChange(value);
    }

    render() {
        const { label, value = '', validationMessage, formDirty, validate} = this.props;
        const { dirty } = this.state;

        const showError = !validate && (dirty || formDirty )

        return(
            <div className={`form-control ${showError? 'error' : ''}`}>
          <label>{label}</label>
          <input 
            value={value} 
            onChange={this.onChange}
            type="text" 
          />

          <div className="validation-error">{showError && validationMessage}</div>
        </div>
        )
    }
}
