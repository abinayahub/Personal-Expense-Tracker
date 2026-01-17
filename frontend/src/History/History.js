import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext";

function History() {
  const { transactionHistory } = useGlobalContext();
  const [...history] = transactionHistory();

  // Function to format amounts in Indian Rupee style
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount <= 0 ? 0 : amount);
  };

  return (
    <HistoryStyled>
      {history.length > 0 ? (
        history.map(({ _id, title, amount, type }) => (
          <div
            key={_id}
            className={`history-item ${type}`}
          >
            <div className="history-content">
              <p className="title">{title}</p>
            </div>
            <p className={`amount ${type}`}>
              {type === "expense" ? "-" : "+"}
              {formatCurrency(amount)}
            </p>
          </div>
        ))
      ) : (
        <p className="no-history">No recent transactions</p>
      )}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .no-history {
    text-align: center;
    color: var(--color-grey);
    font-style: italic;
    padding: 1.5rem;
    background: rgba(0, 0, 0, 0.02);
    border-radius: var(--radius-md);
  }

  .history-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.85rem;
    border-radius: var(--radius-md);
    background: var(--color-grey-light);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-left: 3px solid;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateX(4px);
      box-shadow: var(--shadow-sm);
      border-left-width: 4px;
    }

    .history-content {
      flex: 1;
      min-width: 0;

      .title {
        font-weight: 500;
        font-size: 0.9rem;
        color: var(--primary-color);
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .amount {
      font-weight: 700;
      font-size: 0.95rem;
      margin: 0;
      white-space: nowrap;
      margin-left: 1rem;
      flex-shrink: 0;
    }

    &.income {
      border-left-color: var(--success-color);
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.02));

      .amount {
        color: var(--success-color);
      }
    }

    &.expense {
      border-left-color: var(--error-color);
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(239, 68, 68, 0.02));

      .amount {
        color: var(--error-color);
      }
    }
  }
`;

export default History;
