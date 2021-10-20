import React from 'react'
import { View, Image } from 'react-native'
import Matter from 'matter-js'
import Obst_png from '../assets/Obst.png'

const Obstacle = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    return(
        <Image
        style={{
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}
        source={Obst_png}
        />
    )
}

export default (world, color, pos, size) => {
    
    const initialObstacle = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: true
        }
    )
    Matter.World.add(world, initialObstacle)

    return{
        body: initialObstacle,
        color,
        pos,
        renderer: <Obstacle/>
    }
}