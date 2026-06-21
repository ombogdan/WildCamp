import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from 'shared/theme';
import {persistor, store} from 'shared/store';
import {RootNavigator} from 'shared/navigation';
import {Platform, UIManager} from 'react-native';
import {I18nextProvider} from "react-i18next";
import i18n from "shared/config/i18n";
import {ErrorBoundary} from "components/error-boundary";
import {ToastMessage} from "components/toast-message";

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const App = () => (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider>
            <I18nextProvider i18n={i18n}>
              <RootNavigator/>
              <ToastMessage/>
            </I18nextProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
