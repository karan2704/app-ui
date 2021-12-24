import React from 'react'
import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DiagramModel
} from '@projectstorm/react-diagrams';
import { action } from '@storybook/addon-actions';
import {
    CanvasWidget
} from '@projectstorm/react-canvas-core';


export default function BasicConnection() {
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

    let link1 = port1.link<DefaultLinkModel>(port2);
    link1.getOptions().testName = "Test";
    link1.addLabel("Link");

    const models = model.addAll(node1, node2, link1);

    models.forEach((item) => {
        item.registerListener({
            eventDidFire: action('element eventDidFire')
        });
    });

    model.registerListener({
        eventDidFire: action('model eventDidFire')
    });

    engine.setModel(model);
    return <CanvasWidget engine={engine} className="canvas" />;

}
