import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

    useEffect(() => {
        getIncomes();
    }, []);

    return (
        <IncomeStyled>
            <InnerLayout>
                <div className="page-header">
                    <h1>Income Tracker</h1>
                    <p>Manage and track all your income sources</p>
                </div>

                <div className="total-income-card">
                    <div className="card-content">
                        <span className="label">Total Income</span>
                        <p className="amount">₹{totalIncome()}</p>
                    </div>
                </div>

                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>

                    <div className="income-list">
                        <div className="list-header">
                            <h2>Your Incomes</h2>
                            <span className="count">{incomes.length} entries</span>
                        </div>
                        {incomes.length > 0 ? (
                            incomes.map((income) => {
                                const { _id, title, amount, date, category, description, type } = income;
                                return (
                                    <IncomeItem
                                        key={_id}
                                        id={_id}
                                        title={title}
                                        description={description}
                                        amount={amount}
                                        date={date}
                                        type={type}
                                        category={category}
                                        indicatorColor="var(--success-color)"
                                        deleteItem={deleteIncome}
                                    />
                                );
                            })
                        ) : (
                            <p className="no-incomes">No incomes recorded yet. Start by adding your first income! 📊</p>
                        )}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: auto;
    background: var(--color-grey-lighter);
    padding: 2rem 0;

    .page-header {
        margin-bottom: 2rem;
        padding: 0 2rem;

        h1 {
            font-size: 2.2rem;
            font-weight: 800;
            color: var(--primary-color);
            margin: 0;
            letter-spacing: -0.5px;
        }

        p {
            color: var(--color-grey);
            font-size: 0.95rem;
            margin: 0.75rem 0 0 0;
            font-weight: 400;
        }
    }

    .total-income-card {
        background: linear-gradient(135deg, var(--success-color), rgba(16, 185, 129, 0.6));
        border-radius: var(--radius-xl);
        padding: 2rem;
        margin-bottom: 2rem;
        margin-left: 2rem;
        margin-right: 2rem;
        box-shadow: var(--shadow-lg);
        border: none;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-xl);
        }

        .card-content {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;

            .label {
                color: rgba(255, 255, 255, 0.85);
                font-size: 0.85rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.8px;
            }

            .amount {
                font-size: 2.8rem;
                font-weight: 800;
                color: #fff;
                margin: 0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
        }
    }

    .income-content {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 2rem;
        padding: 0 2rem;

        .form-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .income-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;

            .list-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid rgba(0, 0, 0, 0.05);

                h2 {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: var(--primary-color);
                    margin: 0;
                }

                .count {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.6rem 1.2rem;
                    background: rgba(16, 185, 129, 0.12);
                    border-radius: var(--radius-lg);
                    color: var(--success-color);
                    font-size: 0.9rem;
                    font-weight: 700;
                    border: 1px solid rgba(16, 185, 129, 0.2);
                }
            }

            .no-incomes {
                padding: 3rem 2rem;
                text-align: center;
                color: var(--color-grey);
                background: #fff;
                border-radius: var(--radius-xl);
                border: 2px dashed rgba(0, 0, 0, 0.1);
                font-style: italic;
                font-size: 0.95rem;
                margin-top: 1rem;
            }
        }
    }

    @media (max-width: 1024px) {
        .income-content {
            grid-template-columns: 1fr;
        }

        .page-header,
        .total-income-card,
        .income-content {
            padding: 0 1.5rem;
            margin-left: 0;
            margin-right: 0;
        }

        .total-income-card {
            margin-left: 1.5rem;
            margin-right: 1.5rem;
        }
    }

    @media (max-width: 768px) {
        padding: 1.5rem 0;

        .page-header {
            padding: 0 1rem;
            margin-bottom: 1.5rem;

            h1 {
                font-size: 1.75rem;
            }
        }

        .total-income-card {
            padding: 1.5rem;
            margin: 0 1rem 1.5rem 1rem;

            .card-content .amount {
                font-size: 2.2rem;
            }
        }

        .income-content {
            padding: 0 1rem;
            gap: 1.5rem;
        }
    }
`;

export default Income;
