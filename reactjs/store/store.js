// Default redux createStore function.
import { createStore, applyMiddleware } from 'redux';

// Debug.
import { composeWithDevTools } from 'redux-devtools-extension';

// Sagas!
import createSagaMiddleware from 'redux-saga';

// Import all our custom sagas.
import sagas from './sagas';

// Import all our custom reducers.
import reducers from './reducers';

// Create a saga middleware.
const sagaMiddleware = createSagaMiddleware();

// Build store.
// TODO: Disable dev tools on production.
const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

// Start watching all sagas.
sagaMiddleware.run(sagas);

export default store;
