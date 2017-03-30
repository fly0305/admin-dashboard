import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { NavLink } from 'react-router-dom';
import { Panel } from 'react-bootstrap';
import { Route } from 'react-router';

import s from './LinksGroup.scss';

class LinksGroup extends Component {
  /* eslint-disable */
  static propTypes = {
    header: PropTypes.string.isRequired,
    headerLink: PropTypes.string,
    childrenLinks: PropTypes.array,
    iconName: PropTypes.string.isRequired,
  };
  /* eslint-enable */

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    if (!this.props.childrenLinks) {
      return (
        <li className={s.headerLink}>
          <NavLink to={this.props.headerLink} activeClassName={s.headerLinkActive} exact>
            <i className={`glyphicon ${this.props.iconName}`} />
            {this.props.header}
          </NavLink>
        </li>
      );
    }
    /* eslint-disable */
    return (
      <Route
        path={this.props.headerLink}
        children={({ match }) => {
          const expanded = !!match || this.state.isOpen;
          return (
            <li className={s.headerLink}>
              <a
                className={match ? s.headerLinkActive : ''}
                onClick={() => this.setState({ isOpen: !this.state.isOpen })}
              >
                <i className={`glyphicon ${this.props.iconName}`} />

                {this.props.header}

                <b className={['caret', s.caret].join(' ')} />
              </a>
              {/* eslint-enable */}
              <Panel className={s.panel} collapsible expanded={expanded}>
                <ul>
                  {this.props.childrenLinks && this.props.childrenLinks.map(child => (
                    <li key={child.name}>
                      <NavLink
                        to={child.link} exact
                        onClick={() => this.setState({ isOpen: false })}
                        activeClassName={s.headerLinkActive}
                      >
                        {child.name}
                      </NavLink>
                    </li>
                      ))}
                </ul>
              </Panel>
            </li>
          );
        }}
      />
    );
  }

}

export default withStyles(s)(LinksGroup);
