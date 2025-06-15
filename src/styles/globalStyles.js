import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body { margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background: #f8f9fa; }
`;

export const Container = styled.div`
  max-width: 1000px;
  margin: 30px auto;
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

export const Section = styled.div`
  margin-bottom: 32px;
`;
