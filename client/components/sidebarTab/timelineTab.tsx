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
import { Object, Timeline } from "../../types";
import styles from "../../styles/sidebar.module.scss";
import { updateSelected } from "../../store/slices/selectedSlice";
import { updateTimeline } from "../../store/slices/timelineSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";

const TimelineBar = () => {

    const timeline:Timeline = useSelector<AppState, Timeline>((state)=>state.timeline);
    const dispatch = useDispatch();

    const validation = (name:string, input:string) => {

        switch (name) {
          case "name":
              if(input.match(/^[a-zA-Z0-9_.-]*$/)){
                  return true;
              }
              break;
        
          default:
              break;
        }
      }
  
      const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        let newState:Timeline;
  
        if(timeline){

            switch (e.target.name) {
                case "name":
                    if(validation(e.target.name, e.target.value)){
                        newState = {...timeline, name:e.target.value};
                        dispatch(updateTimeline(newState));
                    }
                  break;

                case "duration":
                    newState = {...timeline, duration:parseFloat(e.target.value)};
                    dispatch(updateTimeline(newState));
                  break;
  
                case "delay":
                    newState = {...timeline, delay:parseFloat(e.target.value)};
                    dispatch(updateTimeline(newState));
                  break;

                case "repeat":
                    newState = {...timeline, repeat:e.target.checked};
                    dispatch(updateTimeline(newState));
                  break;

                case "repeatTimes":
                    newState = {...timeline, repeatTimes:parseFloat(e.target.value)};
                    dispatch(updateTimeline(newState));
                  break;

                case "repeatDelay":
                    newState = {...timeline, repeatDelay:parseFloat(e.target.value)};
                    dispatch(updateTimeline(newState));
                  break;
            
                case "reversed":
                    newState = {...timeline, reversed:e.target.checked};
                    dispatch(updateTimeline(newState));
                  break;

                case "yoyo":
                    newState = {...timeline, yoyo:e.target.checked};
                    dispatch(updateTimeline(newState));
                  break;

                case "yoyoEase":
                    newState = {...timeline, yoyoEase:e.target.value};
                    dispatch(updateTimeline(newState));
                  break;

                case "timeScale":
                    newState = {...timeline, timeScale:parseFloat(e.target.value)};
                    dispatch(updateTimeline(newState));
                  break;

                case "defaults":
                    newState = {...timeline, defaults:e.target.checked};
                    dispatch(updateTimeline(newState));
                  break;

                case "defaultsDuration":
                    newState = {...timeline, defaultsDuration:parseFloat(e.target.value)};
                    dispatch(updateTimeline(newState));
                  break;

                case "defaultsEase":
                    newState = {...timeline, defaultsEase: e.target.value};
                    dispatch(updateTimeline(newState));
                  break;

                case "parentID":
                    newState = {...timeline, parentId:e.target.value};
                    dispatch(updateTimeline(newState));
                  break;
              
                default:
                  break;
    
              }


        }


                
            
      }

  return (
    <Form.Group className={styles.form} controlId="form_tween">

    <Form.Label>Timeline name</Form.Label>
    <Form.Control type="text" placeholder="timeline" className="mb-2" 
    name="name"
    value={timeline.name}
    onChange={onChangeInput}
    />

    <Form.Label>Duration</Form.Label>
    <Form.Control type="number" min={1} placeholder="seconds" className="mb-2" 
    name="duration"
    value={timeline.duration}
    onChange={onChangeInput}
    />

    <Form.Label>Delay</Form.Label>
    <Form.Control type="number" step={0.25} min={0} placeholder="seconds" className="mb-3" 
    name="delay"
    value={timeline.delay}
    onChange={onChangeInput}
    />

    <div className={`${styles.form_checkbox} mb-2`}>
        <Form.Label>Repeat</Form.Label>
        <Form.Check
        type="checkbox"
        id="repeatCheckbox"
        isValid={timeline.repeat}
        name="repeat"
        onChange={onChangeInput}
        />  
    </div>

    <Form.Group className={`${styles.form_subdiv} mb-3 ${(!timeline.repeat)&&styles.inactive}`} controlId="form_repeat">
        <Form.Label>Repeat times</Form.Label>
        <Form.Control type="number" placeholder="times" min={0} className="mb-2" 
        name="repeatTimes"
        value={timeline.repeatTimes} 
        disabled={!timeline.repeat} 
        onChange={onChangeInput}
        />
        <Form.Label>Repeat delay</Form.Label>
        <Form.Control type="number" step={0.25} min={0} placeholder="seconds" 
        name="repeatDelay"
        value={timeline.repeatDelay} 
        disabled={!timeline.repeat}
        onChange={onChangeInput}
        />
    </Form.Group>



    <div className={`${styles.form_checkbox} mb-2`}>
        <Form.Label>Reversed</Form.Label>
        <Form.Check
        type="checkbox"
        id="reversedCheckbox"
        isValid={timeline.reversed}
        name="reversed"
        onChange={onChangeInput}
        />  
    </div>

    <div className={`${styles.form_checkbox} mb-2`}>
        <Form.Label>Yoyo</Form.Label>
        <Form.Check
        type="checkbox"
        id="yoyoCheckbox"
        isValid={timeline.yoyo}
        name="yoyo"
        onChange={onChangeInput}
        />  
    </div>

    <Form.Group className={`${styles.form_subdiv} mb-3 ${(!timeline.yoyo)&&styles.inactive}`} controlId="form_yoyo">
        <Form.Label>Yoyo ease</Form.Label>
        <Form.Control type="text" placeholder="yoyo_ease" className="mb-2" 
        name="yoyoEase"
        value={timeline.yoyoEase} 
        disabled={!timeline.yoyo}
        onChange={onChangeInput}
        />
    </Form.Group>    
    

    <Form.Label>Time Scale</Form.Label>
    <Form.Control type="number" step={0.25} min={0} placeholder="multiply by" className="mb-3" 
    name="timeScale"
    value={timeline.timeScale}
    onChange={onChangeInput}
    />

    <div className={`${styles.form_checkbox} mb-2`}>
        <Form.Label>Defaults</Form.Label>
        <Form.Check
        type="checkbox"
        id="repeatCheckbox"
        name="defaults"
        isValid={timeline.defaults}
        onChange={onChangeInput}
        />  
    </div>

    <Form.Group className={`${styles.form_subdiv} mb-3 ${(!timeline.defaults)&&styles.inactive}`} controlId="form_default">
        <Form.Label>Duration</Form.Label>
        <Form.Control type="number" step={0.25} min={0} placeholder="seconds" className="mb-2" 
        name="defaultsDuration"
        value={timeline.defaultsDuration} 
        disabled={!timeline.defaults}
        onChange={onChangeInput}
        />
        <Form.Label>Ease</Form.Label>
        <Form.Control type="text" placeholder="ease" 
        name="defaultsEase"
        value={timeline.defaultsEase} 
        disabled={!timeline.defaults}
        onChange={onChangeInput}
        />
    </Form.Group>    

    <Form.Label>Parent ID</Form.Label>
    <Form.Control type="text" placeholder="parent" className="mb-2" 
    name="parentID"
    value={timeline.parentId}
    onChange={onChangeInput}
    />

</Form.Group>
  );
}

export default TimelineBar;