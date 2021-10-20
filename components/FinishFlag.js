import React from 'react'
import { View } from 'react-native'
import Matter from 'matter-js'

const FinishFlag = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    const color = props.color;

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
    
    const initialFinishFlag = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: true
        }

    )
    Matter.World.add(world, initialFinishFlag)

    return{
        body: initialFinishFlag,
        color,
        pos,
        renderer: <FinishFlag/>
    }
}