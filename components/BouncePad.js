import React from 'react'
import { View, Image } from 'react-native'
import Matter from 'matter-js'
import BouncePad_png from '../assets/BouncePad.png'

const BouncePad = props => {
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
        source={BouncePad_png}
        />
    )
}

export default (world, color, pos, size) => {
    
    const initialBouncePad = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: true,
            isSensor: true
        }
    )
    Matter.World.add(world, initialBouncePad)

    return{
        body: initialBouncePad,
        color,
        pos,
        renderer: <BouncePad/>
    }
}