// NotFoundPage.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4em;
  margin-bottom: 10px;
  color: #e74c3c; /* Red color */
`;

const Message = styled.p`
  font-size: 1.5em;
  color: #555;
`;

const NotFoundPage = () => {
  return (
    <Container>
      <Title>404 - Not Found</Title>
      <Message>Sorry, the page you are looking for does not exist.</Message>
    </Container>
  );
};

export default NotFoundPage;
