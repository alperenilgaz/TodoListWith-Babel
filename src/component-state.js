var root = ReactDOM.createRoot(document.getElementById("root"))

class User extends React.Component{
    constructor(props){
        super(props)
        this.changeEmail = this.changeEmail.bind(this)
        this.state={
            name:"alperenilgaz",
            email:"alperenilgaz3@gmail.com"
        }
    }
    changeEmail(){
    this.setState({
        name:"ilgaz",
        email:"alp@gmail.com"
    })
    }
    render(){
        return(
            <>
                <h2>{this.state.name}</h2>
                <p>{this.state.email}</p>
                <button onClick={this.changeEmail}>Change Email</button>
            </>
        )
    }
}

root.render(<User/>)