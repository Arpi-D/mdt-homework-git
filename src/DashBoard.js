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

    const logOut = (event) => {
        event.preventDefault()
        localStorage.removeItem("token")
        history.push("/signin")

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
        <div className="App">
            <div className="buttonLogoutStyle">
                <button className="buttonLogout" onClick={logOut}>
                    Logout
                </button>
            </div>

            <div className="displayBalance">
                <p>You have </p>
                <p className="accountBal"> SGD {balance}</p> <p>in your account </p>
            </div>
            <hr className="line" />
            <div className="transactionTable">
                <div><h2>Your Activity</h2></div>
                <table>
                    <tbody>
                        {transactions.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td className="transactionDate" >{moment(item.date).format("DD MMM")}</td>

                                    {item.type === 'transfer' ? <td className="tdDetails"> {item.type} to {item.to.accountHolderName}  </td>
                                        : <td className="tdDetails"> {item.type} from {item.from.accountHolderName}</td>}

                                    {item.type === 'transfer' ? <td className={item.type}>-{item.amount}</td>
                                        : <td className={item.type}>{item.amount}</td>}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <button className="buttonTransfer" onClick={transferRedirect}>
                    Make a Transfer
                </button>
            </div>
        </div>

    );
}

export default DashBoard
