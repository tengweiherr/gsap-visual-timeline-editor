import { useEffect, useId, useRef, useState } from "react";
import {
    Container,
    Row,
    Col,
    Button
} from "react-bootstrap";
import SideBar from "./sidebar";
import Draggable, { DraggableData, DraggableEventHandler } from "react-draggable";
import { Object, Tween, Inherit, Repeat, Yoyo } from "../types";

const Workspace = () => {

    const objectId = useId();

    const [objects, setObjects] = useState<Array<Object>>([{
        objectId: `${objectId}-${new Date()}`,
        classname: "your-class-name",
        createdAt: new Date(),
        url: "",
        positionX: 0,
        positionY: 0,
        width: 100,
        height: 100,
        defaultDuration: 5
    }]);

    const [selectedObject, setSelectedObject] = useState<Object|null>(null);
    
    const [timeline, setTimeline] = useState<number>(15);

    const [initialPos, setInitialPos] = useState(null);
    const [initialSize, setInitialSize] = useState(null);

    // const initial = (e) => {
        
    //     let resizable = document.getElementById('Resizable');
        
    //     setInitialPos(e.clientX);
    //     setInitialSize(resizable.offsetWidth);
        
    // }
    
    // const resize = (e) => {
        
    //     let resizable = document.getElementById('Resizable');
      
    //     resizable.style.width = `${parseInt(initialSize) + parseInt(e.clientX - initialPos)}px`;
      
    // }

    const addObject = () => {
      setObjects((prev)=>[...prev, {
        objectId: `${objectId}-${new Date()}`,
        classname: "your-class-name",
        createdAt: new Date(),
        url: "",
        positionX: 0,
        positionY: 0,
        width: 100,
        height: 100,
        defaultDuration: 5
    }]);
    }

    const updateObjects = (dataToUpdate:DraggableData) => {
        const newState = objects.map(obj => {
            //if id matches, update property
            if (obj.objectId === selectedObject?.objectId) {
              return {...obj, positionX: dataToUpdate.x, positionY: dataToUpdate.y};
            }
            //otherwise return object as is
            return obj;
          });
      
          setObjects(newState);        
    }

    const canvaOnDrag:DraggableEventHandler = (e, data) => {
        let updating = selectedObject ? {...selectedObject, positionX:data.x, positionY:data.y} : null;
        setSelectedObject(updating);
    }

    const canvaOnStop:DraggableEventHandler = (e, data) => {
      updateObjects(data);
    }


  return (
        <>   
            <SideBar selectedObject={selectedObject} setSelectedObject={setSelectedObject}/>

            <div style={{
            height: "100%",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between",
            position:"relative",
            overflowX:"hidden",
            overflowY:"auto",
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: "auto"
            }}>

                <div style={{
                backgroundColor:"#3a3a3a",
                width:"100%",
                height:"calc(100% - 243px)",
                overflowX:"hidden",
                overflowY:"auto",
                padding:"100px 0",
                // flexGrow: 1,
                // flexShrink: 1,
                // flexBasis: "20%"
                }}>
                    <div className="canvaParent" style={{
                        width:"50vw",
                        height:"1000px",
                        backgroundColor:"white",
                        margin: "0 auto",
                        position:"relative",
                        overflow: "hidden"
                    }}>
                        {objects && objects.map((item,index)=>(
                            <Draggable 
                            bounds=".canvaParent"
                            axis="both"
                            onMouseDown={()=>{setSelectedObject(item)}}
                            onDrag={canvaOnDrag}
                            onStop={canvaOnStop}
                            defaultPosition={{x: 0, y: 0}}>
                                <div 
                                id={item.objectId}
                                key={item.objectId}
                                style={{
                                    width:item.width,
                                    height:item.height,
                                    backgroundColor:"yellow",
                                    position:"absolute"
                                    }}>
                                    <div 
                                    className="resize"
                                    style={{
                                        width:20,
                                        height:20,
                                        backgroundColor:"black",
                                        position:"absolute",
                                        right:0,
                                        bottom:0,
                                        zIndex:999
                                        }}></div>
                                </div>
                            </Draggable>   
                        ))}
 
                    </div>
                </div>

                <div style={{
                backgroundColor:"#202020",
                height:"fit-content",
                width:"100%",  
                alignSelf: "end",
                position:"relative",
                bottom:0,
                // flexGrow: 1,
                // flexShrink: 1,
                // flexBasis: "auto"
                }}>
                    <Row style={{
                        height:50,
                        flexDirection:"column",
                        padding:10,
                    }}>
                        <Col style={{
                            width:"fit-content",
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            alignSelf:"start"
                        }}>
                            <Button 
                            onClick={addObject}
                            style={{
                                marginRight: 10,
                                padding:"5px 15px",
                                fontSize:"0.7rem",
                                backgroundColor:"orange",
                                border:"none",
                                color:"black"
                            }}>Add new</Button>
                        </Col>
                        <Col style={{
                            width:"fit-content",
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            alignSelf:"end"
                        }}>
                            <Button style={{
                                marginRight: 10,
                                padding:"5px 15px",
                                fontSize:"0.7rem",
                                backgroundColor:"#d8c625",
                                border:"none",
                                color:"black"
                            }}>Play</Button>
                            <Button style={{
                                marginRight: 10,
                                padding:"5px 15px",
                                fontSize:"0.7rem",
                                backgroundColor:"#56910a",
                                border:"none",
                                color:"black"
                            }}>Convert</Button>
                        </Col>
                    </Row>

                    <div style={{
                        height:193,
                        width:"100%",
                        overflow:"auto",
                    }}>  
                        <table style={{
                            width:"100%",
                            height:"100%",
                        }}>
                            <tbody style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start"
                            }}>
                                <tr style={{
                                    display: "flex",
                                    alignItems: "flex-end"
                                }}>
                                <th style={{
                                    padding:"0 18px",
                                    minWidth:200
                                }}>
                                    <span>Time</span>
                                </th>
                                <th style={{
                                    width:"100%",
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"flex-end",
                                    height:"100%",
                                    padding:0,
                                    borderBottom:"2px white",
                                    borderStyle:"inset",
                                    marginLeft:12,
                                    marginRight:12,
                                    marginBottom:3
                                }}>
                                    {[...Array(timeline+1)].map((item,index)=>{

                                        const rendered = (index%5===0) ? 
                                            <div key={`timestamp-${index}`} style={{
                                                height:8,
                                                width:1,
                                                backgroundColor:"white",
                                                opacity:1,
                                            }}></div>   
                                            : 
                                            <div key={`timestamp-${index}`} style={{
                                                height:5,
                                                width:1,
                                                backgroundColor:"white",
                                                opacity:0.7,
                                            }}></div>                                        
                                        
                                            return rendered;

                                    })}
                                </th> 
                            </tr>
                                {objects && objects.map((item:any,index:number)=>(
                                    <tr key={`row-${index}`}>
                                        <td style={{
                                            minWidth:200,
                                            padding:"4px 8px"
                                        }}>
                                            <div style={{
                                                backgroundColor:"#2d2d2d",
                                                borderRadius:4,
                                                padding: "3px 10px"
                                            }}>
                                                <span style={{fontSize:13}}>{item.classname}</span>
                                            </div>
                                        </td>
                                        <td style={{
                                            padding:"4px 0",
                                            width:"100%"
                                        }}>
                                            <div style={{
                                                backgroundColor:"#2d2d2d",
                                                padding:"5px 10px",
                                                borderRadius:4,
                                            }}>
                                                    <Draggable 
                                                    bounds="parent" 
                                                    axis="x"
                                                    grid={[(((80*10)/timeline)/5),0]}
                                                    >
                                                    <div style={{
                                                        backgroundColor:"#56910a",
                                                        width:(item.duration ? (item.duration) : (item.defaultDuration))*((83*10)/timeline),
                                                        height:20,
                                                        borderRadius:20,
                                                        border:"3px rgba(0,0,0,0.5)",
                                                        borderStyle:"inset",
                                                    }}></div>
                                                    </Draggable>


                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    {/* <Draggable 
                    bounds="parent"
                    axis="both">
                        <p style={{width:"fit-content"}}>Hellooo</p>
                    </Draggable> */}

                    </div>

                </div>
            </div>
        </>

  );
}

export default Workspace;