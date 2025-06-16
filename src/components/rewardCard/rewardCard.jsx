import { Card } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculatePoints } from '../../utils/calculatePoints';

// Styled for the points
const Points = styled.span`
  font-size: 3.5rem;
  font-weight: 700;
  color: #1677ff; /* Ant Design primary blue */
  letter-spacing: 1px;
`;
const StyledSpan = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const SectionWrapper = styled.div`
  padding: 32px 24px 24px 24px;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(22, 119, 255, 0.04);
  min-width: 300px;
`;
// Styled heading
const StyledHeading = styled.h3`
  font-size: 1.35rem;
  font-weight: 600;
  color: #1d3557;
  margin-bottom: 18px;
  letter-spacing: 0.5px;
`;

const RewardCard = ({ transactions, heading }) => {
  const total = calculatePoints(transactions)
  return (
    <SectionWrapper>
      <StyledHeading data-testid="reward-heading">{heading}</StyledHeading>
      <Card
        style={{
          maxWidth: 340,
          borderRadius: 12,
          boxShadow: '0 2px 8px #f0f1f2',
        }}
      >
        <Points>
          {total} <StyledSpan>pts</StyledSpan>
        </Points>
      </Card>
    </SectionWrapper>
  );
};

export default RewardCard;

RewardCard.propTypes = {
  transactions: PropTypes.array.isRequired,
  heading: PropTypes.string.isRequired,
};
