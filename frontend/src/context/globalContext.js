import React, { useContext, useState } from "react"
import axios from 'axios'
const GlobalContext = React.createContext()

const BASE_URL = "http://localhost:5000/api/v1/";

export const GlobalProvider = ({children}) => {

    //this is for geting data from API
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //this is used for sending data to DB
    const addIncome = async (income) =>{
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })

    } 
    return(
        <GlobalContext.Provider value={{
            addIncome
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)

}