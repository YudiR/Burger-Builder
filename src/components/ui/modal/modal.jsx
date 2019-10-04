import React, {Component} from "react";
import css from "./modal.css";
import Aux from "../../../hoc/Aux/Aux";
import BackDrop from '../backdrop/backdrop'
class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState){
    
    return nextProps.show !== this.props.show
  }
  
  
  componentDidUpdate(prevProps, prevState, snapshot) {
  console.log('[modal] did update')
  }

render() {
  return (
    <Aux>
        <BackDrop clicked={this.props.modalClosed} show ={this.props.show}/>
      <div
        className="Modal"
        style={{
          transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: this.props.show ? "1" : "0"
        }}
      >
        {this.props.children}
      </div>
    </Aux>
  );

}
};

export default Modal;

