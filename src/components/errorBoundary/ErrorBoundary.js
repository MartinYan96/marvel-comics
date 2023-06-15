import { Component } from "react";

class errorBoundary extends Component{
    state={
        error:false
    }
    componentDidCatch(error,errprInfo){
        console.log(errprInfo,error )
        this.setState({error:true})
    }
    
    render() {
        if(this.state.error){
            return <h2>chto to poshlo ne tak</h2>
        }
        return this.props.children
    }
}

export default errorBoundary

