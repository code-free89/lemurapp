import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { WebView } from 'react-native-webview';

export type Props = {
    injectedJavaScript: string;
    addPadding: boolean;
};

const ViewerWV: React.FC<Props> = ({injectedJavaScript, addPadding}) => {
    const uri: string = 'https://viewer.hal51.ai/';
    const getContainerStyle = () => {
        if (!addPadding) {
            return styles.container;
        }
        
        return [
            styles.container,
            {
                marginTop: 50,
                marginLeft: 20,
                marginRight: 20,
                borderWidth: 5,
                borderColor: 'white',
                borderTopLeftRadius: 20,
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
        flexDirection: 'row',
    },
});

export default ViewerWV;
