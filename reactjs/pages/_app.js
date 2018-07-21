import React, { Fragment } from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import HtmlHead from '../components/HtmlHead';
import configureStore from '../store/store';
import '../components/PageProgressBar'; // Beautiful page transition indicator.

class Application extends App {
  static async getInitialProps({ Component, ctx }) {
    let initialProps = {
      isServer: !!ctx.req,
    };

    // Call to getInitialProps() from the Page component.
    if (Component.getInitialProps) {
      const childInitialProps = await Component.getInitialProps({
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
    const { Component, store, ...pageProps } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Fragment>
            <HtmlHead />
            <Component {...pageProps} />
          </Fragment>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(Application));
