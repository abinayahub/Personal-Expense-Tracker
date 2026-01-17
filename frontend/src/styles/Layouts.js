import styled from "styled-components";

export const MainLayout = styled.div`
    padding: 1.5rem;
    height: 100%;
    display: flex;
    gap: 1.5rem;
    background: var(--color-grey-lighter);
    
    @media (max-width: 968px) {
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;
    }
`;

export const InnerLayout = styled.div`
    padding: 1.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    
    @media (max-width: 968px) {
        padding: 1rem;
        gap: 1rem;
    }
`;

/* Reusable Card Component */
export const Card = styled.div`
    background: #fff;
    border-radius: var(--radius-xl);
    padding: 1.5rem;
    box-shadow: var(--shadow-md);
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
    }
`;

/* Glass Card for overlaid content */
export const GlassCard = styled.div`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: var(--radius-xl);
    padding: 1.5rem;
    box-shadow: var(--shadow-md);
    border: 1px solid rgba(255, 255, 255, 0.5);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
        box-shadow: var(--shadow-lg);
        border-color: rgba(255, 255, 255, 0.8);
    }
`;

/* Gradient Badge */
export const Badge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-lg);
    font-size: 0.875rem;
    font-weight: 600;
    color: #fff;
    background: ${props => props.gradient || 'var(--gradient-primary)'};
    
    &.success { background: var(--gradient-success); }
    &.warning { background: var(--gradient-warning); }
    &.danger { background: var(--gradient-danger); }
    &.info { background: var(--gradient-info); }
`;