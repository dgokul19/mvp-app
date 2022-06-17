import React, { useState, useLayoutEffect, useRef } from "react";
import clsx from 'clsx';

import { useTheme } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, Divider, List, ListItem, IconButton, ListItemText } from '@material-ui/core';
import { Menu as MenuIcon, ChevronLeft, ChevronRight, AccountCircle } from '@material-ui/icons';

import DashboardContent from './DashboardContent';

import { useStyles } from './Style/drawerStyle';
import './Style/dashboard.scss';




const Dashboard = () => {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    
    const refContainer = useRef(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const updateSize = () => {
        const { clientWidth } = refContainer.current;
        if(clientWidth < 980) {
            handleDrawerClose();
        } else {
            handleDrawerOpen();
        }
    };

    useLayoutEffect(() => {
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div className="homeContainer" ref={refContainer}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeft className={`iconColorPrimary`} /> : <ChevronRight className={`iconColorPrimary`} />}
                    </IconButton>
                </div>
                <Divider />
                <div className="userProfile">
                    <div className="userIcon">
                        <AccountCircle className="userImage"/>
                    </div>
                    <h4>Gokulan Dhakshinamoorthy Balasubramaniyan </h4>
                </div>
                <Divider />
                <List className="drawerList">
                    {['Function 1', 'Function 2', 'Function 3', 'Function 4'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                <DashboardContent />
            </div>
        </div>
    )
};

export default Dashboard;
