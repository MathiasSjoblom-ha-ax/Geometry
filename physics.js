import Matter, { Engine, World } from "matter-js"

const Physics = (entities, {touches, time, dispatch}) => {

    let engine = entities.physics.engine
    let Block = entities.Block.body
    let Spike = entities.Spike.body
    let Wall = entities.Wall.body
    let BouncePad = entities.BouncePad.body
    //let FinishFlag = entities.FinishFlag.body
    
    /*
    touches.filter(t => t.type === 'press').forEach(t => {
        Matter.Body.applyForce(Block, Block.position, {x: 0, y: -0.049})
        console.log("Tap")
    });
    */
    /*
    Matter.Events.on(engine, 'collisionStart', (event) => {
        let pairs = event.pairs
        console.log("1")
        if(pairs[0].bodyA === Block || pairs[0].bodyB === Block) {
            console.log("2")
            touches.filter(t => t.type === 'press').forEach(t => {
                console.log(t)
                Matter.Body.setVelocity(entities.Block.body, {
                    x: 0,
                    y: -12
                })
                console.log("3")
            })
        }
    })
    */

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    
    touches.filter(t => t.type === 'press').forEach(t => {
        Matter.Body.setVelocity(entities.Block.body, {
            x: 0,
            y: -10
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
                y: -20
            })
        }
    })

    /*
    //Flag collision
    Matter.Events.on(engine, 'collisionStart', (event) => {
        let pairs = event.pairs
        if(pairs[0].bodyA === Block && pairs[0].bodyB === FinishFlag) {
            console.log("Collision detected")
            dispatch({type: 'Complete_level'})
            World.remove(World, FinishFlag)
        }
    })
    */

    Matter.Engine.update(engine, time.delta)

    //Level object movement
    Matter.Body.translate(entities['Spike'].body, {x: -3, y: 0})
    Matter.Body.translate(entities['BouncePad'].body, {x: -3, y: 0})
    Matter.Body.translate(entities['Obstacle'].body, {x: -3, y: 0})
    Matter.Body.translate(entities['Obstacle1'].body, {x: -3, y: 0})
    Matter.Body.translate(entities['Obstacle2'].body, {x: -3, y: 0})
    Matter.Body.translate(entities['Obstacle3'].body, {x: -3, y: 0})

    

    return entities;
}
export default Physics