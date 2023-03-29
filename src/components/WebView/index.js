import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { WebView } from 'react-native-webview';
import { heightScreen, widthScreen } from '../../utility';

const FieldWebView = ({HTML}) => {
    const webviewRef = useRef(null);
    // const getWebViewContent = () => {
    //     webviewRef.current.injectJavaScript(`
    //       window.ReactNativeWebView.postMessage(JSON.stringify(document.body.innerHTML));
    //     `);
    //   };
    
      const onMessage = event => {
        console.log(event.nativeEvent.data);
      };
  return (
    <WebView
        ref={webviewRef}
        source={{ uri : "http://ec2-43-207-195-61.ap-northeast-1.compute.amazonaws.com:5000/accounts/google"}}
        style={styles.main}
        userAgent={Platform.OS === 'android' ? 'Chrome/18.0.1025.133 Mobile Safari/535.19' : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'}
        onMessage={onMessage}
        onNavigationStateChange={(navState) => {
            // Keep track of going back navigation within component
            this.canGoBack = navState.canGoBack;
            console.log(navState)
          }}
      />
  )
}

export default FieldWebView

const styles = StyleSheet.create({
    main:{
        height: heightScreen,
        width: widthScreen
    }
})