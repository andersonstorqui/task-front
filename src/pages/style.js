import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: #0f0f0f;
  width: 90%;
  margin: 3% auto;
  height: 85vh;

`;

export const Content = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 3% 0 5% 10%;
`

export const Input = styled.input`
  padding: 10px 50%;
  border: none;
  border-radius: 25px
`

export const Button = styled.button`
  padding: 10px 25px;
  border: none;
  border-radius: 10px;
  background-color: red;
  margin-left: 15px;
  color: #fff;
  margin-top: 5px;
`

export const ButtonInput = styled.button`
  padding: 10px 25px;
  border: none;
  border-radius: 10px;
  background-color: red;
  margin-left: 15px;
  color: #fff;
  `


export const Form = styled.form`
  display: flex;
  justify-content: left;
  align-items: center;
`
export const H1 = styled.h1`
  font size: 28px;
  margin-left: 25px;
`

export const TaskItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const CheckIcon = styled(FaCheckSquare)`
  color: red;
  cursor: pointer;
  margin-left: 10px;
`;

export const UncheckIcon = styled(FaRegSquare)`
  color: gray;
  cursor: pointer;
  margin-left: 10px;
`;
