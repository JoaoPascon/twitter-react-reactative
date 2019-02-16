import React, { Component } from 'react';
import socket from 'socket.io-client';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'

import Tweet from '../components/Tweet'

import api from '../services/api'

export default class Timeline extends Component{
    
    //essa variavel statica é lida pelo react-navigation e aplica algumas configurações
    static navigationOptions = ({navigation}) => ({
        title: "Início",
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('New')}>
                <Icon name="add-circle-outline"
                      size={24}
                      style={{marginRight: 20}}
                      color="green"/>
            </TouchableOpacity>
        )
    });

    state = {
        tweets: []
    };

    async componentDidMount() {
        this.subscribeToEvents();
        const response = await api.get('tweets');
        this.setState({ tweets: response.data})
    }

    
    subscribeToEvents = () => {
        const io = socket('http://10.0.3.2:3000');
        
        io.on('tweet', data => {
           this.setState({ tweets: [data, ...this.state.tweets] })
        })

        io.on('like', data => {
            this.setState({ tweets: this.state.tweets.map(tweet => 
                tweet._id === data._id ? data : tweet 
                ) 
            });
        });

    }


    render(){
        return(
            <View style={styles.container}>
                <FlatList 
                data={this.state.tweets}
                keyExtractor={tweet => tweet._id}
                renderItem={({ item }) => 
                    <Tweet tweet={item} />
                }/>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    }
  });
  