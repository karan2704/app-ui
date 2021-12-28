import { useState, useEffect } from 'react'
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


    const [link, setLink] = useState([{
        "src": "",
        "dest": ""
    }])

    const [components, setComponents] = useState([
        {
            "id": "",
            "name": "Source",
        },
        {
            "id": "",
            "name": "Destination"
        }
    ])

    const sendReq = () => {

        setComponents([
            {
                "id": models[0].options.id,
                "name": "Source",
            },
            {
                "id": models[1].options.id,
                "name": "Destination"
            }
        ])

        const payload = {
            "components": components,
            "links": link
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
    }


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

    const models: any = model.addAll(node1, node2, link1);

    model.registerListener({
        nodesUpdated: function (e: any) {
            console.log(e);
        },
        linksUpdated: function (e: any) {
            console.log(e);
            e.link.sourcePort && e.link.targetPort ? (
                setLink([
                    {
                        "src": e.link.sourcePort.options.id,
                        "dest": e.link.targetPort.options.id
                    }
                ])
            ) : (setLink([]))
            sendReq()
        },
        offsetUpdated: function (e: any) {
            console.log(`Drag Event: Setup shifted to position ${e.offsetX}, ${e.offsetY}`);
        },
        entityRemoved: function (e: any) {
            console.log('Link Deleted');
        }
    })

    engine.setModel(model);
    return (
        <DemoCanvasWidget>
            <CanvasWidget engine={engine} />
        </DemoCanvasWidget>
    );

}
