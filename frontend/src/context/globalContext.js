import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// 🌐 Backend base URL (NO /api here)
const BASE_URL = "https://personal-expense-tracker-backend-xp5p.onrender.com";

// Create Context
const GlobalContext = createContext();

// ===============================
// 🌍 Global Provider
// ===============================
export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ===============================
  // 🔑 Auth Header
  // ===============================
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // ===============================
  // 💰 INCOME
  // ===============================
  const addIncome = async (income) => {
    try {
      setLoading(true);
      setError(null);

      await axios.post(
        `${BASE_URL}/api/income/add-income`,
        income,
        getAuthConfig()
      );

      await getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "Income add failed");
    } finally {
      setLoading(false);
    }
  };

  const getIncomes = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        `${BASE_URL}/api/income/get-incomes`,
        getAuthConfig()
      );

      setIncomes(data);
    } catch (err) {
      setError(err.response?.data?.message || "Fetch income failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/income/delete-income/${id}`,
        getAuthConfig()
      );
      await getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "Delete income failed");
    }
  };

  const totalIncome = () =>
    incomes.reduce((sum, item) => sum + Number(item.amount), 0);

  // ===============================
  // 💸 EXPENSE
  // ===============================
  const addExpense = async (expense) => {
    try {
      setLoading(true);
      setError(null);

      await axios.post(
        `${BASE_URL}/api/expense/add-expense`,
        expense,
        getAuthConfig()
      );

      await getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Expense add failed");
    } finally {
      setLoading(false);
    }
  };

  const getExpenses = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        `${BASE_URL}/api/expense/get-expenses`,
        getAuthConfig()
      );

      setExpenses(data);
    } catch (err) {
      setError(err.response?.data?.message || "Fetch expense failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/expense/delete-expense/${id}`,
        getAuthConfig()
      );
      await getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Delete expense failed");
    }
  };

  const totalExpenses = () =>
    expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  // ===============================
  // 📊 Balance & History
  // ===============================
  const totalBalance = () => totalIncome() - totalExpenses();

  const transactionHistory = () =>
    [...incomes, ...expenses]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);

  // ===============================
  // 🏦 Provider
  // ===============================
  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        error,
        loading,

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
// 📌 Hook
// ===============================
export const useGlobalContext = () => useContext(GlobalContext);
