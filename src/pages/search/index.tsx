import React from 'react';

import './styles.css';

import Icon from '../../components/icon';

import iconStar from '../../assets/icons/custom/custom11.svg';
//import iconLanguage from '../../assets/icons/custom/custom68.svg';
//import iconProfile from '../../assets/icons/standard/avatar.svg';
//import iconName from '../../assets/icons/standard/code_playground.svg';


const Search: React.FC = () => {
  return (
    <div>
      <Icon
        path_icon={iconStar}
        size={20}
        color='yellow'
      />
    </div>
  );
}

export default Search;