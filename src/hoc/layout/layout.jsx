import React ,{Component} from 'react'
import Aux from '../Aux/Aux'
import css from './Layout.css'
import Toolbar from '../../components/navigation/toolbar/toolbar'
import Sidedrawer from '../../components/navigation/sidedrawer/sidedrawer'
import sideDrawer from '../../components/navigation/sidedrawer/sidedrawer';
class  Layout extends Component { 
    state ={
        showSideDrawer: false
    }

    sideDrawerClosed = () =>{
        this.setState({showSideDrawer : false})
    }

    sideDrawerOpen = () =>{
        this.setState((prevState) => {return {showSideDrawer : !prevState.show} } )
    }


    render (){
        
      
        return(
            <Aux>
            <div>
                <Toolbar ToggleClicked={this.sideDrawerOpen}/>
                <Sidedrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosed}/>
                sideDrawer . backdrop
                </div>
                <main className="contentLayout">
                    {this.props.children}
                </main>
                </Aux>
        )
    }
   
}

export default Layout