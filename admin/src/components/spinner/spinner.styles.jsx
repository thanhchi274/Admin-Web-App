import styled from 'styled-components';

export const SpinnerOverlay = styled.div`
height: 100vh;
width: 100vw;
background-color: #fff;
display: block;
align-items: center;
justify-content: center;
position: fixed;
z-index: 9999;
top: 0;
`;

export const SpinnerContainer = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 50px;
height: 50px;
background-color: black;
border-radius: 50%;
&:after {
  content: '';
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  border: 0 solid white;
  transform: translate(-50%, -50%);
  animation: loading 1000ms ease-out forwards infinite;
  transition: all 0.3s ease;
  @keyframes loading {
    0% {
      border: 0 solid white;
      transition: all 0.3s ease;
    }
    20% {
      border: 8px solid white;
      width: 0;
      height: 0;
      transition: all 0.3s ease;
    }
    100% {
      border: 8px solid white;
      width: 100%;
      height: 100%;
      transition: all 0.3s ease;
    }
  }
`;
