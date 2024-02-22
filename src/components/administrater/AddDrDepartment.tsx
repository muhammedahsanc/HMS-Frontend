import React, { useState } from "react";
import styled from "styled-components";
import axios from "../../config/axiosinstance";
import { notify } from "../../utils";

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

const AddDrDepartment = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    department: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDoctorInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await axios.post("/administrater/category", doctorInfo);
      if (data) {
        notify("Added Successfully");
        setDoctorInfo({ department: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContentWrapper>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Department:</label>
            <Input
              type="text"
              name="department"
              value={doctorInfo.department}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <Button type="submit">Create Department</Button>
        </form>
      </FormWrapper>
    </ContentWrapper>
  );
};

export default AddDrDepartment;
