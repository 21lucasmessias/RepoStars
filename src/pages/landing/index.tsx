import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import './styles.css';

const Landing: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchPath, setSearchPath] = useState('');
  const [searchEmpty, setSearchEmpty] = useState(false);

  return (
    <div id='landing'>
      <strong className='logo'>TOPi Repo</strong>

      <p className='label-search'>Type a language to search for the most starred repositories in github.</p>
        
      <div className='input-box'>
        <TextField
          id="input-with-icon-textfield"
          error={searchEmpty}
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
          onFocus={() => setSearchEmpty(false)}
          fullWidth={true}
          
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Link 
                onClickCapture={() => {
                  if(searchText === ''){
                    setSearchEmpty(true);
                    setSearchPath('/');
                  } else {
                    setSearchPath(`/search/${searchText}`);
                  }
                }}
                to={searchPath} >
                  <SearchIcon color="action" fontSize="large"/>
                </Link>
              </InputAdornment>
            ),
            fullWidth: true,
            inputProps: {
              style: {
                textAlign: 'center',
                fontSize: '20px',
                color: '#DCE1DE'
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Landing;