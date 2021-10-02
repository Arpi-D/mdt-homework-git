import React, {useEffect, useState } from "react";

 function Transfer(){
     const [payee,setPayee] = useState([]);

    useEffect(() => {
        // storing input name
        const token = localStorage.getItem('token');
        console.log(token)
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
        });
    return(
        <div>
            <form>
                
                <select>
                {payee.map((item, index) => {
                    return (
                        <option value={item.accountNo}>
                            {item.accountHolderName}
                        </option>
                        
                    );  
                })}   
               </select>  
               </form>              
            </div>
    );

}
export default Transfer;