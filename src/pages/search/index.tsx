import React, { useEffect, useRef, useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import { iRepo, iURLParams } from '../../types/repo';

import { CircularProgress } from '@material-ui/core';

import InfiniteScroll from "react-infinite-scroll-component";

import Api from '../../api/api';
import RepoCard from '../../components/RepoCard';
import LookupSearch from '../../components/LookupSearch';

import './styles.css';

const Search: FC = () => {
  const {language} = useParams<iURLParams>();

  const [gitPage, setGitPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [repositories, setRepositories] = useState<Array<iRepo>>([]);

  const fetchNextRepos = useRef(async () => {});

  fetchNextRepos.current = async () => {
    try{
      const res = await Api.get('/repositories', {params: {
        name: language,
        page: gitPage
      }});
        
      let newRepos: Array<iRepo> = [];
  
      (res.data as  Array<iRepo>).forEach((item) => {
        newRepos = [...newRepos, {
          picture: item.picture,
          name: item.name || '',
          repo: item.repo || '',
          link: item.link || '',
          about: item.about || '',
          stars: item.stars || 0,
          forks: item.forks || 0,
        }];
      });

      if(gitPage === 1){
        setRepositories(newRepos);
      } else {
        setRepositories([...repositories, ...newRepos]);
      }
    } catch(e) {
      console.log(e);
      setHasMore(false);
    }
  }

  useEffect(() => {
    fetchNextRepos.current();
  }, [language])

  const handleSearch = async (lan: string | null) => {
    if(lan === null){
      return;
    }

    if(lan !== language){
      setRepositories([]);
      setHasMore(true);
      setGitPage(1);
    }
  }

  const handleNextRepos = () => {
    if(repositories.length > 0){
      setGitPage(gitPage + 1);
      fetchNextRepos.current();
    }
  }

  return (
    <div id='search'>
      <strong className='logo'>TOPi Repo</strong>

      <div className='input-box'>
        <LookupSearch onClick={(lan: string | null) => handleSearch(lan)}/>
      </div>

      <div className='wrapper'>
        <InfiniteScroll
          className='infinite-scroll'
          dataLength={repositories.length}
          hasMore={hasMore}
          next={handleNextRepos}
          height={`800px`}
          loader={
            <div className='loading'>
              <CircularProgress color='inherit' />
            </div>
          }
        >
          {
            repositories.map((repo, index) => (
              <RepoCard key={index} repo={repo} />
            ))
          }
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Search;
