import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

function Transactions() {
  const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext();
  const [filter, setFilter] = useState("all");
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const allTransactions = [
    ...incomes.map((t) => ({ ...t, type: "income" })),
    ...expenses.map((t) => ({ ...t, type: "expense" })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredTransactions = allTransactions.filter((t) => {
    const tDate = new Date(t.date);
    const tYear = tDate.getFullYear().toString();
    const tMonth = (tDate.getMonth() + 1).toString().padStart(2, "0");
    return (
      (filter === "all" || t.type === filter) &&
      (year === "all" || tYear === year) &&
      (month === "all" || tMonth === month)
    );
  });

  const groupByMonth = {};
  filteredTransactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    if (!groupByMonth[key]) {
      groupByMonth[key] = { income: 0, expense: 0 };
    }
    groupByMonth[key][t.type] += t.amount;
  });

  const grandTotal = filteredTransactions.reduce(
    (acc, curr) => {
      acc[curr.type] += curr.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  return (
    <TransactionsStyled>
      <div className="page-header">
        <h1>Transaction History</h1>
        <p className="subtitle">Track all your income and expenses</p>
      </div>

      {/* Totals */}
      <div className="totals">
        <div className="total-card income-card">
          <h4>Total Income</h4>
          <p>₹{grandTotal.income.toLocaleString()}</p>
        </div>
        <div className="total-card expense-card">
          <h4>Total Expense</h4>
          <p>₹{grandTotal.expense.toLocaleString()}</p>
        </div>
        <div className="total-card balance-card">
          <h4>Net Balance</h4>
          <p>₹{(grandTotal.income - grandTotal.expense).toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <select onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="all">All Transactions</option>
          <option value="income">Income Only</option>
          <option value="expense">Expense Only</option>
        </select>
        <select onChange={(e) => setYear(e.target.value)} className="filter-select">
          <option value="all">All Years</option>
          {[...new Set(allTransactions.map((t) => new Date(t.date).getFullYear()))].map(
            (y) => <option key={y} value={y}>{y}</option>
          )}
        </select>
        <select onChange={(e) => setMonth(e.target.value)} className="filter-select">
          <option value="all">All Months</option>
          {[...Array(12).keys()].map((i) => {
            const val = (i + 1).toString().padStart(2, "0");
            const monthName = new Date(2024, i).toLocaleString("default", { month: "long" });
            return <option key={val} value={val}>{monthName}</option>;
          })}
        </select>
      </div>

      {/* Monthly Summary */}
      {Object.entries(groupByMonth).length > 0 && (
        <div className="monthly-summary">
          <h3>Monthly Overview</h3>
          <div className="summary-grid">
            {Object.entries(groupByMonth).map(([key, val]) => (
              <div key={key} className="month-card">
                <h4>{key}</h4>
                <div className="amount-row">
                  <div className="amount-item income">
                    <span className="label">Income</span>
                    <p>₹{val.income.toLocaleString()}</p>
                  </div>
                  <div className="amount-item expense">
                    <span className="label">Expense</span>
                    <p>₹{val.expense.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transactions */}
      <div className="transactions-list">
        <h3>All Transactions</h3>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(({ _id, title, amount, date, type }) => (
            <div key={_id} className={`transaction ${type}`}>
              <div className="transaction-info">
                <p className="title">{title}</p>
                <small className="date">{new Date(date).toLocaleDateString()}</small>
              </div>
              <p className={`amount ${type}`}>
                {type === "expense" ? "-" : "+"} ₹{amount}
              </p>
            </div>
          ))
        ) : (
          <p className="no-data">No transactions found</p>
        )}
      </div>
    </TransactionsStyled>
  );
}

const TransactionsStyled = styled.div`
  padding: 2rem 1.5rem;
  background: var(--color-grey-lighter);
  min-height: 100vh;

  .page-header {
    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-color);
      margin: 0;
    }

    .subtitle {
      color: var(--color-grey);
      font-size: 0.95rem;
      margin: 0.5rem 0 0 0;
    }
  }

  .totals {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .total-card {
      background: #fff;
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      text-align: center;
      box-shadow: var(--shadow-md);
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-top: 4px solid;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }

      h4 {
        margin: 0 0 0.5rem 0;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--color-grey);
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }

      p {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--primary-color);
        margin: 0;
      }
    }

    .income-card {
      border-top-color: var(--success-color);

      p {
        color: var(--success-color);
      }
    }

    .expense-card {
      border-top-color: var(--error-color);

      p {
        color: var(--error-color);
      }
    }

    .balance-card {
      border-top-color: var(--accent-blue);

      p {
        color: var(--accent-blue);
      }
    }
  }

  .filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;

    .filter-select {
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      border: 2px solid rgba(0, 0, 0, 0.1);
      background: #fff;
      color: var(--primary-color);
      font-family: inherit;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      padding-right: 2rem;

      &:hover {
        border-color: var(--accent-blue);
      }

      &:focus {
        outline: none;
        border-color: var(--accent-blue);
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
      }
    }
  }

  .monthly-summary {
    margin-bottom: 2rem;

    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--primary-color);
      margin: 0 0 1.5rem 0;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1.5rem;

      .month-card {
        background: #fff;
        padding: 1.25rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        border: 1px solid rgba(0, 0, 0, 0.05);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        h4 {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-grey);
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .amount-row {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;

          .amount-item {
            padding: 0.75rem;
            border-radius: var(--radius-md);
            text-align: center;

            .label {
              display: block;
              font-size: 0.75rem;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.3px;
              margin-bottom: 0.25rem;
            }

            p {
              font-size: 1rem;
              font-weight: 700;
              margin: 0;
            }

            &.income {
              background: rgba(16, 185, 129, 0.1);
              color: var(--success-color);
            }

            &.expense {
              background: rgba(239, 68, 68, 0.1);
              color: var(--error-color);
            }
          }
        }
      }
    }
  }

  .transactions-list {
    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--primary-color);
      margin: 0 0 1.5rem 0;
    }

    .transaction {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      margin-bottom: 0.75rem;
      border-radius: var(--radius-md);
      background: #fff;
      box-shadow: var(--shadow-sm);
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-left: 3px solid;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        transform: translateX(4px);
        box-shadow: var(--shadow-md);
        border-left-width: 4px;
      }

      .transaction-info {
        flex: 1;
        min-width: 0;

        .title {
          font-weight: 600;
          color: var(--primary-color);
          margin: 0 0 0.25rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .date {
          color: var(--color-grey);
          font-size: 0.85rem;
        }
      }

      .amount {
        font-weight: 700;
        white-space: nowrap;
        margin-left: 1rem;
      }

      &.income {
        border-left-color: var(--success-color);
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0.02));

        .amount {
          color: var(--success-color);
        }
      }

      &.expense {
        border-left-color: var(--error-color);
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.02));

        .amount {
          color: var(--error-color);
        }
      }
    }

    .no-data {
      text-align: center;
      color: var(--color-grey);
      background: var(--color-grey-light);
      border-radius: var(--radius-md);
      padding: 2rem;
      box-shadow: var(--shadow-sm);
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    .page-header h1 {
      font-size: 1.5rem;
    }

    .totals {
      grid-template-columns: 1fr;
    }

    .filters {
      flex-direction: column;

      .filter-select {
        width: 100%;
      }
    }

    .monthly-summary .summary-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default Transactions;
