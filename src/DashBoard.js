import React, { useState, useEffect } from 'react';

function DashBoard() {

    const [balance,setBalanace]= useState("");
    const [transactions,setTransactions]= useState([]);
    
    

    useEffect(() => {
        // storing input name
        const token = localStorage.getItem('token');
        console.log(token)
        const requestOptions1 = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' , 'Authorization': token},
          
        };
        fetch('http://localhost:8080/account/balances', requestOptions1)
            .then(response => {
                console.log(requestOptions1)
                return response.json()
            })
            .then(data => {
                console.log(data.balance)
                setBalanace(data.balance)  
                
            })
            .catch(error => {
                console.log(error)
            })

            const requestOptions2 = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' , 'Authorization': token},
              
            };
            fetch('http://localhost:8080/account/transactions', requestOptions2)
                .then(response => {
                    console.log(requestOptions2)
                    return response.json()
                })
                .then(data1=> {

                  // setTransactions(data1.data)
                    console.log(data1.data[1])
                   

                         
                })
                .catch(error => {
                    console.log(error)
                })

      });


    return (
     <div>   
      <div > 
          <p>You have </p>
          <h2> SGD {balance}</h2> <p>in your account </p>

      </div>
      <div>
       
    </div>
      </div>
      
    );
  }
  
  export default DashBoard
  