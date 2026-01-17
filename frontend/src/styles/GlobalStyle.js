import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root{
        /* Primary Colors */
        --primary-color: #1a1f3a;
        --primary-light: #2d3561;
        --primary-dark: #0f1627;
        
        /* Accent Colors */
        --accent-blue: #4f46e5;
        --accent-cyan: #06b6d4;
        --accent-pink: #ec4899;
        --accent-green: #10b981;
        --accent-orange: #f97316;
        
        /* Status Colors */
        --success-color: #10b981;
        --warning-color: #f59e0b;
        --error-color: #ef4444;
        --info-color: #3b82f6;
        
        /* Neutral Colors */
        --color-grey: #9ca3af;
        --color-grey-light: #f3f4f6;
        --color-grey-lighter: #f9fafb;
        
        /* Gradients */
        --gradient-primary: linear-gradient(135deg, #4f46e5, #06b6d4);
        --gradient-success: linear-gradient(135deg, #10b981, #34d399);
        --gradient-warning: linear-gradient(135deg, #f97316, #fb923c);
        --gradient-danger: linear-gradient(135deg, #ef4444, #f87171);
        --gradient-info: linear-gradient(135deg, #3b82f6, #60a5fa);
        
        /* Spacing */
        --space-xs: 4px;
        --space-sm: 8px;
        --space-md: 12px;
        --space-lg: 16px;
        --space-xl: 24px;
        --space-2xl: 32px;
        
        /* Border Radius */
        --radius-sm: 6px;
        --radius-md: 12px;
        --radius-lg: 16px;
        --radius-xl: 20px;
        --radius-2xl: 24px;
        
        /* Shadows */
        --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    body{
        font-family: 'Nunito', sans-serif;
        font-size: clamp(0.95rem, 1.5vw, 1rem);
        overflow: hidden;
        color: var(--color-grey);
        background: var(--color-grey-lighter);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, h4, h5, h6{
        color: var(--primary-color);
        font-weight: 600;
        letter-spacing: -0.5px;
    }

    h1 {
        font-size: clamp(1.875rem, 4vw, 2.25rem);
        font-weight: 700;
    }

    h2 {
        font-size: clamp(1.5rem, 3vw, 1.875rem);
        font-weight: 700;
    }

    h3 {
        font-size: clamp(1.25rem, 2.5vw, 1.5rem);
        font-weight: 600;
    }

    h4 {
        font-size: clamp(1.125rem, 2vw, 1.25rem);
        font-weight: 600;
    }

    h5 {
        font-size: 1rem;
        font-weight: 600;
    }

    h6 {
        font-size: 0.875rem;
        font-weight: 500;
    }

    p {
        line-height: 1.5;
    }

    /* Scrollbar Styling */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        
        &:hover {
            background: rgba(0, 0, 0, 0.3);
        }
    }

    .error{
        color: var(--error-color);
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0%, 100%{
                transform: translateX(0);
            }
            25%{
                transform: translateX(8px);
            }
            50%{
                transform: translateX(-8px);
            }
            75%{
                transform: translateX(8px);
            }
        }
    }

    .success {
        color: var(--success-color);
    }

    .warning {
        color: var(--warning-color);
    }

    .info {
        color: var(--info-color);
    }
`;