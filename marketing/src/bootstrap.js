import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';
// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory }) => {
  // in a shared mfe we want to use memory history and not browser history
  // we will use browser history only in the container project so only the container will change 
  // the url, and all routing inside the shared mfe will be seamless to the user and will not change
  // the actual location (e.g like in the gmail web app)
  // if we run the mfe in isolation, only then we will use browser history.
  // we will also use callbacks to communicate navigation changes between the container and the mfe in both directions
  const history = defaultHistory || createMemoryHistory();
  if(onNavigate){
    history.listen(onNavigate); // onNavigate iss a callback supplied by the container app
  }
  ReactDOM.render(<App history={history}/>, el);

  return {
    onParentNavigate({ pathname: nextPathName }){
      if(history.location.pathname !== nextPathName){
        history.push(nextPathName);
      }
    }
  }
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    // in dev isolation mode we want to have a browser history
    mount(devRoot, {defaultHistory: createBrowserHistory()});
  }
}

// We are running through container
// and we should export the mount function
export { mount };
