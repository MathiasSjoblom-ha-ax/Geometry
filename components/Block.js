import React from 'react'
import { View, Image } from 'react-native'
import Matter from 'matter-js'
import skin_png from '../assets/skin.png'

const Block = props => {
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
        source={skin_png}
        />
    )
}

export default (world, color, pos, size) => {
    
    const initialBlock = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height
    )
    Matter.World.add(world, initialBlock)

    return{
        body: initialBlock,
        color,
        pos,
        renderer: <Block/>
    }
}