import React, { useContext, useState } from "react"
import axios from 'axios'
const GlobalContext = React.createContext()

const BASE_URL = "http://localhost:5000/api/v1/";

export const GlobalProvider = ({children}) => {

    //this is for geting data from API
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //incomes funtions
    const addIncome = async (income) =>{
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
            getIncomes()
    } 
    const getIncomes = async () =>{
        const response = await axios.get(`${BASE_URL}get-income`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) =>{
        const res = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () =>{
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome += income.amount
        })
        return totalIncome;
    }
    const addExpense = async (income) =>{
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
            getExpenses()
    } 
    const getExpenses = async () =>{
        const response = await axios.get(`${BASE_URL}get-expense`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) =>{
        const res = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () =>{
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome += income.amount
        })
        return totalIncome;
    }

    return(
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            expenses,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses


        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)

}