import React, { useEffect, useState } from 'react'
import axios from 'axios';
import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DiagramModel
} from '@projectstorm/react-diagrams';
import {
    CanvasWidget
} from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './helper/DemoCanvasWidget';


export default function BasicConnection() {

    useEffect(() => {
        models.forEach((item) => {
            console.log(item)
        });


        const payload = {
            "components": [
                {
                    "id": "c1",
                    "name": "Source",
                },
                {
                    "id": "c2",
                    "name": "Destination"
                }
            ],
            "links": [
                {
                    "src": "c1",
                    "dest": "c2"
                }
            ]
        }

        axios.post('/api/state/cache', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(payload)
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }, [])


    var engine = createEngine();

    var model = new DiagramModel();

    var node1 = new DefaultNodeModel({
        name: "Source",
        color: "rgb(0,192,255)",
    });
    node1.setPosition(100, 100);
    let port1 = node1.addOutPort("Out");

    var node2 = new DefaultNodeModel("Destination", "rgb(192,255,0)");
    let port2 = node2.addInPort("In");
    node2.setPosition(400, 100);

    const link1 = port1.link(port2);
    (link1 as DefaultLinkModel).addLabel('Link');


    const models = model.addAll(node1, node2, link1);


    engine.setModel(model);
    return (
        <DemoCanvasWidget>
            <CanvasWidget engine={engine} />
        </DemoCanvasWidget>
    );

}
