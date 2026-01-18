import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function Form() {
  const { addIncome, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: null,
    category: '',
    description: '',
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !date || !category) {
    setError("Please fill all fields");
    return;
  }
    addIncome({
    title,
    amount: Number(amount),   // ✅ number
    date: date,               // ✅ Date object
    category,
    description,
  });
    setInputState({
      title: '',
      amount: '',
      date: null,
      category: '',
      description: '',
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="form-header">
        <h2 className="form-title">Add New Income</h2>
        <p className="form-subtitle">Record your income sources</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="title" className="label">Income Title</label>
        <input
          id="title"
          type="text"
          value={title}
          placeholder="e.g., Monthly Salary"
          onChange={handleInput('title')}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount" className="label">Amount</label>
        <div className="input-with-icon">
          <span className="currency">₹</span>
          <input
            id="amount"
            value={amount}
            type="number"
            placeholder="0.00"
            onChange={handleInput('amount')}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date" className="label">Date</label>
          <DatePicker
            selected={date||null}
            dateFormat="dd/MM/yyyy"
            onChange={(selectedDate) => {
              setInputState({ ...inputState, date: selectedDate });
            }}
            placeholderText="Select date"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category" className="label">Category</label>
          <select
            id="category"
            required
            value={category}
            onChange={handleInput('category')}
            className="form-input"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="salary">Salary</option>
            <option value="freelancing">Freelancing</option>
            <option value="investments">Investments</option>
            <option value="stocks">Stocks</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="bank">Bank Transfer</option>
            <option value="youtube">YouTube</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="label">Notes</label>
        <textarea
          id="description"
          value={description}
          placeholder="Add any additional notes or references..."
          rows="3"
          onChange={handleInput('description')}
          className="form-input form-textarea"
        ></textarea>
      </div>

      <div className="submit-btn">
        <Button
          name={'Add Income'}
          icon={plus}
          bPad={'0.9rem 2rem'}
          bRad={'var(--radius-lg)'}
          bg={'var(--gradient-primary)'}
          color={'#fff'}
        />
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;

  .form-header {
    margin-bottom: 0.5rem;

    .form-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--primary-color);
      margin: 0;
    }

    .form-subtitle {
      color: var(--color-grey);
      font-size: 0.9rem;
      margin: 0.5rem 0 0 0;
    }
  }

  .error-message {
    background: rgba(239, 68, 68, 0.08);
    color: var(--error-color);
    padding: 1rem;
    border-radius: var(--radius-md);
    text-align: center;
    font-weight: 500;
    border-left: 4px solid var(--error-color);
    animation: slideIn 0.3s ease;

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--primary-color);
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .input-with-icon {
    display: flex;
    align-items: center;
    position: relative;

    .currency {
      position: absolute;
      left: 1rem;
      color: var(--color-grey);
      font-weight: 600;
      pointer-events: none;
    }

    input {
      padding-left: 2.5rem !important;
    }
  }

  input,
  textarea,
  select,
  .react-datepicker-wrapper {
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;
    border: 2px solid transparent;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md);
    background: var(--color-grey-light);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    color: var(--primary-color);

    &::placeholder {
      color: var(--color-grey);
    }

    &:hover {
      background: #f0f0f0;
    }

    &:focus {
      background: #fff;
      border-color: var(--accent-blue);
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
  }

  .form-textarea {
    resize: vertical;
    min-height: 80px;
    max-height: 150px;

    &:focus {
      resize: vertical;
    }
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
  }

  .submit-btn {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    margin-top: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    max-width: 100%;

    .form-title {
      font-size: 1.2rem;
    }
  }
`;

export default Form;
