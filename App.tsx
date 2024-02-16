/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import rc, {RUDDER_LOG_LEVEL} from '@rudderstack/rudder-sdk-react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

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
  console.log('Track Event is called.');
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
  rc.alias('Custom alias id - 1');
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

const makeAllCalls = () => {
  identify();
  track();
  screen();
  group();
  alias();
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const WRITE_KEY = '<WRITE_KEY>';
  const DATA_PLANE_URL = '<DATA_PLANE_URL>';

  console.log(WRITE_KEY);
  console.log(DATA_PLANE_URL);

  useEffect(() => {
    const rudderInitialise = async () => {
      await rc.setup(WRITE_KEY, {
        dataPlaneUrl: DATA_PLANE_URL,
        logLevel: RUDDER_LOG_LEVEL.VERBOSE,
        recordScreenViews: false,
        sessionTimeout: 0,
        enableBackgroundMode: false,
        trackAppLifecycleEvents: true,
        autoSessionTracking: true,
      });
      console.log('SDK is initalised');
      makeAllCalls();
    };
    rudderInitialise().catch(console.error);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Rudderstack buttons to track events">
            <Button
              title="Identify"
              color="#841584"
              onPress={() => identify()}
            />
            <Button title="Track" color="#841584" onPress={() => track()} />
            <Button title="Screen" color="#841584" onPress={() => screen()} />
            <Button title="Group" color="#841584" onPress={() => group()} />
            <Button title="Alias" color="#841584" onPress={() => alias()} />
            <Button
              title="All calls"
              color="#841584"
              onPress={() => makeAllCalls()}
            />
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
            <Button title="RESET" color="#841584" onPress={() => reset()} />
            <Button title="FLUSH" color="#841584" onPress={() => flush()} />
            <Button title="getSessionId()" onPress={getSessionId} />
            <Button
              title="Enable OptOut"
              color="#841584"
              onPress={enableOptOut}
            />
            <Button
              title="Disable OptOut"
              color="#841584"
              onPress={disableOptOut}
            />
            <Button
              title="getRudderContext"
              color="#841584"
              onPress={getRudderContext}
            />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
