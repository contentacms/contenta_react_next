import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import HtmlHead from '../components/HtmlHead';
import store from '../store/store';
import '../components/PageProgressBar'; // Beautiful page transition indicator.

export default function (PageComponent) {
  return class Application extends React.Component {
    static async getInitialProps(ctx) {
      const isServer = !!ctx.req;

      let initialProps = {
        dispatch: store.dispatch,
        isServer,
      };

      // Passes store parameter to the initialProps function if it's not
      // rendered by server.
      if (!isServer) {
        initialProps.store = store;
      }

      // Call to getInitialProps() from the Page component.
      if (PageComponent.getInitialProps) {
        const childInitialProps = await PageComponent.getInitialProps({
          ...initialProps,
          ...ctx,
        });

        return {
          ...initialProps,
          ...childInitialProps,
        };
      }

      return initialProps;
    }

    render() {
      return (
        <Provider store={store}>
          <Fragment>
            <HtmlHead />
            <PageComponent {...this.props} />
          </Fragment>
        </Provider>
      );
    }
  };
}
