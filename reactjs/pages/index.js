import React from 'react';
import Application from '../application';
import HelloFriend from '../components/HelloFriend';

class Page extends React.Component {
  static async getInitialProps() {
    return {
      name: 'value',
    };
  }

  render() {
    return <HelloFriend />;
  }
}

export default Application(Page);
