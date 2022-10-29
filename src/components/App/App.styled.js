import styled from 'styled-components';

export const MainText = styled.h1`
  margin: ${p => p.theme.space[0]}px;
  margin-bottom: ${p => p.theme.space[4]}px;
  padding: ${p => p.theme.space[0]}px;

  font-size: ${p => p.theme.fontSizes.l}px;
  color: ${p => p.theme.colors.mainText};
  text-shadow: ${p => p.theme.shadows.wrapShadow};
`;

export const Equal = styled.div`
  margin-top: ${p => p.theme.space[2]}px;
  margin-bottom: ${p => p.theme.space[2]}px;
`;

export const Wrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
