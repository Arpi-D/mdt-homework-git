import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import './App.css';


function Transfer() {
    const [payee, setPayee] = useState([]);
    const [selectedValue, setSelectedValue] = useState(" ");
    const [date,setDate] = useState("")
    const [description, setDescription]= useState("")
    const [amount,setAmount] = useState("")
    const history = useHistory();


    useEffect(() => {
        // storing input name
        const token = localStorage.getItem('token');
        // console.log(token)
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token },

        };
        fetch('http://localhost:8080/account/payees', requestOptions)
            .then(response => {
                console.log(requestOptions)
                return response.json()
            })
            .then(data => {
                console.log(data.data)
                setPayee(data.data)


            })
            .catch(error => {
                console.log(error)
            })
    },[]);
    const cancel = (event) => {
        event.preventDefault()
        history.push("/dashboard")
    }
    const handleChange = e => {
        console.log(e.target.value)
        setSelectedValue(e.target.value)
        setDate(" ")
        setAmount(" ")
        setDescription(" ")

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token },
            body: JSON.stringify({recipientAccountNo: selectedValue, amount: amount, date: date,description: description })
        };
        fetch('http://localhost:8080/transfer', requestOptions)
        .then(response => {
            console.log(requestOptions)
            return response.json()
        })
        .then(data => {
            console.log(data.status)
            console.log(data.data)
        })
        .catch(error => {
            console.log(error)
        })

        
    }
    return (
        <div className= "App">
           <form className="transferPage" onSubmit={handleSubmit} >
            <label>Reciepent</label>
                <select onChange={e => handleChange(e)}>
                <option value="select" />
                    {payee.map((item, index) => {
                        return (
                            <option key={item.id}  value={item.accountNo}>
                                {item.accountHolderName}
                            </option>
                        );
                    })}
                </select>   
           <div>
            <input  className= "inputText"  type="text" placeholder= "DATE" value={date} onChange={event => setDate(event.target.value)} />
           </div>
            <div>
            <input className= "inputText"  type="text" placeholder= "DESCRIPTION" value={description} onChange={event => setDescription(event.target.value)} />
            </div>
            <div>
            <input className= "inputText"  type="text" placeholder= "AMOUNT" value={amount} onChange={event => setAmount(event.target.value)} />
            </div>
                <div>
                <input className= "inputButtonTransfer" type="submit" value="Submit" />
                
            <button className= "inputButtonTransfer" onClick={cancel}>
                    Cancel
                </button>
               
                </div>
            </form>
           
        </div>
    );

}
export default Transfer;