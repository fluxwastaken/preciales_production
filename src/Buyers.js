import React from 'react'

class Buyers extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            buyer:[]
        }
    }

    async componentDidMount(){
        let response = await fetch('http://localhost:8080/getBuyers')
        let buyers = await response.json()
        console.log(buyers)
        this.setState({buyer:buyers})
    }

    render(){
        return(
            <div>
                <p>Hello World</p>
            </div>
        )
    }
}
export default Buyers;