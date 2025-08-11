import React from 'react'
import SidenavTitle from './SidenavTitle';

const Sidenav = () => {
  return (
    <div className="px-7 py-4">
      <SidenavTitle title="M" subTitle="enu" />
      <ul>
        <li className="sidenavLi">Blog Page</li>
        <li className="sidenavLi">Portfolio Page</li>
      </ul>
      <SidenavTitle title="P" subTitle="rojects" />
      <ul>
        <li className="sidenavLi">E-commerce Platform</li>
        <li className="sidenavLi">Auto-Annotation Platform</li>
        <li className="sidenavLi">Chatting Applications with TCP and UDP</li>
      </ul>
      <SidenavTitle title="L" subTitle="atest Posts" />
      <ul>
        <li className="sidenavLi">Quickly build an agent based on the react framework 2025</li>
        <li className="sidenavLi">Designer Conference at NSW, AUS 2025</li>
      </ul>
    </div>
  );
}

export default Sidenav