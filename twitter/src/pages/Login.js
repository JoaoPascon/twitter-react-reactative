import React, { Component } from 'react'
import { TextInput, 
         KeyboardAvoidingView, 
         TouchableOpacity,
         View,
         StyleSheet,
         Text,
         AsyncStorage } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

export default class Login extends Component{
  
  state = {
    username: '',
  }

  async componentDidMount() {

    const username = await AsyncStorage.getItem('@App:username');

    if(username){
        this.props.navigation.navigate('App');
    }

  }

  handleLogin = async () => {
      // nota: dessa maneira o userName é procurado automaticamente dentro do this.state
      const { username } = this.state;

      if(!username.length) return;

      // para salvar no local storage (sqlite) do celular estilo web 
      await AsyncStorage.setItem('@App:username', username);

      // permiti fazer a navegação 
      this.props.navigation.navigate('Timeline');
  };

  handleInputChange = (username) => {
    this.setState({ username: username})
  }
  
  render(){
        return (
        // behavior para dar um padding do teclado
        // sempre que precisar escrever algo precisara de um <Text />
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.content}>
            
            <View>
              <Icon name="twitter" size={64} color="#4BB0EE" />
            </View>

            <TextInput 
              style={styles.input}
              placeholder="Nome do Usuário"
              value={this.state.username}
              onChangeText={this.handleInputChange}
              onSubmitEditing={this.handleLogin}
              returnKeyType="send"
            />

            <TouchableOpacity style={styles.button}
                              onPress={this.handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </ TouchableOpacity>


          </View>
        </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 30
    },
  
    input: {
      borderWidth: 1,
      borderColor: "#DDD",
      borderRadius: 5,
      height: 44,
      paddingHorizontal: 15,
      alignSelf: "stretch",
      marginTop: 30
    },
  
    button: {
      height: 44,
      alignSelf: "stretch",
      marginTop: 10,
      backgroundColor: "#4BB0EE",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    }
  });
  