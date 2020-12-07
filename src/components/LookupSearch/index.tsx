import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Api from '../../api/api';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { iLookupSearch } from '../../types/repo';


const LookupSearch: React.FC<iLookupSearch> = ({onClick}) => {
  const [languagesLookup, setLanguagesLookup] = useState<Array<string>>([]);
  const [language, setLanguage] = useState<string | null>(null);

  const handleLoadLanguages = async () => {
    const res = await Api.get('/language');

    setLanguagesLookup(res.data as Array<string>);
  }

  useEffect(() => {
    handleLoadLanguages();
  }, [])

  return(
    <>
      <Autocomplete
        id="combo-box-demo"
        value={language}
        onChange={(event: any, newValue: string | null) => {
          setLanguage(newValue);
        }}
        defaultValue=''
        options={languagesLookup}
        autoComplete
        autoHighlight
        style={{ width: 500 }}
        renderInput={(params) =>
          <TextField
            variant="standard"
            style={{fontSize: '30rem'}}
            {...params}
          />}
      />
      <Link
        to={(location) => {
          if(language === null){
            return location;
          }
          return `/search/${language}`
        }}

        onClick={() => onClick(language)}
      >
        <SearchIcon color="action" fontSize="large" />
      </Link>
    </>
  )
}

export default LookupSearch;