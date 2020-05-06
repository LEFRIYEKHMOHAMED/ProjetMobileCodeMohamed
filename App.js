import React from 'react'
import Navigation from './Navigation/Navigation'
import NavigationBottom from './Navigation/NavigationBottom'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default function App() {
  return (
    <Provider store={Store}>
        <NavigationBottom/>
    </Provider>
  );
}

