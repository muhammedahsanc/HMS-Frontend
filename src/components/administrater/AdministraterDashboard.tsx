import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHome, FaClipboardList, FaUser } from 'react-icons/fa';
import DoctorForm from './DoctorForm';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option:any) => {
    setSelectedOption(option);
  };

  return (
    <Container>
      <Sidebar>
        <Logo>Dashboard</Logo>
        <Option onClick={() => handleOptionClick('Hii..Welcome')}>
          <FaHome size={20} />
          Home
        </Option>
        <Option onClick={() => handleOptionClick(<DoctorForm />)}>
          <FaClipboardList size={20} />
          Create Doctor
        </Option>
        <Option onClick={() => handleOptionClick('Option 3')}>
          <FaUser size={20} />
          Manage Doctor
        </Option>
      </Sidebar>
      <MainContent>
        {selectedOption || 'Select an option'}
        {/* Additional content for the selected option goes here */}
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  min-height: 97.5vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #0b9c67;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Option = styled.div`
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background-color: #444;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 25px;
  padding-left: 200px;

  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

export default Dashboard;
