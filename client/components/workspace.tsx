import { useEffect, useId, useRef, useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Form
} from "react-bootstrap";
import SideBar from "./sidebar";
import Draggable, { DraggableData, DraggableEventHandler } from "react-draggable";
import { Timeline, Object, Tween, Inherit, Repeat, Yoyo } from "../types";
import { createObject, updateObject, deleteObject } from "../store/slices/objectSlice";
import { updateSelected } from "../store/slices/selectedSlice";
import { updateTimeline } from "../store/slices/timelineSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store/store";
import Image from "next/image";
import square from "../assets/shapes/square.svg";
import test from "../assets/shapes/test.png";

const Workspace = () => {

    const objectId = useId();

    // const [objects, setObjects] = useState<Array<Object>>([{
    //     objectId: objectId,
    //     classname: "your-class-name",
    //     url: "",
    //     positionX: 0,
    //     positionY: 0,
    //     width: 100,
    //     height: 100,
    //     defaultDuration: 5
    // }]);
    
    const timeline:Timeline = useSelector<AppState, Timeline>((state)=>state.timeline);
    const objects:Array<Object> = useSelector<AppState, Array<Object>>((state)=>state.objects);
    const selectedObject:Object|null = useSelector<AppState, Object|null>((state)=>state.selected);
    const dispatch = useDispatch();

    const [tab, setTab] = useState<string>("Timeline");

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
        const adding:Object = {
            objectId: `${objectId}-${new Date().getTime().toString()}`,
            classname: "your-class-name",
            text: {
                style:"h1",
                content: "Hello world!"
            },
            shape: undefined,
            url: undefined,
            positionX: 0,
            positionY: 0,
            width: 300,
            height: 100,
            fill:"#000000",
            defaultDuration: 5
        }
        dispatch(createObject(adding))
        dispatch(updateSelected(adding));
        setTab("Object");
    }

    const canvaOnDrag:DraggableEventHandler = (e, data) => {
        let updating = selectedObject ? {...selectedObject, positionX:data.x, positionY:data.y} : null;
        dispatch(updateSelected(updating));
        setTab("Object");
    }

    const canvaOnStop:DraggableEventHandler = (e, data) => {

        const newState = objects.map(obj => {
            //if id matches, update property
            if (obj.objectId === selectedObject?.objectId) {
              return {...obj, positionX: data.x, positionY: data.y};
            }
            //otherwise return object as is
            return obj;
          });

          dispatch(updateObject(newState));
          setTab("Object");
    }


  return (
        <>   
            <SideBar addObject={addObject} tab={tab} setTab={setTab}/>

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
                            key={item.objectId}
                            bounds=".canvaParent"
                            axis="both"
                            onMouseDown={()=>{dispatch(updateSelected(item))}}
                            onDrag={canvaOnDrag}
                            onStop={canvaOnStop}
                            defaultPosition={{x: 0, y: 0}}>
                                {item.text?.style === "h1" && 
                                    <div 
                                    id={item.objectId}
                                    style={{
                                        width:item.width,
                                        height:item.height,
                                        position:"absolute",
                                        color:item.fill
                                    }}>
                                        <h1>{item.text.content}</h1>
                                    </div>
                                }
                                {/* {item.shape && 
                                <div 
                                    id={item.objectId}
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
                                } */}
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
                                    {[...Array(timeline.duration+1)].map((item,index)=>{

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
                                {objects && objects.map((item:Object|any,index:number)=>(
                                    <tr key={`row-${index}`}
                                    className={`${selectedObject?.objectId===item.objectId && "active"}`} 
                                    onMouseDown={()=>{
                                        dispatch(updateSelected(item));
                                        setTab("Object");
                                    }}
                                    >
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
                                                    grid={[(((80*10)/timeline.duration)/5),0]}
                                                    >
                                                    <div style={{
                                                        backgroundColor:"#56910a",
                                                        width:(item.duration ? (item.duration) : (item.defaultDuration))*((83*10)/timeline.duration),
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