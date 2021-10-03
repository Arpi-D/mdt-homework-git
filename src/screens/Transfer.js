import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';


function Transfer() {
    const [payee, setPayee] = useState([]);
    const [selectedValue, setSelectedValue] = useState(" ");
    const [date, setDate] = useState(new Date())
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const history = useHistory();


    useEffect(() => {
        // storing input name
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token },

        };
        fetch('http://localhost:8080/account/payees', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPayee(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);
    const cancel = (event) => {
        event.preventDefault()
        history.push("/dashboard")
    }
    const handleChange = e => {
        setSelectedValue(e.target.value)
    }
    // TDB validate Token expiry time
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token },
            body: JSON.stringify({ recipientAccountNo: selectedValue, amount: amount, date: date, description: description })
        };
        fetch('http://localhost:8080/transfer', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status === "success") {
                    alert("success")
                    history.push("/dashboard")
                }
                else {
                    alert(data.data)
                }
            })
            .catch(error => {
                console.log(error)
            })




    }
    return (
        <div className="App">
            <div className="transferPagetop" > Make a Transfer </div>
            <form className="transferPage" onSubmit={handleSubmit} >
                <select className="transferDropdown" onChange={e => handleChange(e)} required >
                    <option className="repText" value="" > RECIPIENT </option>
                    {payee.map((item, index) => {
                        return (
                            <option key={item.id} value={item.accountNo}>
                                {item.accountHolderName}
                            </option>
                        );
                    })}
                </select>
                <div>
                    <DatePicker className="inputText" selected={date} onChange={(date) => setDate(date)} />
                </div>
                <div>
                    <input className="inputText" type="text" required placeholder="DESCRIPTION" value={description} onChange={event => setDescription(event.target.value)} />
                </div>
                <div>
                    <input className="inputText" required type="number" placeholder="AMOUNT" value={amount} onChange={event => setAmount(event.target.value)} />
                </div>
                <div className="transferPageButtom">
                    <input className="inputButtonTransfer" type="submit" value="Submit" />

                    <button className="inputButtonTransfer" onClick={cancel}>
                        Cancel
                    </button>

                </div>
            </form>

        </div>
    );

}
export default Transfer;