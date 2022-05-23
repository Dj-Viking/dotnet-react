import React, { ReactNode } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

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