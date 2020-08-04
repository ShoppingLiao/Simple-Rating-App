import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 32px 16px 16px;
  background: #f2f2f2;
  .list {
    margin: 16px 0;
  }
`;

export const Title = styled.h3`
  margin: 0;
`;

export const Comment = styled.textarea`
  width: 100%;
  height: 150px;
  resize: none;
`;

export const RatingList = styled.div`
  display: flex;
  justify-content: center;
`;

export const Rate = styled.div`
  color: ${({ active }) => (active ? '#EFAD04' : '#ddd')};
  cursor: pointer;
  margin: 0 8px;
  font-size: 20px;
  user-select: none;
  &:hover {
    color: ${({ active }) => (active ? '#EFAD04' : '#d4d4d4')};
  }
`;

export const ButtonList = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;

  button {
    margin: 0 8px;
  }
`;
