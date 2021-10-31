import Matter from "matter-js"
import Block from "../components/Block"
import Ground from "../components/Ground"
import Obstacle from "../components/Obstacle"
import Spike from "../components/Spike"
import Wall from "../components/Wall"
import BouncePad from "../components/BouncePad"
import SawBlade from "../components/SawBlade"
import FinishFlag from "../components/FinishFlag"
import ReverseSpike from "../components/ReverseSpike"
import { Dimensions } from "react-native"


const restart = () => {
    
    const screenHeight = Dimensions.get('window').height
    const screenWidth = Dimensions.get('window').width
    let engine = Matter.Engine.create({enableSleeping: false})
    engine.gravity.y = 0.5

    let world = engine.world

    //Level Rendering
    return{
        physics: {engine, world},
        Wall: Wall(world, 'blue', {x: -25, y:200}, {height: 900, width: 50}),
        Block: Block(world, 'blue', {x: 60, y:595}, {height: 50, width: 50}),
        Spike: Spike(world, 'blue', {x: 300, y:600}, {height: 50, width: 50}),
        BouncePad: BouncePad(world, 'blue', {x: 700, y:600}, {height: 50, width: 50}),

        Wall2: Wall(world, 'black', {x: 950, y:600}, {height: 600, width: 50}),
        Obstacle: Obstacle(world, 'black', {x: 950, y:310}, {height: 65, width: 65}),
        SawBlade: SawBlade(world, 'black', {x: 1075, y:400}, {height: 130, width: 130}),
        Obstacle1: Obstacle(world, 'black', {x: 1200, y:310}, {height: 65, width: 65}),
        Obstacle2: Obstacle(world, 'black', {x: 1370, y:510}, {height: 65, width: 65}),
        Spike2: Spike(world, 'blue', {x: 1450, y:600}, {height: 50, width: 50}),
        Spike3: Spike(world, 'blue', {x: 1500, y:600}, {height: 50, width: 50}),
        Obstacle3: Obstacle(world, 'black', {x: 1620, y:510}, {height: 65, width: 65}),

        Wall3: Wall(world, 'black', {x: 1740, y:100}, {height: 300, width: 50}), //1740
        Wall4: Wall(world, 'black', {x: 1740, y:680}, {height: 400, width: 50}),
        Spike4: Spike(world, 'blue', {x: 1740, y:460}, {height: 50, width: 50}),
        ReverseSpike: ReverseSpike(world, 'blue', {x: 1740, y:270}, {height: 50, width: 50}),

        FinishFlag: FinishFlag(world, 'black', {x: 1920, y:600}, {height: 130, width: 130}),

        //Ground: Ground(world, 'grey', {x: 0, y: screenHeight}, {height: 200, width: screenWidth + 500}) Pixel 4 ground level
        Ground: Ground(world, 'grey', {x: 0, y: screenHeight}, {height: 130, width: screenWidth + 500}) //Nexus ground level
    }
    
}

export default restart