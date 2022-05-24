import React, { ReactNode } from 'react';
import { Container } from 'reactstrap';
// @ts-ignore
import { NavMenu } from './NavMenu.tsx';

interface LayoutProps {
  children: ReactNode[] | ReactNode
}


const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div>
      <NavMenu />
      <Container>
        {children}
      </Container>
    </div>
  );

};

export default Layout;