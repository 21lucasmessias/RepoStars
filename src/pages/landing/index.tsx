import React from 'react';

import LookupSearch from '../../components/LookupSearch';
import './styles.css';

const Landing: React.FC = () => {
  return (
    <div id='landing'>
      <strong className='logo'>TOPi Repo</strong>

      <p className='label-search'>Type a language to search for the most starred repositories in github.</p>
           
      <div className='input-box'>
        <LookupSearch onClick={() => {}}/>
      </div>
    </div>
  );
}

export default Landing;