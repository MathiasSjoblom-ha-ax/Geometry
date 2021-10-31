import React from 'react'
import { Image } from 'react-native'
import Matter from 'matter-js'
import ReverseSpike_png from '../assets/ReverseSpike.png'

const ReverseSpike = props => {
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
        source={ReverseSpike_png}
        />
    )
}

export default (world, color, pos, size) => {
    
    const initialReverseSpike = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: true
        }
    )
    Matter.World.add(world, initialReverseSpike)

    return{
        body: initialReverseSpike,
        color,
        pos,
        renderer: <ReverseSpike/>
    }
}