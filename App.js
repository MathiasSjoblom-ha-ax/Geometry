import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import entities from './entities'
import Physics from './physics'
import GeoBack_png from './assets/GeoBack.png'
import { loadState, saveState } from './Storage/Storage';

export default function App() {

  const [gameRunning, setgameRunning] = useState(false)
  const [Attempts, setAttempts] = useState(0)
  const [Victories, setVictories] = useState(0)
  const [gameEngine, setgameEngine] = useState(null)

  useEffect(() => {
    setgameRunning(false)
  }, [])

  /* Async load
  useEffect(() => {
    loadState().then((result) => setAttempts(result));
  }, []);
  */

  return (
    <ImageBackground source={GeoBack_png} style={styles.background}>
    <View style={{flex: 1}}>
      <GameEngine
      ref={(ref) => { setgameEngine(ref)}}
      systems={[Physics]}
      entities={entities()}
      running={gameRunning}
      onEvent={(e) => {
        switch(e.type) {
          case 'Increase_attempt':
            setgameRunning(false)
            gameEngine.stop()
            gameEngine.swap(entities())
            setAttempts(Attempts + 1)
            break;
          case 'Complete_level':
            setgameRunning(false)
            gameEngine.stop()
            gameEngine.swap(entities())
            setVictories(Victories + 1)
            break;
        }
      }}
        style={{position: 'absolute',top: 0,left: 0,right: 0,bottom: 0}}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      {!gameRunning ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.PointsText}>Attempts: {Attempts}</Text>
          <Text style={styles.VictoryText}>Victories: {Victories}</Text>
          <TouchableOpacity style={{backgroundColor: 'grey', paddingHorizontal: 30, paddingVertical: 10, margin: 10}}
          onPress={() => {
            setgameRunning(true)
            gameEngine.swap(entities())
          }}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 30}}>START</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor: 'grey', paddingHorizontal: 31, paddingVertical: 10}}
          onPress={() => {
            setAttempts(0)
            setVictories(0)
          }}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 30}}>RESET</Text>
          </TouchableOpacity>

          </View> : null}
      
    </View>
    </ImageBackground>
  );
}


//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    resizeMode: "cover",
    justifyContent: "center",
    height: '100%'
  },
  PointsText: {
    textAlign: 'center',
    fontSize: 50,
    margin: 15
  },
  VictoryText: {
    textAlign: 'center',
    fontSize: 40,
    margin: 5
  }
});
