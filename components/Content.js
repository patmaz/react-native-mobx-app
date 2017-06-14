/**
 * Created by patrykmazurkiewicz on 14/06/2017.
 */
import React, {Component} from 'react';
import {
    Text, View
} from 'react-native';
import { observer, inject } from 'mobx-react/native';

@inject('store') @observer
class Content extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { store } = this.props;
        store.getCoords();
    };

    render() {
        const { store } = this.props;
        return (
            <View>
                { store.latitude  && <Text>latitude: {store.latitude}</Text> }
                { store.longitude  && <Text>longitude: {store.longitude}</Text> }
                { store.country  && <Text>country: {store.country}</Text> }
                { store.error && <Text> store.error </Text>}
                <Text>
                    { store.orientation }
                </Text>
            </View>
        )
    }
}

export default Content;