import { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Button
} from "react-bootstrap";
import SideBar from "./sidebar";
import Draggable from "react-draggable";

const Workspace = () => {

    const [data, setData] = useState<any>([{}]);

    useEffect(() => {
      
        const temp = [
            {
                classname:"testing-1",
                time:"123"
            },
            {
                classname:"testing-2",
                time:"472"
            },
            {
                classname:"testing-3",
                time:"943"
            },
        ];

        setData(temp);
    }, [])

    if (data.length === 0) {
        return null;
      }

  return (
        <>   
            <SideBar/>

            <div style={{
            height: "100%",
            display:"flex",
            flexDirection:"column",
            position:"relative",
            overflow:"hidden",
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: "auto"
            }}>

                <div style={{
                backgroundColor:"white",
                width:"100%",
                flexGrow: 3,
                flexShrink: 1,
                flexBasis: "auto"
                }}>
                </div>

                <div style={{
                backgroundColor:"#202020",
                height:"fit-content",
                width:"100%",  
                alignSelf: "end",
                position:"relative",
                bottom:0,
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: "auto"
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
                        backgroundColor:"yellow",
                        height:"fit-content",
                        width:"100%",
                    }}>  
                        <table style={{
                            width:"100%",
                            height:"100%",
                            backgroundColor:"#080808"
                        }}>
                            <tbody>
                                <tr>
                                <th style={{
                                    width:150
                                }}>Time</th>
                                <th>-</th> 
                            </tr>
                                {data && data.map((item:any,index:number)=>(
                                    <tr>
                                        <td>{item.classname}</td>
                                        <td>{item.time}</td>
                                    </tr>
                                ))}
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