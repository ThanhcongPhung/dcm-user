import styled from 'styled-components';

const DateTimeRangePickerStyled = styled.div`
  display: inline-flex;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  padding: 5px 15px;
  color: rgba(0, 0, 0, 0.87);
  .datePicker {
    padding: 4px;
    width: 140px;
  }
  .iconMore {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .dividerDateRange {
    display: flex;
    align-items: center;
    font-size: 28px;
  }
`;

export { DateTimeRangePickerStyled };
