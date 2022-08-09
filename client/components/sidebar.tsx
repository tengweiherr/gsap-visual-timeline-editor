import { Dispatch, SetStateAction, useState } from "react";
import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
    Row,
    Col
} from "react-bootstrap";
import { Object } from "../types";
// import "../styles/sidebar.scss";
import styles from "../styles/sidebar.module.scss";

type Props = {
    selectedObject: Object|null;
    setSelectedObject: Dispatch<SetStateAction<Object|null>>;
}

const SideBar = ({selectedObject,setSelectedObject}:Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const toggleSidebar = () => {
        isOpen === true ? setIsOpen(false) : setIsOpen(true);
        console.log(isOpen);
    }

  return (
      <div className={styles.sidebar}>
        <div className={styles.firstbar}>
            <p>Timeline</p>
            <p>Tween</p>
        </div>
        <div className={`${styles.secondbar} ${isOpen === true ? "opened" : "closed"}`}>
            <div className={`${styles.bar_inner} ${isOpen === true ? "inner_opened" : "inner_closed"}`}>
                <p>Object Class Name</p>
                <p>{selectedObject?.positionX.toString()}</p>
            </div>
            <div className={styles.expandbar} onClick={toggleSidebar}>
            </div>
        </div>
      </div>
  );
}

export default SideBar;