import Matter, { Engine, World } from "matter-js"

const Physics = (entities, {touches, time, dispatch}) => {

    let engine = entities.physics.engine
    let Block = entities.Block.body
    let Spike = entities.Spike.body
    let Wall = entities.Wall.body
    let BouncePad = entities.BouncePad.body
    let FinishFlag = entities.FinishFlag.body
    let SawBlade = entities.SawBlade.body

    let MovingObjects = ['Spike', 'Spike2', 'BouncePad', 'Obstacle', 'Obstacle1', 'Obstacle2', 'Obstacle3', 'SawBlade', 'FinishFlag']

    
    /*
    touches.filter(t => t.type === 'press').forEach(t => {
        Matter.Body.applyForce(Block, Block.position, {x: 0, y: -0.045})
        console.log("Tap")
    });
    */

    /*
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

    /*
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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    
    touches.filter(t => t.type === 'press').forEach(t => {
        Matter.Body.setVelocity(entities.Block.body, {
            x: 0,
            y: -12
        })
        console.log("Tap")
    })
    

    //Spike collision
    Matter.Events.on(engine, 'collisionStart', (event) => {
        let pairs = event.pairs
        if(pairs[0].bodyA === Block && pairs[0].bodyB === Spike) {
            console.log("Collision detected")
            dispatch({type: 'Increase_attempt'})
            World.remove(World, Spike)
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
        }
    })
    
    Matter.Engine.update(engine, time.delta)
    Matter.Body.rotate(SawBlade, 0.05)

    //Level object movement
    //Optimerad version
    MovingObjects.forEach( element => 
        Matter.Body.translate(entities[element].body, {x: -3, y: 0})
    )
    /*
    Matter.Body.translate(entities['Spike'].body, {x: -3, y: 0})
    Matter.Body.translate(entities['Spike2'].body, {x: -3, y: 0})
    Matter.Body.translate(entities['BouncePad'].body, {x: -3, y: 0})
    Matter.Body.translate(entities['Obstacle'].body, {x: -3, y: 0})
    Matter.Body.translate(entities['Obstacle1'].body, {x: -3, y: 0})
    Matter.Body.translate(entities['Obstacle2'].body, {x: -3, y: 0})
    Matter.Body.translate(entities['Obstacle3'].body, {x: -3, y: 0})
    Matter.Body.translate(entities['SawBlade'].body, {x: -3, y: 0})
    Matter.Body.translate(entities['FinishFlag'].body, {x: -3, y: 0})
    */

    

    return entities;
}
export default Physics