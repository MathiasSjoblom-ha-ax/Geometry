import Matter, { Composite, Engine, World } from "matter-js"
import ReverseSpike from "./components/ReverseSpike"

const Physics = (entities, {touches, time, dispatch}) => {

    let engine = entities.physics.engine
    let Block = entities.Block.body
    let Spike = entities.Spike.body
    let Spike2 = entities.Spike2.body
    let Spike3 = entities.Spike3.body
    let Spike4 = entities.Spike4.body
    let Wall = entities.Wall.body
    let BouncePad = entities.BouncePad.body
    let FinishFlag = entities.FinishFlag.body
    let SawBlade = entities.SawBlade.body
    let ReverseSpike = entities.ReverseSpike.body

    let MovingObjects = ['Spike', 'Spike2', 'Spike3', 'Spike4', 'ReverseSpike', 'BouncePad', 'Obstacle', 'Obstacle1', 'Obstacle2', 'Obstacle3', 'SawBlade', 'FinishFlag', 'Wall2', 'Wall3', 'Wall4']
    let TouchableSpikes = [Spike, Spike2, Spike3, Spike4, ReverseSpike]

    //let TouchingGround = false

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    
    /* Alternative jump funktion
    touches.filter(t => t.type === 'press').forEach(t => {
        Matter.Body.applyForce(Block, Block.position, {x: 0, y: -0.045})
        console.log("Tap")
    });
    */

    /* Jump restriction attempt
    Matter.Events.on(engine, 'collisionStart', (event) => {
        let pairs = event.pairs
        if(pairs[0].bodyA === Block || pairs[0].bodyB === Block) {
            touches.filter(t => t.type === 'press').forEach(t => {
                Matter.Body.setVelocity(entities.Block.body, {
                    x: 0,
                    y: -12
                })
            })
        }
    })
    */

    /* Jump restriction attempt
    touches.filter(t => t.type === 'press').forEach(t => {
        Matter.Events.on(engine, 'collisionStart', (event) => {
            console.log("Tap")
            let pairs = event.pairs
            if(pairs[0].bodyA === Block || pairs[0].bodyB === Block) {
                Matter.Body.setVelocity(entities.Block.body, {
                    x: 0,
                    y: -12
                })
                console.log("Tap")
            }
        })
    })
    */


    /* Jump restriction attempt
    Matter.Events.on(engine, 'collisionStart', (event) => {
        let pairs = event.pairs
        if(pairs[0].bodyA === Block) {
            TouchingGround = true
            console.log("test1")
        }
    })

    if(TouchingGround === true) {
        console.log("test2")
        touches.filter(t => t.type === 'press').forEach(t => {
            Matter.Body.setVelocity(entities.Block.body, {
                x: 0,
                y: -12
            })
            TouchingGround = false
            console.log("Tap")
        })
    }
    */
    
    //Jump function
    touches.filter(t => t.type === 'press').forEach(t => {
        Matter.Body.setVelocity(entities.Block.body, {
            x: 0,
            y: -12
        })
        console.log("Tap")
    })

    //Improved Spike collision
    Matter.Events.on(engine, 'collisionStart', (event) => {
        let pairs = event.pairs
        for(let i = 0; i < TouchableSpikes.length; i++) {
            if(pairs[0].bodyA === Block && pairs[0].bodyB === TouchableSpikes[i]) {
                console.log("Collision detected")
                dispatch({type: 'Increase_attempt'})
                World.remove(World, TouchableSpikes[i])
            }
        }
    })

    //SawBlade collision
    Matter.Events.on(engine, 'collisionStart', (event) => {
        let pairs = event.pairs
        if(pairs[0].bodyA === Block && pairs[0].bodyB === SawBlade) {
            console.log("Collision detected")
            dispatch({type: 'Increase_attempt'})
            World.remove(World, SawBlade)
        }
    })

    //Wall collision
    Matter.Events.on(engine, 'collisionStart', (event) => {
        let pairs = event.pairs
        if(pairs[0].bodyA === Wall && pairs[0].bodyB === Block) {
            console.log("Collision detected")
            dispatch({type: 'Increase_attempt'})
            World.remove(World, Wall)
        }
    })

    //Bouncepad collision
    Matter.Events.on(engine, 'collisionStart', (event) => {
        let pairs = event.pairs
        if(pairs[0].bodyA === Block && pairs[0].bodyB === BouncePad) {
            Matter.Body.setVelocity(entities.Block.body, {
                x: 0,
                y: -22
            })
        }
    })

    //Flag collision
    Matter.Events.on(engine, 'collisionStart', (event) => {
        let pairs = event.pairs
        if(pairs[0].bodyA === Block && pairs[0].bodyB === FinishFlag) {
            console.log("Collision detected")
            dispatch({type: 'Complete_level'})
            World.remove(World, FinishFlag)
        }
    })
    
    Matter.Engine.update(engine, time.delta)
    Matter.Body.rotate(SawBlade, 0.05)
    Matter.Body.setStatic(Spike, true)

    //Level object movement
    //Optimerad version
    MovingObjects.forEach( element => 
        Matter.Body.translate(entities[element].body, {x: -5, y: 0})
    )
    

    return entities;
}
export default Physics