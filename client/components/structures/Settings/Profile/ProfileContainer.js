import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { validateName } from '_utils/validation';
import Profile from './Profile';
import Checkbox from './Checkbox'

const categories = ["Sports", "Politics", "Science", "Technology", "Health", "Business", "Culture", "World News", "Cooking", "Lifestyle"]

export default class ProfileContainer extends Component {
  static propTypes = {
    user: PropTypes.shape({
      usernameCase: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      bio: PropTypes.string,
      profilePic: PropTypes.string,
      profilePreferences: PropTypes.array
    }).isRequired,
    attemptGetUser: PropTypes.func.isRequired,
    attemptUpdateUser: PropTypes.func.isRequired,
  };

  state = {
    firstName: this.props.user.firstName || '',
    lastName: this.props.user.lastName || '',
    bio: this.props.user.bio || '',
    profilePic: this.props.user.profilePic || '',
    preferences: this.props.user.preferences || [],
    totalPref: this.props.user.preferences.length,
    firstNameEdited: false,
    lastNameEdited: false,
    bioEdited: false,
    profilePicEdited: false,
    preferencesEdited: false,
  }

  resetState = () => this.setState({
    firstName: this.props.user.firstName || '',
    lastName: this.props.user.lastName || '',
    bio: this.props.user.bio || '',
    profilePic: this.props.user.profilePic || '',
    preferences: this.props.user.preferences || [],
    totalPref: this.props.user.preferences.length || 0,
    firstNameEdited: false,
    lastNameEdited: false,
    bioEdited: false,
    profilePicEdited: false,
    preferencesEdited: false,
  });

  updateFirstName = e => {
    if (validateName(e.target.value)) {
      this.setState({ firstName: e.target.value, firstNameEdited: true });
    }
  }

  updateLastName = e => {
    if (validateName(e.target.value)) {
      this.setState({ lastName: e.target.value, lastNameEdited: true });
    }
  }

  updateBio = e => this.setState({ bio: e.target.value, bioEdited: true })

  updateProfilePic = e => this.setState({ profilePic: e.target.value, profilePicEdited: true })

  updatePreferences = e => {
    let arr = this.state.preferences
    const index = arr.indexOf(e.target.value)
    
    if(index === -1){
      arr.push(e.target.value)  
    }else{
      arr.splice(index,1)
    }
    
    let newLength = arr.length

    this.setState({ preferences: arr, preferencesEdited: true, totalPref: newLength})
    console.log(this.state)
  }

  refresh = () => {
    this.props.attemptGetUser()
      .then(() => this.resetState())
      .catch(R.identity);
  }

  save = () => {
    const updatedUser = {};
    const updatedUserMongo = {};

    if (this.state.firstNameEdited) { updatedUser.first_name = this.state.firstName; updatedUserMongo.firstName = this.state.firstName;}
    if (this.state.lastNameEdited) { updatedUser.last_name = this.state.lastName; updatedUserMongo.lastName = this.state.lastName;}
    if (this.state.profilePicEdited) { updatedUser.profile_pic = this.state.profilePic; }
    if (this.state.bioEdited) { updatedUser.bio = this.state.bio; }
    if (this.state.preferencesEdited) { updatedUser.preferences = this.state.preferences; updatedUserMongo.preferences = this.state.preferences}
    if (!R.isEmpty(updatedUser)) {
      this.props.attemptUpdateUser(updatedUser)
        .then(() => {
            this.resetState();
            this.resetPreferences();
        })
        .catch(R.identity);
    }

  }

  startChecked(label, preferences){
    if(preferences.indexOf(label) !== -1){
      return true;
    }else{
      return false
    }
  }

  createCheckbox = label => (
      <Checkbox
        label = {label}
        key = {label}
        totalPref = {this.state.totalPref}
        updatePreferences = {this.updatePreferences}
        startChecked = {this.startChecked(label, this.state.preferences)}
      />
  )

  createCheckboxes = () => (
    categories.map(this.createCheckbox)
  )
  

  render() {
    const {
      firstName, lastName, bio, profilePic, firstNameEdited, lastNameEdited,
      bioEdited, profilePicEdited, preferencesEdited
    } = this.state;

    const edited = firstNameEdited || lastNameEdited || bioEdited || profilePicEdited || preferencesEdited;
    return (
      <Profile
        edited={edited}
        usernameCase={this.props.user.usernameCase}
        firstName={firstName}
        lastName={lastName}
        bio={bio}
        profilePic={profilePic}
        checkboxes={this.createCheckboxes}
        save={this.save}
        editProfile={this.editProfile}
        refresh={this.refresh}
        updateFirstName={this.updateFirstName}
        updateLastName={this.updateLastName}
        updateBio={this.updateBio}
        updateProfilePic={this.updateProfilePic}
        updatePreferences={this.updatePreferences}
      />
    );
  }
}
