var root = ReactDOM.createRoot(document.getElementById("root"))
class TodoApp extends React.Component {
    constructor(props){
        super(props)
        this.clearItems=this.clearItems.bind(this)
        this.addItem=this.addItem.bind(this)
        this.deleteItems = this.deleteItems.bind(this)
        this.state={
            gorevler:["ödev yap","react bak","speak engilish"]
        }
    

    }
    deleteItems(item){
      
       this.setState((prevState)=> {
       const arr = prevState.gorevler.filter((i) => {
            return item!=i
        })
        return {
            gorevler:arr
        }
       })
    }
    clearItems(){
        this.setState({
            gorevler:[]
        })
    }
    addItem(item){
        if(!item){
            return 'eklemek istediğiniz elemani giriniz '
        }else if(this.state.gorevler.indexOf(item) >-1){
            return 'aynı elemanı giremezsiniz '
        }
        this.setState((prevState)=>{
           return {gorevler:prevState.gorevler.concat(item)}

        })
    }
   
    render(){
        const data ={
            baslik:"Todo Application",
            aciklama:"Bekeleyen görevler"
        }
        return (
            <div className="container">
                <div className="card">
            <div className="card-header">
            <Header title={data.baslik} description={data.aciklama}/>
            </div>
            <div className="card-body">
            <TodoList deleteItem={this.deleteItems} items={this.state.gorevler} clear={this.clearItems}/>
            </div>
            <div className="card-footer">
            <NewItem addItem={this.addItem}/>
            </div>
                </div>
        </div> 
        )
    }
    componentDidMount(){
        const json_obj = localStorage.getItem("items")
        const items = JSON.parse(json_obj )
        this.setState({
            gorevler:items
        })
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.gorevler.length!==this.state.gorevler.length){
          const json_str = JSON.stringify(this.state.gorevler)
          localStorage.setItem("items",json_str)

        }
    }
}
function TodoList(props){

    return(
        <div>
            <ul className="list-group">
                {
                    props.items.map((gorev,index) => 
                    <TodoItem deleteItem={props.deleteItem} key={index} item={gorev}/>)
                }
            </ul>
            <button className="btn btn-outline-danger" onClick={props.clear}>Temizle</button>
        </div>
    )
}

function Header(props){

    return(
        <div>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </div>
    )
}


class NewItem extends React.Component{
    constructor(props){
        super(props)
        this.onFormSubmit=this.onFormSubmit.bind(this)
        this.state={
            error:''
        }
    }
    onFormSubmit(e){
        e.preventDefault()
        const item = e.target.elements.txtItem.value.trim()
       
        if(item) {
            e.target.elements.txtItem.value=""
            const error = this.props.addItem(item)
            this.setState({
                error:error
            })
        }
    }
    render(){

        return(
            <>
            {this.state.error && <p>{ this.state.error }</p>}
            <form onSubmit={this.onFormSubmit}>
                <div className="input-group">
                <input className="form-control" type="text" name="txtItem"/>
                <button className="btn btn-primary" type="submit">Ekle</button>
                </div>
            </form>
            </>
        )
    }
    componentDidUpdate(){
        console.log("new item guncellendi")
    }
}

function TodoItem(props){
    return(
        <>
        <li className="list-group-item">
            {props.item}
            <button className="btn btn-danger btn-sm float-end" onClick={() => {props.deleteItem( props.item)}}>x</button>    
        </li>
        
    </>
    )
}



root.render(<TodoApp/>)