import  { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../config/axiosinstance";
import { notify } from "../../utils";
interface CategoryItem {
  _id: string;
  name: string;
}
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
    doctorName: "",
    username: "",
    department: "",
    password: "",
    qualification:"",
  });
  const [category, setcategory] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDoctorInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await axios.post("/administrater/createDoctor", doctorInfo);
      if(data){
        notify("Created Successfully")
        setDoctorInfo({
          doctorName: "",
    username: "",
    department: "",
    password: "",
    qualification:"",
        })
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCategories = async () => {
    try {
      const data = await axios.get("/administrater/getCategory");
      console.log(data);
      setcategory(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

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
            <label>Qualification:</label>
            <Input
              type="text"
              name="qualification"
              value={doctorInfo.qualification}
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
      {Array.isArray(category) && category.map((item: CategoryItem) => (
          <option key={item._id} value={`${item._id}|${item.name}`}>
          {item.name}
        </option>
      ))}
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
