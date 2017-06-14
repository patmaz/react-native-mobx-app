import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    ScrollView
} from 'react-native';
import {Provider as MOobXProvider, observer} from 'mobx-react/native';
import Store from './store/Store';
import { LANDSCAPE, PORTRAIT } from './const';
import Content from './components/Content';

@observer
export default class mobileApp extends Component {

    onLayoutHandler = (e) => {
        const { width, height } = e.nativeEvent.layout;
        const orientation = ( width > height ) ? LANDSCAPE : PORTRAIT;

        Store.changeOrientation(orientation);
    };

    render() {
        return (
            <MOobXProvider store={Store}>
                <View
                    style={styles.view}
                    onLayout={this.onLayoutHandler}>
                    <Content/>
                </View>
            </MOobXProvider>
        );
    }

}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

AppRegistry.registerComponent('mobileApp', () => mobileApp);
