import {StatusBar} from 'expo-status-bar';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import rc, {RUDDER_LOG_LEVEL} from '@rudderstack/rudder-sdk-react-native';

// import DBEncryption from '@rudderstack/rudder-plugin-db-encryption-react-native';

/*
import RudderStackAPIs from "./RudderStackAPIs";

// Add this component
<RudderStackAPIs />

// Add this in project/build.gradle file
maven { url 'https://maven.singular.net/' }

// Add this in app/build.gradle file
//sql-cipher
implementation "net.zetetic:android-database-sqlcipher:4.5.4"
implementation "androidx.sqlite:sqlite:2.3.1"

Add in Podfile:
# To solve the React Native Firebase iOS installation issue, uncomment below lines:
  pod 'FirebaseCore', :modular_headers => true
  pod 'GoogleUtilities', :modular_headers => true
  pod 'RSCrashReporter', :modular_headers => true
*/

const identifyWithExternalId = async () => {
  const options = {
    externalIds: [
      {
        id: '2d31d085-4d93-4126-b2b3-94e651810673',
        type: 'brazeExternalId',
      },
    ],
  };

  rc.identify(
    'test_userId',
    {
      email: 'testuser@example.com',
      location: 'UK',
    },
    options,
  );
};

const identify = async () => {
  const traits = {
    'key-1': 'value-1',
    'key-2': 34,
  };
  rc.identify('userId', traits);
  console.log('Identify Event is called.');
};

async function track() {
  rc.track('Custom track Event - 1');
  // Below method is not tested yet
  // orderCompleted();
  console.log('Track Event is called.');
}

async function orderCompleted() {
  rc.track('Order Completed', {
    checkout_id: '12345',
    order_id: '1234',
    affiliation: 'Apple Store',
    total: 20,
    revenue: 15.0,
    shipping: 4,
    tax: 1,
    discount: 1.5,
    coupon: 'ImagePro',
    currency: 'USD',
    products: [
      {
        product_id: '123',
        sku: 'G-32',
        name: 'Monopoly',
        price: 14,
        quantity: 1,
        category: 'Games',
        url: 'https://www.website.com/product/path',
        image_url: 'https://www.website.com/product/path.jpg',
      },
      {
        product_id: '345',
        sku: 'F-32',
        name: 'UNO',
        price: 3.45,
        quantity: 2,
        category: 'Games',
      },
    ],
  });
}

async function screen() {
  rc.screen('Custom screen Event - 1');
  console.log('Screen Event is called.');
}

async function group() {
  rc.group('Custom group Event - 1');
  console.log('Group Event is called.');
}

async function alias() {
  rc.alias('Custom alias Event - 1');
  // rc.alias("Custom alias Event - 1", "userId-12e");

  const options = {
    integrations: {
      Amplitude: true,
    },
  };
  // rc.alias("Custom alias Event - 1", options);

  console.log('Alias Event is called.');
}

async function reset() {
  rc.reset();
  console.log('RESET Event is called.');
}

async function flush() {
  rc.flush();
  console.log('FLUSH Event is called.');
}

async function allCalls() {
  identify();
  track();
  screen();
  group();
  alias();
}

async function manualSession() {
  rc.startSession();
  console.log('Manual session is called.');
}

async function manualSessionWithId() {
  rc.startSession(1234567890);
  console.log('Manual session with ID is called.');
}

async function endSession() {
  rc.endSession();
  console.log('End session.');
}

const getSessionId = async () => {
  const sessionId = await rc.getSessionId();
  console.log(`Session id: ${sessionId}`);
  console.log(`SessionId type: ${typeof sessionId}`);
};

const enableOptOut = () => {
  rc.optOut(true);
};

const disableOptOut = () => {
  rc.optOut(false);
};

const getRudderContext = async () => {
  const context = await rc.getRudderContext();
  console.log(`${JSON.stringify(context)}`);
};

function RudderStackAPIs() {
  const WRITE_KEY = '20V6fgE2zxiBhzWQ7tzjycqFMY0';
  const DATA_PLANE_URL =
    'https://rudderstacbumvdrexzj.dataplane.rudderstack.com';
  console.log(WRITE_KEY);
  console.log(DATA_PLANE_URL);

  useEffect(() => {
    // const dbEncryption = new DBEncryption('versys', false);

    const rudderInitialise = async () => {
      await rc.setup(WRITE_KEY, {
        dataPlaneUrl: DATA_PLANE_URL,
        logLevel: RUDDER_LOG_LEVEL.VERBOSE,
        recordScreenViews: false,
        // sessionTimeout: 0,
        enableBackgroundMode: true,
        trackAppLifecycleEvents: true,
        autoSessionTracking: true,
        // dbEncryption: dbEncryption,
        withFactories: [
          amplitude,
          appcenter,
          appsflyer,
          braze,
          clevertap,
          firebase,
          moengage,
          singular,
        ],
      });
      console.log('SDK is initalised');
    };
    rudderInitialise().catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Button title="Identify" color="#841584" onPress={() => identify()} />
      <Button title="Track" color="#841584" onPress={() => track()} />
      <Button title="Screen" color="#841584" onPress={() => screen()} />
      <Button title="Group" color="#841584" onPress={() => group()} />
      <Button title="Alias" color="#841584" onPress={() => alias()} />
      <Button title="All calls" color="#841584" onPress={() => allCalls()} />
      <Button
        title="Manual Session"
        color="#841584"
        onPress={() => manualSession()}
      />
      <Button
        title="Manual Session with ID"
        color="#841584"
        onPress={() => manualSessionWithId()}
      />
      <Button
        title="End session"
        color="#841584"
        onPress={() => endSession()}
      />

      <Button
        title="Identify With ExternalID"
        color="#841584"
        onPress={() => identifyWithExternalId()}
      />
      <Button title="RESET" color="#841584" onPress={() => reset()} />
      <Button title="FLUSH" color="#841584" onPress={() => flush()} />
      <Button title="getSessionId()" onPress={getSessionId} />
      <Button title="Enable OptOut" color="#841584" onPress={enableOptOut} />
      <Button title="Disable OptOut" color="#841584" onPress={disableOptOut} />
      <Button
        title="getRudderContext"
        color="#841584"
        onPress={getRudderContext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RudderStackAPIs;
