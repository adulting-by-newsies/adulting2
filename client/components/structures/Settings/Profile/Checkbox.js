import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: this.props.startChecked || false,
    totalPref: this.props.totalPref
  }

  componentWillReceiveProps(){
    console.log(this.props)
  }

  toggleCheckboxChange = () => {
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
  }

  isDisabled = () => {
    console.log('hitting this')
    return (this.totalPref < 5) || this.isChecked;
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state || this.props.startChecked;
    console.log('rendering')
    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            disabled={!this.isDisabled}
            onChange={this.toggleCheckboxChange}
            onClick={this.props.updatePreferences}
          />
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;