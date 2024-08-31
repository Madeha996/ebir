import React from 'react';
import * as S from './References.styles';
import { FacebookOutlined, GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

const GithubIcon = S.withStyles(GithubOutlined);
const TwitterIcon = S.withStyles(TwitterOutlined);
const FacebookIcon = S.withStyles(FacebookOutlined);
const LinkedinIcon = S.withStyles(LinkedinOutlined);

export const References: React.FC = () => {
  return (
    <S.ReferencesWrapper>
      <S.Text>
        Made by{' '}
        <a href="/" target="_blank" rel="noreferrer">
          Developers{' '}
        </a>
        in 2024 &copy;. Based on{' '}
      </S.Text>
      <S.Icons>
        <a href="/" target="_blank" rel="noreferrer">
          <GithubIcon />
        </a>
        <a href="/" target="_blank" rel="noreferrer">
          <TwitterIcon />
        </a>
        <a href="/" target="_blank" rel="noreferrer">
          <FacebookIcon />
        </a>
        <a href="/" target="_blank" rel="noreferrer">
          <LinkedinIcon />
        </a>
      </S.Icons>
    </S.ReferencesWrapper>
  );
};
