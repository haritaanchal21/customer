import React, { Component} from "react";
import Header from "./Header";
import Footer from "./Footer";

class App extends Component{
  constructor(props){
    super(props);
    this.state = { apiResponse: ""};
   }

  callAPI(){
    fetch("http://localhost:3001/Test")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }
  componentDidMount(){
      this.callAPI();
  }

  
  render(){
    const customers = this.state.apiResponse;
    const [cust] = customers;
    console.log(cust);
    // console.log(name);
    // console.log(age);
    
  return (
    <div>
      <Header />
      <p>{customers}</p>
      <Footer />
    </div>
  );
}
}
export default App;