import React, { useState, useEffect } from 'react';
import './App.css';
import moment from 'moment';
import { useHistory } from 'react-router-dom';



function DashBoard() {

    const [balance, setBalanace] = useState("");
    const [transactions, setTransactions] = useState([]);
    const history = useHistory();

    const transferRedirect = (event) => {
        event.preventDefault()
        history.push("/transfer")
    }

    useEffect(() => {
        // storing input name
        const token = localStorage.getItem('token');
        console.log(token)
        const requestOptions1 = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token },

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
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token },

        };
        fetch('http://localhost:8080/account/transactions', requestOptions2)
            .then(response => {
                console.log(requestOptions2)
                return response.json()
            })
            .then(data1 => {

                let transactions = data1.data

                setTransactions(transactions)

                console.log(transactions[1])



            })
            .catch(error => {
                console.log(error)
            })



    }, []);

    return (
        <div className = "App">
            <div >
                <p>You have </p>
                <h2> SGD {balance}</h2> <p>in your account </p>
            </div>
            <div >
                <table>
                    <tbody>
                        {transactions.map((item, index) => {
                            return (
                                <tr className={item.type} key={item.id}>
                                    <td>{moment(item.date).format("DD MMM")}</td>
                                    <td>{item.type}</td>
                                    <td>{item.currency}</td>
                                    <td>{item.amount}</td>
                                    {item.type ==='transfer' ? <td>{item.to.accountNo}</td> : <td>{item.from.accountNo}</td>}
                                    <td>{item.description}</td></tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={transferRedirect}>
                    Make a Transfer
                </button>
            </div>
        </div>

    );
}

export default DashBoard
