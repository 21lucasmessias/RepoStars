import React from 'react';
import { ReactSVG } from 'react-svg';

// import { Container } from './styles';

interface iIcon {
  path_icon: string,
  color: string,
  size: number,
}

const Icon: React.FC<iIcon> = ({path_icon, color, size}) => {
  return(
    <ReactSVG
      src={path_icon} 

      beforeInjection={(svg) => {
        svg.setAttribute('style', `width: ${size}px`);

        const pathArray = [...svg.querySelectorAll('path')];
        pathArray.map((path) => path.setAttribute('fill', color));
    }}/>
  );
}

export default Icon;