import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';

import Chart from '../Chart/Chart';

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const incomePercentage = totalIncome() > 0 ? ((totalIncome() / (totalIncome() + totalExpenses())) * 100).toFixed(0) : 0;
  const expensePercentage = totalExpenses() > 0 ? ((totalExpenses() / (totalIncome() + totalExpenses())) * 100).toFixed(0) : 0;

  return (
    <DashboardStyled>
      <InnerLayout>
        <div className="header">
          <h1>Dashboard</h1>
          <p className="subtitle">Overview of your financial activity</p>
        </div>

        <div className="stats-con">
          {/* Chart & Balance */}
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="card income">
                <div className="card-header">
                  <h3>Total Income</h3>
                  <span className="badge">{incomePercentage}%</span>
                </div>
                <div className="card-body">
                  <p className="amount">₹ {totalIncome()}</p>
                  <span className="trend">
                    ↑ Last Month
                  </span>
                </div>
              </div>

              <div className="card expense">
                <div className="card-header">
                  <h3>Total Expenses</h3>
                  <span className="badge">{expensePercentage}%</span>
                </div>
                <div className="card-body">
                  <p className="amount">₹ {totalExpenses()}</p>
                  <span className="trend warning">
                    ↑ Last Month
                  </span>
                </div>
              </div>

              <div className="card balance">
                <div className="card-header">
                  <h3>Total Balance</h3>
                  <span className="badge primary">Savings</span>
                </div>
                <div className="card-body">
                  <p className="amount">₹ {totalBalance()}</p>
                  <span className="trend success">
                    ↑ Keep it up!
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="history-con">
            <div className="history-header">
              <h2>Recent Transactions</h2>
              <a href="#" className="view-all">View All</a>
            </div>
            <History />

            <div className="salary-section">
              <h3 className="salary-title">Income Range</h3>
              <div className="salary-item income-item">
                <div className="salary-label">
                  <span className="label-text">Min</span>
                  <p>₹{Math.min(...incomes.map(item => item.amount)) || 0}</p>
                </div>
                <div className="divider"></div>
                <div className="salary-label">
                  <span className="label-text">Max</span>
                  <p>₹{Math.max(...incomes.map(item => item.amount)) || 0}</p>
                </div>
              </div>
            </div>

            <div className="salary-section">
              <h3 className="salary-title">Expense Range</h3>
              <div className="salary-item expense-item">
                <div className="salary-label">
                  <span className="label-text">Min</span>
                  <p>₹{Math.min(...expenses.map(item => item.amount)) || 0}</p>
                </div>
                <div className="divider"></div>
                <div className="salary-label">
                  <span className="label-text">Max</span>
                  <p>₹{Math.max(...expenses.map(item => item.amount)) || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  background: var(--color-grey-lighter);
  min-height: 100vh;

  .header {
    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: var(--primary-color);
    }

    .subtitle {
      color: var(--color-grey);
      font-size: 0.95rem;
    }
  }

  .stats-con {
    display: grid;
    grid-template-columns: 2.5fr 1fr;
    gap: 1.5rem;

    /* Chart Section */
    .chart-con {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .amount-con {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;

        .card {
          background: #fff;
          border-radius: var(--radius-xl);
          padding: 1.5rem;
          box-shadow: var(--shadow-md);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--gradient-primary);
          }

          &.income::before {
            background: var(--gradient-success);
          }

          &.expense::before {
            background: var(--gradient-warning);
          }

          &.balance::before {
            background: var(--gradient-info);
          }

          &:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
          }

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;

            h3 {
              font-size: 0.9rem;
              font-weight: 500;
              color: var(--color-grey);
              margin: 0;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }

            .badge {
              display: inline-flex;
              align-items: center;
              padding: 0.25rem 0.75rem;
              border-radius: var(--radius-md);
              font-size: 0.75rem;
              font-weight: 600;
              color: #fff;
              background: var(--accent-green);

              &.primary {
                background: var(--accent-blue);
              }
            }
          }

          .card-body {
            .amount {
              font-size: 1.75rem;
              font-weight: 700;
              color: var(--primary-color);
              margin: 0.5rem 0 1rem 0;
            }

            .trend {
              display: inline-block;
              font-size: 0.85rem;
              color: var(--success-color);
              font-weight: 500;

              &.warning {
                color: var(--warning-color);
              }
            }
          }
        }
      }
    }

    /* History Section */
    .history-con {
      background: #fff;
      border-radius: var(--radius-xl);
      padding: 1.5rem;
      box-shadow: var(--shadow-md);
      border: 1px solid rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      height: fit-content;
      max-height: 600px;
      overflow-y: auto;

      .history-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);

        h2 {
          font-size: 1.1rem;
          margin: 0;
          color: var(--primary-color);
        }

        .view-all {
          color: var(--accent-blue);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.3s ease;

          &:hover {
            transform: translateX(2px);
          }
        }
      }

      .salary-section {
        padding-top: 1rem;
        border-top: 1px solid rgba(0, 0, 0, 0.05);

        &:first-of-type {
          border-top: none;
          padding-top: 0;
        }

        .salary-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-grey);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .salary-item {
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          transition: all 0.25s ease;
          background: var(--color-grey-light);

          &.income-item {
            background: rgba(16, 185, 129, 0.08);
          }

          &.expense-item {
            background: rgba(249, 115, 22, 0.08);
          }

          .divider {
            width: 1px;
            height: 40px;
            background: rgba(0, 0, 0, 0.1);
          }

          .salary-label {
            flex: 1;
            text-align: center;

            .label-text {
              display: block;
              font-size: 0.75rem;
              color: var(--color-grey);
              font-weight: 500;
              margin-bottom: 0.25rem;
              text-transform: uppercase;
              letter-spacing: 0.3px;
            }

            p {
              font-size: 1.2rem;
              color: var(--primary-color);
              margin: 0;
            }
          }
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .stats-con {
      grid-template-columns: 1fr;

      .chart-con {
        .amount-con {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .history-con {
        max-height: none;
      }
    }
  }

  @media (max-width: 768px) {
    .header {
      h1 {
        font-size: 1.5rem;
      }
    }

    .stats-con {
      .chart-con {
        .amount-con {
          grid-template-columns: 1fr;
        }
      }
    }
  }
`;

export default Dashboard;
