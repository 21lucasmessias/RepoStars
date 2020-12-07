import React, {memo} from 'react';

import Star from '@material-ui/icons/Star'
import GitHub from '@material-ui/icons/GitHub'
import Assignment from '@material-ui/icons/Assignment'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Info from '@material-ui/icons/Info'
import Share from '@material-ui/icons/Share'

import './styles.css';

import { iRepoCard } from '../../types/repo';

const RepoCard: React.FC<iRepoCard> = ({repo}) => {
  return (
    <div className='repo'>
      <div className='profile' style={{backgroundImage:`url(${repo.picture})`}}/>

      <div className='name-repository'>
        <div className='name'>
          <AccountCircle fontSize='large'/>
          <h1>{repo.name}</h1>
        </div>
        <div className='repository'>
          <Assignment fontSize='large'/>
          <h1>{repo.repo}</h1>
        </div>
      </div>

      <div className='link-about'>
        <div className='link'>
          <GitHub fontSize='large'/>
          <a href={repo.link}>{repo.link}</a>
        </div>
        <div className='about'>
          <Info fontSize='large'/>
          <h1>{repo.about.substr(0, 70)}</h1>
        </div>
      </div>

      <div className='stars-forks'>
        <div className='stars'>
          <Star fontSize='large' color='primary'/>
          <p>{repo.stars}</p>
        </div>
        <div className='forks'>
          <Share fontSize='large' color='action'/>
          <p>{repo.forks}</p>
        </div>
      </div>
    </div>
  );
}

export default memo(RepoCard);