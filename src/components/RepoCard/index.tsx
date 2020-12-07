import React, {memo} from 'react';

import Star from '@material-ui/icons/Star'
import GitHub from '@material-ui/icons/GitHub'
import Assignment from '@material-ui/icons/Assignment'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Info from '@material-ui/icons/Info'
import Share from '@material-ui/icons/Share'

import './styles.css';

import { iRepoCard } from '../../types/repo';
import { Button } from '@material-ui/core';

const RepoCard: React.FC<iRepoCard> = ({repo}) => {
  return (
    <div className='repo'>
      <div className='profile' style={{backgroundImage:`url(${repo.picture})`}}/>

      <div className='name'>
        <AccountCircle fontSize='large' className='icon'/>
        <h1>{repo.name}</h1>
      </div>

      <div className='link'>
        <a href={repo.link}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<GitHub />}
          >GitHub</Button>
          </a>
      </div>

      <div className='repository'>
        <Assignment fontSize='large' className='icon'/>
        <h1>{repo.repo}</h1>
      </div>

      <div className='about'>
        <Info fontSize='large' className='icon'/>
        <h1>{repo.about.substr(0, 70)}</h1>
      </div>

      <div className='stars'>
        <Star fontSize='large' color='primary'/>
        <p>{repo.stars}</p>
      </div>

      <div className='forks'>
        <Share fontSize='large' color='action'/>
        <p>{repo.forks}</p>
      </div>
    </div>
  );
}

export default memo(RepoCard);