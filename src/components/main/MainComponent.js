import React, { useState } from 'react';
import queryString from 'query-string';
import { Button } from '@material-ui/core';
import { addData } from '../../utils/firebase';
import Grid from '@material-ui/core/Grid';
import {
  Wrapper,
  Title,
  Rate,
  Comment,
  RatingList,
  ButtonList,
} from './Styled';

function MainComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRate, setCurrentRate] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [currentComment, setCurrentComment] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const {
    event_name = 'init event',
    user_email = 'init email',
    user_type = 'init type',
  } = queryString.parse(window.location.search);

  function testClick() {
    setIsLoading(true);

    const parameters = {
      comments: showComment ? currentComment : '',
      event_name,
      rating: currentRate,
      user_email,
      user_type,
    };

    addData(parameters)
      .then(() => {
        setIsLoading(false);
        setIsDone(true);
        initStates();
      })
      .catch((e) => {
        console.log('error', e);
        setIsLoading(false);
      });
  }

  function handleRateClick(num) {
    if (num === currentRate) {
      setCurrentRate(0);
    } else {
      setCurrentRate(num);
    }
  }

  function handleCommentChange({ target }) {
    const { value } = target;
    setCurrentComment(value.trim());
  }

  function initStates() {
    setCurrentRate(0);
    setShowComment(false);
    setCurrentComment('');
  }

  function handleClose() {
    setIsClosed(true);
  }

  if (isClosed) {
    return null;
  }

  if (isDone) {
    return (
      <Wrapper>
        <Title>Thanks!</Title>
        <ButtonList>
          <Button variant="contained" onClick={() => handleClose(true)}>
            Close
          </Button>
        </ButtonList>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* rating */}
      <Grid className="list" container spacing={1} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Title>Do you like this ?</Title>
        </Grid>
        <Grid item xs={12} sm={6}>
          <RatingList>
            {[1, 2, 3, 4, 5].map((num) => (
              <Rate
                active={currentRate >= num}
                onClick={() => handleRateClick(num)}
              >
                ★
              </Rate>
            ))}
          </RatingList>
        </Grid>
      </Grid>
      {/* comment */}
      {showComment && (
        <Grid className="list" container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Title>Comment or Message</Title>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Comment
              className="comment"
              placeholder="Enter your comment here..."
              onChange={(e) => handleCommentChange(e)}
            />
          </Grid>
        </Grid>
      )}
      <ButtonList>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleClose(true)}
        >
          No, Thanks!
        </Button>
        {!showComment && (
          <Button variant="contained" onClick={() => setShowComment(true)}>
            Add comment
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={testClick}
          disabled={isLoading}
        >
          Send
        </Button>
      </ButtonList>
    </Wrapper>
  );
}

export default MainComponent;
