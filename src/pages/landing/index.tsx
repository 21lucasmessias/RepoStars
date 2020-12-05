import React from 'react';

import { Link } from 'react-router-dom';

import Icon from '../../components/icon';

import iconSearch from '../../assets/icons/utility/search.svg';

import './styles.css';

const Landing: React.FC = () => {
  return (
    <div id='landing'>
      <strong className='logo'>TOPi Repo</strong>

      <p className='label-search'>Type a language to search for the most starred repositories in github.</p>
        
      <div className='search-box'>
        <input name='search' maxLength={20}></input>

        <Link to='/search' >
          <Icon 
            path_icon={iconSearch}
            size={25}
            color={'black'}
          />
        </Link>
      </div>
    </div>
  );
}

export default Landing;