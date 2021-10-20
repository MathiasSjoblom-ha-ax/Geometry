import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import entities from './entities'
import Physics from './physics'
import GeoBack_png from './assets/GeoBack.png'

export default function App() {

  const [gameRunning, setgameRunning] = useState(false)
  const [Attempts, setAttempts] = useState(0)
  const [gameEngine, setgameEngine] = useState(null)

  useEffect(() => {
    setgameRunning(false)
  }, [])

  return (
    <ImageBackground source={GeoBack_png} style={styles.background}>
    <View style={{flex: 1}}>
      <Text style={styles.PointsText}>Attempts: {Attempts}</Text>
      <GameEngine
      ref={(ref) => { setgameEngine(ref)}}
      systems={[Physics]}
      entities={entities()}
      running={gameRunning}
      onEvent={(e) => {
        switch(e.type) {
          case 'Increase_attempt':
            setAttempts(Attempts + 1)
            setgameRunning(false)
            gameEngine.stop()
            gameEngine.swap(entities())
            break;
        }
      }}
        style={{position: 'absolute',top: 0,left: 0,right: 0,bottom: 0}}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      {!gameRunning ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{backgroundColor: 'grey', paddingHorizontal: 30, paddingVertical: 10, margin: 10}}
          onPress={() => {
            setgameRunning(true)
            gameEngine.swap(entities())
          }}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 30}}>START</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor: 'grey', paddingHorizontal: 24, paddingVertical: 10}}
          onPress={() => {
            console.log("Next map")
          }}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 30}}>LEVELS</Text>
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
    margin: 75
  }
});
