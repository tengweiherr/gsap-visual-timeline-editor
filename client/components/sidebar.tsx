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
import { Object } from "../types";
import styles from "../styles/sidebar.module.scss";
import { updateSelected } from "../store/slices/selectedSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store/store";
import TweenBar from "./sidebarTab/tweenTab";
import TimelineBar from "./sidebarTab/timelineTab";
import ObjectBar from "./sidebarTab/objectTab";

type Props = {
    addObject: VoidFunction
    tab: string,
    setTab: Dispatch<SetStateAction<string>>;
    // selectedObject: Object|null;
    // setSelectedObject: Dispatch<SetStateAction<Object|null>>;
}

const SideBar = ({addObject, tab, setTab}:Props) => {

    const selectedObject:Object|null = useSelector<AppState, Object|null>((state)=>state.selected);

    // const [tab, setTab] = useState<string>("Timeline");

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const toggleSidebar = () => {
        isOpen === true ? setIsOpen(false) : setIsOpen(true);
        console.log(isOpen);
    }

  return (
      <div className={styles.sidebar}>
        <div className={styles.firstbar}>
            <a href="#" className={`${tab==="Timeline"&&"active"}`} onClick={()=>setTab("Timeline")}>Timeline</a>
            <a href="#" className={`${tab==="Object"&&"active"}`} onClick={()=>setTab("Object")}>Object</a>
            <a href="#" className={`${tab==="Tween"&&"active"}`} onClick={()=>setTab("Tween")}>Tween</a>
        </div>
        <div className={`${styles.secondbar} ${isOpen === true ? "opened" : "closed"}`}>
            <div className={`${styles.bar_inner} ${isOpen === true ? "inner_opened" : "inner_closed"}`}>

            {tab==="Timeline" && <TimelineBar />}
            {tab==="Object" && <ObjectBar addObject={addObject}/>}
            {tab==="Tween" && <TweenBar />}

            </div>
            <div className={styles.expandbar} onClick={toggleSidebar}>
            </div>
        </div>
      </div>
  );
}

export default SideBar;