import React, { Component } from 'react'

import { Text, SafeAreaView, View, AsyncStorage, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import api from '../services/api'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class New extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
        newTweet: '',
    }

    goBack = () => {
        // remove a ultiam rota que usuário acesou e retorna a anterior
        this.props.navigation.pop();
    }

    handleInputChange = (newTweet) => {
        this.setState({newTweet: newTweet});
    }

    handleTweet = async () => {
        const content = this.state.newTweet;
        const author = await  AsyncStorage.getItem('@App:username');

        await api.post('tweets', {author, content});
        this.goBack();
    }

    render(){
        return (
            <SafeAreaView style={styles.container} >
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Icon name="close" 
                              size={24}
                              color="green" /> 
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}
                        onPress={this.handleTweet}>
                        <Text style={styles.buttonText}>
                            Tweetar
                        </Text>    
                    </TouchableOpacity>
                </View>

                <TextInput 
                 style={styles.input}
                 multiline
                 placeholder="Escrev algo para nós..."
                 placeholderTextColor="green"
                 value={this.state.newTweet}
                 onChangeText={this.handleInputChange}
                 returnKeyType="send"
                 onSubmitEditing={this.handleTweet}
                />
            </SafeAreaView >
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    header: {
      paddingTop: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
  
    button: {
      height: 32,
      paddingHorizontal: 20,
      borderRadius: 16,
      backgroundColor: "#4BB0EE",
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    },
  
    input: {
      margin: 20,
      fontSize: 16,
      color: "#333"
    }
  });
  