import React, { useEffect, useRef, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Star from '@material-ui/icons/Star'
import GitHub from '@material-ui/icons/GitHub'
import Assignment from '@material-ui/icons/Assignment'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Info from '@material-ui/icons/Info'
import Share from '@material-ui/icons/Share'

import InfiniteScroll from "react-infinite-scroll-component";

import Api from '../../api/api';

import './styles.css';

interface iRepo {
  picture: string,
  name: string,
  repo: string,
  link: string,
  about: string,
  stars: number,
  forks: number
}

interface iParams {
  language: string
}

interface iData {
  items: Array<{
    name: string,
    owner: {
      login: string,
      avatar_url: string
    },
    description: string,
    html_url: string,
    forks: number,
    stargazers_count: number,
  }>
}

const Search: React.FC = () => {
  const {language} = useParams<iParams>();

  const [searchText, setSearchText] = useState(language);
  const [searchPath, setSearchPath] = useState('');
  const [searchEmpty, setSearchEmpty] = useState(false);
  
  const [gitPage, setGitPage] = useState(0);

  const [hasMore, setHasMore] = useState(true);
  const [repos, setRepos] = useState<Array<iRepo>>([]);

  const fetchNextRepos = useRef(async () => {});

  fetchNextRepos.current = async () => {
    Api.get('/repositories', {
      params: {
        q: `language:${language}`,
        sort: 'stars',
        page: gitPage
      }
    })
    .then((res) => {
      let newRepos:Array<iRepo> = [];

      (res.data as iData).items.forEach((item) => {
        newRepos = [...newRepos, {
          picture: item.owner.avatar_url || '',
          name: item.owner.login || '',
          repo: item.name || '',
          link: item.html_url || '',
          about: item.description || '',
          stars: item.stargazers_count || 0,
          forks: item.forks || 0,
        }];
      });
  
      setRepos([...repos, ...newRepos]);
    })
    .catch((e) => {
      console.log(e);
      setHasMore(false);
    });
  }

  useEffect(() => {
    if(gitPage !== -1)
      fetchNextRepos.current();
  }, [gitPage, language]);

  return (
    <div id='search'>
      <strong className='logo'>TOPi Repo</strong>

      <div className='input-box'>
        <TextField
          id="input-with-icon-textfield"
          error={searchEmpty}
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
          onFocus={() => setSearchEmpty(false)}
          fullWidth={true}
          
          InputProps={{
            fullWidth: true,

            endAdornment: (
              <InputAdornment position="end">
                <Link 
                  to={searchPath}
                  onClickCapture={() => {
                    if(searchText === ''){
                      setSearchEmpty(true);
                      setSearchPath('/');
                    } else {
                      setRepos([]);
                      setGitPage(-1);
                      setSearchPath(`/search/${searchText}`);
                    }
                  }}>
                    <SearchIcon color="action" fontSize="large"/>
                </Link>
              </InputAdornment>
            ),

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

      <div className='wrapper'>
        <InfiniteScroll
          className='infinite-scroll'
          dataLength={repos.length}
          hasMore={hasMore}
          height='800px'
          next={() => setGitPage(gitPage+1)}

          loader={
            <div className='loading'>
              <CircularProgress color='inherit' />
            </div>
          }
        >
          {
            repos.map((repo, index) => (
              <div className='repo' key={index}>
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
            ))
          }
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Search;