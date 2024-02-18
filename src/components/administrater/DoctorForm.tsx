import React, { useState } from 'react';
import styled from 'styled-components';
import axios from "../../config/axiosinstance";

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FormWrapper = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;

  @media (min-width: 768px) {
    width: 48%;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 95.5%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #0b9c67;
  color: #fff;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const DoctorCreationForm = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    doctorName: '',
    username: '',
    department: '',
    password: '',
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setDoctorInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    try {
    const data = await axios.post("/administrater/createDoctor", doctorInfo);
      console.log(data);
      
    } catch (error) {
      console.log(error);
      
    }

    console.log('Doctor information submitted:', doctorInfo);
    // You can reset the form or perform any other necessary actions
  };

  return (
    <ContentWrapper>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Doctor Name:</label>
            <Input
              type="text"
              name="doctorName"
              value={doctorInfo.doctorName}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Username:</label>
            <Input
              type="text"
              name="username"
              value={doctorInfo.username}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Department:</label>
            <Select
              name="department"
              value={doctorInfo.department}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Department</option>
              <option value="cardiology">Cardiology</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="neurology">Neurology</option>
              <option value="dermatology">Dermatology</option>
              <option value="oncology">Oncology</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="internal-medicine">Internal Medicine</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <label>Password:</label>
            <Input
              type="password"
              name="password"
              value={doctorInfo.password}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <Button type="submit">Create Doctor</Button>
        </form>
      </FormWrapper>
    </ContentWrapper>
  );
};

export default DoctorCreationForm;
