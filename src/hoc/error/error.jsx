import React, {Component} from 'react'
import Modal from '../../components/ui/modal/modal'
import Aux from '../Aux/Aux'

const error = (WrappedComponet, axios) => {
    return class extends Component  {

        state = {
            error : null
        }



        componentWillMount () {

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req

            })

            this.resInterceprot = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }
componentWillUnmount () {
axios.interceptors.request.eject(this.reqInterceptor)
axios.interceptors.response.eject(this.resInterceptor)

}
        errorConfirmed = () => {
            this.setState({error: null})

        }
        render () {
        return (
            
            <Aux>
                <Modal show={this.state.error } modalClosed = {this.errorConfirmed} >
            {this.state.error ? this.state.error.message : null }
                </Modal>
            <WrappedComponet {...this.props}/>
            </Aux>
        )}
    }
}

export default error