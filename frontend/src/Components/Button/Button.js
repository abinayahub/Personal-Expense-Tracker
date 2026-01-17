import React from 'react';
import styled from 'styled-components';

function Button({ name, icon, onClick, bg, bPad, color, bRad }) {
  return (
    <ButtonStyled
      style={{
        background: bg,
        padding: bPad,
        borderRadius: bRad,
        color: color,
      }}
      onClick={onClick}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{name}</span>
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  outline: none;
  border: none;
  font-family: inherit;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  /* Icon styling */
  .btn-icon {
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Hover animation */
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    filter: brightness(1.05);
  }

  /* Active/Click effect */
  &:active {
    transform: translateY(0px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Focus state for accessibility */
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
    }
  }

  /* Ripple effect for click feedback */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
`;

export default Button;
