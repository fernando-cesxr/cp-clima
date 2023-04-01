import React from 'react';
import { Text, View, StyleSheet, TextInput, ImageBackground  } from 'react-native';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Imagem from './img/ceu-mobile.jpg'

const url= 'https://api.openweathermap.org/data/2.5/weather?&appid=796e12e99e8514be605276c812944a2c&units=metric';

export default function App() {

const [clima, setClima] = useState([]);
const [cidade, setCidade] = useState('');



const getCidadeData = async ()=> {
    await axios.get(url, {params: {q: cidade }}).then(response => {
    const cidadeData = {
      nome: response.data.name,
      descricao: response.data.weather['0'].description,
      temperatura: response.data.main.temp
    }
    setClima(cidadeData);
  })
  .catch((error)=>{
    console.log(error)
  })
}

useEffect( ()=> {
  getCidadeData();
}, [cidade])

  return (
    <ImageBackground source={Imagem} style={styles.container}>
      <View>
        <Text style={styles.nome}>{clima.nome}</Text>
        <Text style={styles.descricao}>{clima.descricao}</Text>
        <Text style={styles.temp}>{clima.temperatura} °C</Text>
        <TextInput style={styles.input} placeholder='Search for any city' value={cidade} onChangeText={(e)=> setCidade(e)}/>
      </View>
    </ImageBackground>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems: 'center'
  },
  nome: {
    fontSize: 40,
    height: 80,
    paddingTop: 30,
    textAlign: 'center'
  },
  descricao: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  temp: {
    fontSize: 20,
    textAlign: 'center'
  },
  input: {
    marginTop: 5,
    backgroundColor: '#d1cfcf',
    borderColor: '#000',
    borderWidth: 1,
    height: 40, 
    paddingHorizontal: 5,
    borderRadius: 5,
    width: 200
  },  


});
