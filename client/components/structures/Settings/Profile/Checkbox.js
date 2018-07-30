import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: this.props.startChecked || false,
  }

  toggleCheckboxChange = () => {
    const { label,  } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state || this.props.startChecked;

    console.log(this.props.startChecked,isChecked)
    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
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