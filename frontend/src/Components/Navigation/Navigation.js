import React from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/globalContext';

function Navigation({ active, setActive }) {
    const navigate = useNavigate();
    const { user } = useGlobalContext();
    const currentUser = user || JSON.parse(localStorage.getItem("user"));

    const handleSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <NavStyled>
            {/* User Section */}
            <div className="user-section">
                <img src={avatar} alt="User Avatar" className="avatar" />
                <div className="user-info">
                    <h3>{currentUser?.name || "User"}</h3>
                    <p>Welcome back</p>
                </div>
            </div>

            {/* Divider */}
            <div className="divider"></div>

            {/* Menu Items */}
            <ul className="menu">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                        title={item.title}
                    >
                        <span className="icon">{item.icon}</span>
                        <span className="label">{item.title}</span>
                    </li>
                ))}
            </ul>

            {/* Divider */}
            <div className="divider"></div>

            {/* Sign Out */}
            <button className="signout" onClick={handleSignOut}>
                {signout}
                <span>Sign Out</span>
            </button>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    width: 260px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-right: 1px solid rgba(0, 0, 0, 0.06);
    padding: 1.5rem 1rem;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
    
    /* Smooth scrollbar for sidebar */
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        
        &:hover {
            background: rgba(0, 0, 0, 0.2);
        }
    }

    .user-section {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding: 1rem;
        border-radius: var(--radius-lg);
        background: linear-gradient(135deg, rgba(79, 70, 229, 0.08), rgba(6, 182, 212, 0.08));
        border: 1px solid rgba(79, 70, 229, 0.1);
        transition: all 0.25s ease;

        &:hover {
            background: linear-gradient(135deg, rgba(79, 70, 229, 0.12), rgba(6, 182, 212, 0.12));
            border-color: rgba(79, 70, 229, 0.2);
        }

        .avatar {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: 2px solid #fff;
            object-fit: cover;
            box-shadow: 0 2px 8px rgba(79, 70, 229, 0.2);
            transition: all 0.3s ease;
            flex-shrink: 0;
        }

        .avatar:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }

        .user-info {
            flex: 1;
            min-width: 0;

            h3 {
                font-size: 0.95rem;
                font-weight: 600;
                margin: 0;
                color: var(--primary-color);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            p {
                font-size: 0.75rem;
                color: var(--color-grey);
                font-weight: 500;
                margin: 0.25rem 0 0 0;
            }
        }
    }

    .divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);
        margin: 1rem 0;
    }

    .menu {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;

        li {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--color-grey);
            border-radius: var(--radius-md);
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;

            .icon {
                font-size: 1.2rem;
                color: var(--color-grey);
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                flex-shrink: 0;
                transition: color 0.25s ease;
            }

            .label {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            &:hover {
                background: rgba(79, 70, 229, 0.08);
                color: var(--accent-blue);
                transform: translateX(4px);

                .icon {
                    color: var(--accent-blue);
                }
            }

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 3px;
                background: var(--accent-blue);
                transform: scaleY(0);
                transition: transform 0.25s ease;
            }

            &.active {
                background: linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(6, 182, 212, 0.1));
                color: var(--accent-blue);
                font-weight: 600;
                border: 1px solid rgba(79, 70, 229, 0.2);

                .icon {
                    color: var(--accent-blue);
                }

                &::before {
                    transform: scaleY(1);
                }
            }
        }
    }

    .signout {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        font-weight: 600;
        color: var(--error-color);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all 0.25s ease;
        border: none;
        background: transparent;
        font-size: 0.9rem;
        font-family: inherit;

        svg {
            font-size: 1.1rem;
        }

        &:hover {
            background: rgba(239, 68, 68, 0.08);
            color: #dc2626;
            transform: translateX(4px);
        }

        &:active {
            transform: scale(0.98) translateX(4px);
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        flex-direction: row;
        padding: 0.75rem;
        border-right: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        height: auto;
        
        .user-section {
            margin-bottom: 0;
            flex-shrink: 0;
            
            .user-info {
                display: none;
            }
        }

        .divider:first-of-type,
        .divider:nth-of-type(2) {
            display: none;
        }

        .menu {
            flex: 1;
            flex-direction: row;
            gap: 0;
            margin-bottom: 0;
            margin-left: 1rem;
            overflow-x: auto;
            
            li {
                flex-shrink: 0;
                
                .label {
                    display: none;
                }
            }
        }

        .signout {
            flex-shrink: 0;
            margin-left: auto;
        }
    }
`;

export default Navigation;
