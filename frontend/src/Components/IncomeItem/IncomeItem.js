import React from 'react';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import {
  bitcoin, book, calender, card, circle, clothing, comment, dollar,
  food, freelance, medical, money, piggy, stocks, takeaway, trash, tv,
  users, yt
} from '../../utils/Icons';
import Button from '../Button/Button';

function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type
}) {
  const categoryIcon = () => {
    switch (category) {
      case 'salary': return money;
      case 'freelancing': return freelance;
      case 'investments': return stocks;
      case 'stocks': return users;
      case 'bitcoin': return bitcoin;
      case 'bank': return card;
      case 'youtube': return yt;
      case 'other': return piggy;
      default: return circle;
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case 'education': return book;
      case 'groceries': return food;
      case 'health': return medical;
      case 'subscriptions': return tv;
      case 'takeaways': return takeaway;
      case 'clothing': return clothing;
      case 'travelling': return freelance;
      case 'other': return circle;
      default: return circle;
    }
  };

  return (
    <IncomeItemStyled type={type}>
      <div className="icon">
        {type === 'expense' ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <div className="amount-badge">
              <span className="currency">₹</span>
              <span className="value">{amount}</span>
            </div>
            <span className="date-info">{calender} {dateFormat(date)}</span>
            {description && <span className="description">{comment} {description}</span>}
          </div>
          <div className="btn-con">
            <Button
              icon={trash}
              bPad={'0.75rem'}
              bRad={'var(--radius-md)'}
              bg={type === 'expense' ? 'var(--gradient-danger)' : 'var(--gradient-success)'}
              color={'#fff'}
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: var(--radius-lg);
  padding: 1rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: var(--primary-color);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: ${({ type }) =>
      type === 'expense'
        ? 'var(--gradient-danger)'
        : 'var(--gradient-success)'};
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateX(4px);
    box-shadow: var(--shadow-md);
    border-color: rgba(0, 0, 0, 0.1);

    &::before {
      transform: scaleY(1);
      transform-origin: top;
    }
  }

  .icon {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-md);
    background: ${({ type }) =>
      type === 'expense'
        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(244, 63, 94, 0.1))'
        : 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(52, 211, 153, 0.1))'};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    i {
      font-size: 1.5rem;
      color: ${({ type }) =>
        type === 'expense'
          ? 'var(--error-color)'
          : 'var(--success-color)'};
    }

    svg {
      font-size: 1.5rem;
      color: ${({ type }) =>
        type === 'expense'
          ? 'var(--error-color)'
          : 'var(--success-color)'};
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;

    h5 {
      font-size: 0.95rem;
      font-weight: 600;
      margin: 0;
      color: var(--primary-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;

      .text {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        flex: 1;
        min-width: 0;

        .amount-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.4rem 0.8rem;
          background: ${({ type }) =>
            type === 'expense'
              ? 'rgba(239, 68, 68, 0.1)'
              : 'rgba(16, 185, 129, 0.1)'};
          border-radius: var(--radius-md);
          font-weight: 600;
          color: ${({ type }) =>
            type === 'expense'
              ? 'var(--error-color)'
              : 'var(--success-color)'};
          font-size: 0.9rem;

          .currency {
            font-size: 0.8rem;
            opacity: 0.8;
          }

          .value {
            font-weight: 700;
          }
        }

        .date-info {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--color-grey);
          white-space: nowrap;
        }

        .description {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--color-grey);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 200px;
        }
      }

      .btn-con {
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }
    }
  }

  @media (max-width: 640px) {
    padding: 0.75rem;

    .icon {
      width: 48px;
      height: 48px;

      i, svg {
        font-size: 1.2rem;
      }
    }

    .content {
      h5 {
        font-size: 0.9rem;
      }

      .inner-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;

        .text {
          gap: 0.75rem;
        }

        .btn-con {
          align-self: flex-end;
          margin-top: 0.5rem;
        }
      }
    }
  }
`;

export default IncomeItem;
