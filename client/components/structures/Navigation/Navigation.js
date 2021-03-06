import React  from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames';
import * as R from 'ramda';
import UserDropdown from './UserDropdown';
import logo from '../../pages/icon-2.png';
// import './Nav.css';

export default function Navigation(props) {
  const {
    user, auth, pathname, toggleUserDropdown, closeUserDropdown, userDropdownOpen,
  } = props;

  const isHome = (pathname.length === 5)
    ? pathname === '/home'
    : R.slice(0, 6, pathname) === '/home/';

  const isSettings = (pathname.length === 9)
    ? pathname === '/settings'
    : R.slice(0, 10, pathname) === '/settings/';

  const homeItemClasses = classNames({
    'nav-item': true,
    'is-tab': true,
    'is-hidden-mobile': true,
    'is-active': isHome,
  });

  const settingsItemClasses = classNames({
    'nav-item': true,
    'is-tab': true,
    'is-hidden-mobile': true,
    'is-active': isSettings,
  });

  const styles = theme => ({
    titleText: {
      fontFamily: 'Permanent Marker'
    },
  });

  return (
    <nav className="nav has-shadow is-fixed" style={{background: '#ff6666', height: 60}}>
      <div className="container">

        <img src={logo}
          style={{
              width: 50,
              height: 50,
              marginTop: 5,}}
        />
        <div className="nav-left">
          <Link to={auth ? '/home' : '/'} className="nav-item">
            <h3 className="title is-3 titleText" style={{
              fontFamily: 'Permanent Marker',
            }}>
              Adulting
            </h3>
          </Link>
        </div>

        {auth ? (
          <div className="nav-right">
            <Link to={auth ? '/saved' : '/'} className="nav-item">
              <h6 className="title is-6">
                Saved Articles
              </h6>
            </Link>
            <a className="nav-item is-hoverable" onClick={toggleUserDropdown} onKeyPress={toggleUserDropdown}>
              <figure className="image nav-image is-32x32">
                <img className="profile-img" src={user.profilePic || '/default-profile.png'} alt="" />
              </figure>
              <span className="dropdown-caret" />
            </a>
            <UserDropdown open={userDropdownOpen} closeDropdown={closeUserDropdown} />
          </div>
        ) : (
          <div className="nav-right">
            <Link to="/login" className="nav-item">
              <h6 className="title is-6">
                Login
              </h6>
            </Link>
            <Link to="/register" className="nav-item">
              <button type="button" className="button is-success">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  auth: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  userDropdownOpen: PropTypes.bool.isRequired,
  toggleUserDropdown: PropTypes.func.isRequired,
  closeUserDropdown: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    usernameCase: PropTypes.string,
    profilePic: PropTypes.string,
  }).isRequired,
};
