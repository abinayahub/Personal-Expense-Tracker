import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// ===============================
// 🌐 Base API URL
// ===============================
const BASE_URL = "http://localhost:5000/api/v1/";

// Create Context
const GlobalContext = createContext();

// ===============================
// 🌍 Global Provider
// ===============================
export const GlobalProvider = ({ children }) => {
  // States
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ===============================
  // 🔑 Get Authorization Header
  // ===============================
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  // ===============================
  // 📌 Helper: API Call Handler
  // ===============================
  const handleApiCall = async (callback, successMsg) => {
    try {
      setLoading(true);
      setError(null);
      await callback();
      if (successMsg) setMessage(successMsg);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // 💰 Income Functions
  // ===============================
  const addIncome = async (income) => {
    await handleApiCall(
      async () => {
        await axios.post(`${BASE_URL}add-income`, income, getAuthConfig());
        await getIncomes();
      },
      "Income added successfully ✅"
    );
  };

  const getIncomes = async () => {
    await handleApiCall(async () => {
      const { data } = await axios.get(`${BASE_URL}get-incomes`, getAuthConfig());
      setIncomes(data);
    });
  };

  const deleteIncome = async (id) => {
    await handleApiCall(
      async () => {
        await axios.delete(`${BASE_URL}delete-income/${id}`, getAuthConfig());
        await getIncomes();
      },
      "Income deleted 🗑️"
    );
  };

  const totalIncome = () => incomes.reduce((sum, inc) => sum + inc.amount, 0);

  // ===============================
  // 💸 Expense Functions
  // ===============================
  const addExpense = async (expense) => {
    await handleApiCall(
      async () => {
        await axios.post(`${BASE_URL}add-expense`, expense, getAuthConfig());
        await getExpenses();
      },
      "Expense added successfully ✅"
    );
  };

  const getExpenses = async () => {
    await handleApiCall(async () => {
      const { data } = await axios.get(`${BASE_URL}get-expenses`, getAuthConfig());
      setExpenses(data);
    });
  };

  const deleteExpense = async (id) => {
    await handleApiCall(
      async () => {
        await axios.delete(`${BASE_URL}delete-expense/${id}`, getAuthConfig());
        await getExpenses();
      },
      "Expense deleted 🗑️"
    );
  };

  const totalExpenses = () => expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // ===============================
  // 📊 Balance & History
  // ===============================
  const totalBalance = () => totalIncome() - totalExpenses();

  const transactionHistory = () => {
    return [...incomes, ...expenses]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  };

  // ===============================
  // 🏦 Context Value
  // ===============================
  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        error,
        message,
        loading,
        setError,
        setMessage,

        addIncome,
        getIncomes,
        deleteIncome,
        totalIncome,

        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,

        totalBalance,
        transactionHistory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// ===============================
// 📌 Hook for easy use
// ===============================
export const useGlobalContext = () => useContext(GlobalContext);
