import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {
    const { width, height } = useWindowSize();

    // Floating movement animation
    const moveOrb = keyframes`
        0% {
            transform: translate(0, 0) rotate(0deg);
        }
        33% {
            transform: translate(${width / 6}px, ${height / 8}px) rotate(20deg);
        }
        66% {
            transform: translate(${width / 12}px, ${height / 6}px) rotate(-15deg);
        }
        100% {
            transform: translate(0, 0) rotate(0deg);
        }
    `;

    // Gradient color shift animation
    const gradientShift = keyframes`
        0% {
            background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
        }
        50% {
            background: linear-gradient(180deg, #6a11cb 0%, #2575fc 100%);
        }
        100% {
            background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
        }
    `;

    const OrbStyled = styled.div`
        width: 65vh;
        height: 65vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -32.5vh;
        margin-top: -32.5vh;
        filter: blur(350px);
        animation: ${moveOrb} 18s ease-in-out infinite alternate,
                   ${gradientShift} 10s ease-in-out infinite;
        z-index: -1;

        @media (max-width: 768px) {
            width: 45vh;
            height: 45vh;
            margin-left: -22.5vh;
            margin-top: -22.5vh;
            filter: blur(250px);
        }
    `;

    return <OrbStyled />;
}

export default Orb;
