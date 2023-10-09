import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import {
    hideNavigationBar,
    showNavigationBar,
  } from 'react-native-navigation-bar-color';

export type Props = {
    injectedJavaScript: string;
    fullScreen: boolean;
};

const tag:string = 'LemurAppViewerWV';

const ViewerWV: React.FC<Props> = ({injectedJavaScript, fullScreen}) => {
    const uri: string = 'https://viewer.hal51.ai/';

    const getContainerStyle = () => {
        if (fullScreen) {
            activateKeepAwakeAsync(tag);
            hideNavigationBar();
            return styles.container;
        }
        
        deactivateKeepAwake(tag);
        showNavigationBar();
        return [
            styles.container,
            {
                marginTop: 50,
                marginLeft: 20,
                marginRight: 20,
                borderWidth: 5,
                borderColor: 'white',
                borderRadius: 20,
                borderTopRightRadius: 20,
            }
        ]
    }

    return (
        <WebView
            containerStyle={getContainerStyle()}
            source={{ uri }}
            injectedJavaScript={injectedJavaScript}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
    },
});

export default ViewerWV;
