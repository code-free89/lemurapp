import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ViewerWV from './src/ViewerWV';
import * as ScreenOrientation from 'expo-screen-orientation';


export default function App() {
  const [buttonPressed, setButtonPressed] = React.useState(false);
  const [isLandScapeMode, setIsLandScapeMode] = React.useState(false);

  const trackOrientationState = (state: ScreenOrientation.Orientation) => {
    const landscapeMode = state != ScreenOrientation.Orientation.PORTRAIT_UP && state != ScreenOrientation.Orientation.PORTRAIT_DOWN;
    setIsLandScapeMode(landscapeMode);
  };

  React.useEffect(() => {
    // find out initial orientation
    ScreenOrientation.getOrientationAsync().then((info) => {
      trackOrientationState(info);
    });
  
    // listen to orientation changes
    const subscription = ScreenOrientation.addOrientationChangeListener((e) => {
      trackOrientationState(e.orientationInfo.orientation);
    });
  
    // return a clean up function to unsubscribe from notifications
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const onBtnPress = () => {
    setButtonPressed(!buttonPressed);
  };

  const mainButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Pressable 
          style={({pressed}) => [
            styles.button,
            {
              backgroundColor: pressed ? ' rgb(148, 163, 184)' : 'black',
            }
          ]}
          onPress={onBtnPress}
        >
          <Text style={styles.buttonText}>{buttonPressed ? 'Close Display' : 'Open Display'}</Text>
        </Pressable>
      </View>
    );
  }

  const noteForLandscapeMode = () => {
    return (
      <Text style={styles.note}>Rotate device for full screen view.</Text>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        // Background Linear Gradient
        colors={['#a6c0fe', '#f68084']}
        start={{ x: 0, y: 0 }}
        end={{x: 1.4, y: 1 }}
        style={styles.background}
      >
        {
          buttonPressed ? <ViewerWV injectedJavaScript='' addPadding={!isLandScapeMode} /> : null
        }
        {
          isLandScapeMode ? null : buttonPressed ? noteForLandscapeMode() : null
        }
        {
          isLandScapeMode ? buttonPressed ? null : mainButton() : mainButton()
        }
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  note: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});
