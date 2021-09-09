import styled from 'styled-components';
import { Card } from '@material-ui/core';
import { FEATURE_COLOR, BORDER_RADIUS, BOX_SHADOW } from '../../styles/configs';

const CardStyled = styled(Card)`
  display: flex;
  border-radius: ${BORDER_RADIUS};
  box-shadow: ${BOX_SHADOW.card};
  background-color: ${FEATURE_COLOR.white};
  padding: ${(props) => props.padding || 0};
  margin: ${(props) => props.margin || '0 0 32px 0'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  flex-direction: ${(props) => props.flexDirection || 'row'};
  overflow: visible;
  min-height: ${(props) => props.minHeight};
  height: ${(props) => props.height};
`;

export { CardStyled };
