import { ChangeEventHandler, Dispatch, SetStateAction, useId, useRef, useState } from "react";
import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
    Row,
    Col,
    Form,
    Button
} from "react-bootstrap";
import { Object } from "../../types";
import styles from "../../styles/sidebar.module.scss";
import { updateSelected, updateSelectedInput } from "../../store/slices/selectedSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { createObject, updateObject } from "../../store/slices/objectSlice";
import { text } from "node:stream/consumers";
import { SketchPicker } from 'react-color';

type Props = {
    addObject: VoidFunction,
    // selectedObject: Object|null;
    // setSelectedObject: Dispatch<SetStateAction<Object|null>>;
}

const ObjectBar = ({addObject}:Props) => {

    const objectId = useId();

    const objects:Array<Object> = useSelector<AppState, Array<Object>>((state)=>state.objects);
    const selectedObject:Object|null = useSelector<AppState, Object|null>((state)=>state.selected);
    const dispatch = useDispatch();

    const [element, setElement] = useState<string>("h1");
    const [isPickColour, setIsPickColour] = useState<boolean>(false);

    const validation = (name:string, input:string) => {

      switch (name) {
        case "classname":
            if(input.match(/^[a-zA-Z0-9_.-]*$/)){
                return true;
            }
            break;
      
        default:
            break;
      }
    }

    const onChangeColour = (color:any) => {
        console.log(color.hex);

        //update selected
        let updating = {...selectedObject, fill:color.hex};

        //update the whole
        let newState = objects.map(obj => {
                //if id matches, update property
                if (obj.objectId === selectedObject?.objectId) {
                return {...obj, fill:color.hex};
                }
                //otherwise return object as is
                return obj;
            });       
            
          if(updating && newState){
            dispatch(updateSelected(updating));
            dispatch(updateObject(newState));
          }
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(selectedObject){


        let updating;
        let newState;


        switch (e.target.name) {
            case "classname":
                //check validation
                if(validation(e.target.name,e.target.value)){
                    //update selected
                    updating = {...selectedObject, classname:e.target.value};

                    //update the whole
                    newState = objects.map(obj => {
                        //if id matches, update property
                        if (obj.objectId === selectedObject?.objectId) {
                        return {...obj, classname:e.target.value};
                        }
                        //otherwise return object as is
                        return obj;
                    });
                }
              break;

            case "text_content":
                //update selected
                const temp = {...selectedObject.text, content:e.target.value};
                updating = {...selectedObject, text:temp};

                    //update the whole
                    newState = objects.map(obj => {
                        //if id matches, update property
                        if (obj.objectId === selectedObject?.objectId) {
                        return {...obj, text:temp};
                        }
                        //otherwise return object as is
                        return obj;
                    });
              break;
          
            default:
              break;

          }

          if(updating && newState){
            dispatch(updateSelected(updating));
            dispatch(updateObject(newState));
          }

        }
    }

  return (
    <>
    {selectedObject ? 
    
    <Form.Group className={styles.form} controlId="form_tween">

    <Form.Label>Object class name</Form.Label>
    <Form.Control type="text" placeholder="classname" className="mb-2" name="classname" 
    value={selectedObject?selectedObject.classname:undefined}
    onChange={onChangeInput}/>

    <Form.Label>Select element</Form.Label>
    <Form.Select size="sm" placeholder="element" className="mb-2" onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{setElement(e.target.value)}}>
        <option value="h1">h1</option>
        <option value="h2">h2</option>
        <option value="h3">h3</option>
        <option value="h4">h4</option>
        <option value="h5">h5</option>
        <option value="h6">h6</option>
        <option value="p">p</option>
        <option value="shape">Shape element</option>
        <option value="image">Upload image</option>
    </Form.Select>

        {(element!=="shape" && element!=="image") && 
            <Form.Control type="text" as="textarea" placeholder="content" rows={3} className={`${styles.form_subdiv} mb-2`} 
            name="text_content" 
            value={selectedObject.text?selectedObject.text.content:undefined}
            onChange={onChangeInput}/>        
        }

        {element==="shape" && 
        <Form.Group className={`${styles.form_subdiv} mb-3`} controlId="select_shape">
            <Form.Select size="sm" placeholder="shape">
                <option value="Square">Square</option>
                <option value="Circle">Circle</option>
                <option value="Triangle">Triangle</option>
            </Form.Select>            
        </Form.Group>
        }
        {element==="image" && 
        <Form.Group className={`${styles.form_subdiv} mb-3`} controlId="upload_image">
            <Form.Control type="file" size="sm" placeholder="upload_image" value={selectedObject.url}/>
        </Form.Group>
        }

    <div className={styles.form_divided}>
        <div>
            <Form.Label>X</Form.Label>
            <Form.Control type="number" placeholder="horizontal" className="mb-2" value={selectedObject.positionX}/>
        </div>
        <div>
            <Form.Label>Y</Form.Label>
            <Form.Control type="number" placeholder="vertical" className="mb-2" value={selectedObject.positionY}/>
        </div>
    </div>

    <div className={styles.form_divided}>
        <div>
            <Form.Label>Width</Form.Label>
            <Form.Control type="number" placeholder="width" className="mb-2" value={selectedObject.width}/>
        </div>
        <div>
            <Form.Label>Height</Form.Label>
            <Form.Control type="number" placeholder="height" className="mb-2" value={selectedObject.height}/>
        </div>
    </div>

    <div className={styles.form_divided}>
        <div>
            <Form.Label>Rotation</Form.Label>
            <Form.Control type="number" placeholder="rotation" className="mb-2"/>
        </div>
        <div>
            <Form.Label>Fill</Form.Label>
            <Form.Control type="text" readOnly placeholder="fill" className="mb-2" value={selectedObject.fill} onClick={()=>setIsPickColour(!isPickColour)}/>
            {isPickColour && 
                <SketchPicker className={styles.colorPicker} color={selectedObject.fill} onChange={onChangeColour}/>
            }
        </div>
    </div>

    <Form.Label>Duration (s)</Form.Label>
    <Form.Control type="number" step={0.25} placeholder="duration" className="mb-2"/>


    </Form.Group>
    :
    <div>
        <p>Please select an object or create a new object.</p>
        <Button 
        className={styles.add_new_button}
            onClick={addObject}
        >Add new</Button>
    </div>
    }
    </>

  );
}

export default ObjectBar;