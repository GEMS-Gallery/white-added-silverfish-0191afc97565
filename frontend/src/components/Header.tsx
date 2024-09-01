import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            LoopNet Clone
          </Link>
        </Typography>
        <Button color="inherit" component={Link} to="/properties">
          Properties
        </Button>
        <Button color="inherit" component={Link} to="/add-property">
          Add Property
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
