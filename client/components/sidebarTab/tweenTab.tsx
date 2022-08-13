import { Dispatch, SetStateAction, useState } from "react";
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
import { updateSelected } from "../../store/slices/selectedSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";

const TweenBar = () => {

    const selectedObject:Object|null = useSelector<AppState, Object|null>((state)=>state.selected);

  return (
    <Form.Group className={styles.form} controlId="form_tween">

    <Form.Label>Object class name</Form.Label>
    <Form.Control type="text" placeholder="classname" className="mb-2" value={selectedObject?selectedObject.classname:undefined}/>

    <Form.Label>Type</Form.Label>
    <Form.Select size="sm" placeholder="type" className="mb-2">
        <option>From To</option>
        <option>From</option>
        <option>To</option>
    </Form.Select>

    <div className={styles.form_divided}>
        <div>
            <Form.Label>X</Form.Label>
            <Form.Control type="number" placeholder="horizontal" className="mb-2" value={selectedObject?selectedObject.positionX:undefined}/>
        </div>
        <div>
            <Form.Label>Y</Form.Label>
            <Form.Control type="number" placeholder="vertical" className="mb-2" value={selectedObject?selectedObject.positionY:undefined}/>
        </div>
    </div>

    <div className={styles.form_divided}>
        <div>
            <Form.Label>Rotation</Form.Label>
            <Form.Control type="number" placeholder="rotation" className="mb-2"/>
        </div>
        <div>
            <Form.Label>Fill (SVG)</Form.Label>
            <Form.Control type="text" placeholder="svg colour" className="mb-2"/>
        </div>
    </div>

    <Form.Label>Duration (s)</Form.Label>
    <Form.Control type="number" step={0.25} placeholder="duration" className="mb-2"/>

    <Form.Label>Ease</Form.Label>
    <Form.Control type="text" placeholder="ease" className="mb-2"/>

    <Form.Label>Time adjust</Form.Label>
    <Form.Control type="number" step={0.25} placeholder="time adjust" className="mb-2"/>

    <div className={`${styles.form_checkbox} mb-2 pt-3`}>
        <Form.Label>Inherit</Form.Label>
        <Form.Check
        type="checkbox"
        id="inheritCheckbox"
        />  
    </div>

    <Form.Group className={`${styles.form_subdiv} mb-4`} controlId="form_inherit">
            <Form.Label>Duration (s)</Form.Label>
            <Form.Control type="number" step={0.25} placeholder="duration" className="mb-2"/>
            <Form.Label>Ease</Form.Label>
            <Form.Control type="text" placeholder="ease"/>
    </Form.Group>

    <div className={`${styles.form_checkbox} mb-2`}>
        <Form.Label>Repeat</Form.Label>
        <Form.Check
        type="checkbox"
        id="repeatCheckbox"
        />  
    </div>

    <Form.Group className={`${styles.form_subdiv} mb-4`} controlId="form_repeat">
            <Form.Label>Repeat times</Form.Label>
            <Form.Control type="number" placeholder="repeat_times" className="mb-2"/>
            <Form.Label>Repeat delay</Form.Label>
            <Form.Control type="number" step={0.25} placeholder="repeat_delay"/>
    </Form.Group>

    <div className={`${styles.form_checkbox} mb-3`}>
        <Form.Label>Reversed</Form.Label>
        <Form.Check
        type="checkbox"
        id="reversedCheckbox"
        />  
    </div>

    <div className={`${styles.form_checkbox} mb-2`}>
        <Form.Label>Yoyo</Form.Label>
        <Form.Check
        type="checkbox"
        id="yoyoCheckbox"
        />  
    </div>

    <Form.Group className={`${styles.form_subdiv} mb-4`} controlId="form_yoyo">
            <Form.Label>Yoyo ease</Form.Label>
            <Form.Control type="number" placeholder="yoyo_ease" className="mb-2"/>
    </Form.Group>

    <Form.Label>Stagger</Form.Label>
    <Form.Control type="number" placeholder="stagger" className="mb-2"/>

</Form.Group>
  );
}

export default TweenBar;