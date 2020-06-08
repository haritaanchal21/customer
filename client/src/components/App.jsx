import React, {useState, Component} from "react";
// import ReactTable from 'react-table';
// import 'react-table/react-table.css';
import Header from "./Header";
import Footer from "./Footer";
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ExpansionPanelDetails } from "@material-ui/core";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



class App extends Component{
  
  
  
  constructor(props){
    super(props);
    this.state = { customerList: [], showSecret: false };
   }

  
  componentDidMount(){
      this.callAPI()
      .then(res => this.setState({ customerList: res.express}))
      .catch(err => err);
      console.log(this.state.data);
  }

  callAPI = async () => {
    const response = await fetch("http://localhost:3001/Test");
    const body = await response.json();
    
    if(response.status !== 200) throw Error(body.message);
    return body;
  }

  
  showSecret = () => {
    let { showSecret } = this.state;
    this.setState({
      showSecret: !showSecret
    });
  };

  


  SimpleTable() {
  
    return (
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">NAME</StyledTableCell>
              <StyledTableCell align="right">AGE</StyledTableCell>
              <StyledTableCell align="right">GENDER</StyledTableCell>
              <StyledTableCell align="right" style={{ display: this.state.showSecret ? "" : "none" }}>ADDRESS</StyledTableCell>
            </StyledTableRow>
          </TableHead>
        

          
          <TableBody>
            {this.state.customerList.map(customer => (
              <StyledTableRow key={customer._id} onClick={this.showSecret}>
              
                <StyledTableCell  component="th" scope="row">
                  {customer.customerId}
                </StyledTableCell>
                <StyledTableCell align="right">{customer.name}</StyledTableCell>
                <StyledTableCell align="right">{customer.age}</StyledTableCell>
                <StyledTableCell align="right">{customer.gender}</StyledTableCell>
                
                <StyledTableCell align="right" style={{ display: this.state.showSecret ? "" : "none" }}>{customer.address}</StyledTableCell>
            
              </StyledTableRow>
              
            
            ))}
            
            
      
          </TableBody>
        </Table>
      </TableContainer>
    );
  }


  
  render(){
    
  return (
    <div>
      <Header />
      <div>{this.SimpleTable()}</div>
      <Footer />
    </div>
  );
}
}
export default App;