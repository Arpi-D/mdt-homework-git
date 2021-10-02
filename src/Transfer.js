import React, { useEffect, useState } from "react";

function Transfer() {
    const [payee, setPayee] = useState([]);
    const [selectedValue, setSelectedValue] = useState(" ");
    const [date,setDate] = useState(" ")
    const [description, setDescription]= useState(" ")
    const [amount,setAmount] = useState(" ")



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
        <div>
           <form onSubmit={handleSubmit} >
            <label>Reciepent</label>
                <select onChange={e => handleChange(e)}>
                <option value="select" />
                    {payee.map((item, index) => {
                        return (
                            <option value={item.accountNo}>
                                {item.accountHolderName}
                            </option>
                        );
                    })}
                </select>
                
            <label>Date</label>
            <input type="text" value={date} onChange={event => setDate(event.target.value)} />
            <label>Description</label>
            <input type="text" value={description} onChange={event => setDescription(event.target.value)} />
            <label>Amount</label>
            <input type="text" value={amount} onChange={event => setAmount(event.target.value)} />

                <label>accountNo </label> {selectedValue}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );

}
export default Transfer;