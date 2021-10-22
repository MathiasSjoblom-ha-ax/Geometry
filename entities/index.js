import Matter from "matter-js"
import Block from "../components/Block"
import Ground from "../components/Ground"
import Obstacle from "../components/Obstacle"
import Spike from "../components/Spike"
import Wall from "../components/Wall"
import BouncePad from "../components/BouncePad"
import { Dimensions } from "react-native"


const restart = () => {
    
    const screenHeight = Dimensions.get('window').height
    const screenWidth = Dimensions.get('window').width
    let engine = Matter.Engine.create({enableSleeping: false})
    engine.gravity.y = 0.6

    let world = engine.world

    //Level Rendering
    return{
        physics: {engine, world},
        Wall: Wall(world, 'blue', {x: -25, y:200}, {height: 900, width: 50}),
        Block: Block(world, 'blue', {x: 60, y:595}, {height: 50, width: 50}),
        //BouncePad: BouncePad(worlrd, 'blue', {x: 150, y:600}, {height: 50, width: 50}),
        Spike: Spike(world, 'blue', {x: 300, y:600}, {height: 50, width: 50}),
        BouncePad: BouncePad(world, 'blue', {x: 700, y:600}, {height: 50, width: 50}),


        Obstacle: Obstacle(world, 'black', {x: 950, y:310}, {height: 65, width: 65}),
        Obstacle1: Obstacle(world, 'black', {x: 1200, y:310}, {height: 65, width: 65}),
        Obstacle2: Obstacle(world, 'black', {x: 1350, y:510}, {height: 65, width: 65}),
        Spike2: Spike(world, 'blue', {x: 1450, y:600}, {height: 50, width: 50}),
        Obstacle3: Obstacle(world, 'black', {x: 1600, y:510}, {height: 65, width: 65}),

        Ground: Ground(world, 'grey', {x: 0, y: screenHeight}, {height: 200, width: screenWidth + 500})
    }
    
}
export default restart