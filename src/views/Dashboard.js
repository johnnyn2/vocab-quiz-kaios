import React, {useEffect, useState} from 'react';
import {NavItem} from '../components/NavItem';
import {SoftKeys} from '../components/SoftKeys';
import icon from '../images/kaios_56.png';
import PropTypes from 'prop-types';
import '../css/Dashboard.css';
import {qb} from '../qoa/qoa';

export const Dashboard = ({viewIndex, navToView, setQb}) => {
    const initialState = {
        dashboardNavItems: [
            {name: '', focus: true, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: '', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: '', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}}
        ],
        activeViewItem: 0,
        prevActiveViewItem: 0,
    }
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const defDashboardItemBehavior = [...state.dashboardNavItems];
        Object.keys(qb).forEach((key,index) => {
            defDashboardItemBehavior[index].name = key;
            defDashboardItemBehavior[index].onKeyLeft = () => {
                if (viewIndex > 0) {
                    navToView(viewIndex - 1);
                }
            };
            defDashboardItemBehavior[index].onKeyRight = () => {
                if (defDashboardItemBehavior[index].right === 'MENU') {
                    setState(prevState => {
                        const newState = {
                            ...prevState,
                            activeView: 'menu',
                            showMenu: true,
                            prevActiveViewItem: prevState.activeViewItem,
                            activeViewItem: 0,
                        };
                        newState.dashboardNavItems[prevState.activeViewItem].focus = false;
                        newState.menuNavItems[newState.activeViewItem].focus = true;
                        return newState;
                    })
                }
            };
            defDashboardItemBehavior[index].onKeyCenter = () => {
                setState({...initialState});
                setQb(key);
                navToView(1);
            };
            defDashboardItemBehavior[index].onArrowUp = () => setState(prevState => moveUp(prevState));
            defDashboardItemBehavior[index].onArrowLeft = () => setState(prevState => moveUp(prevState));
            defDashboardItemBehavior[index].onArrowDown = () => setState(prevState => moveDown(prevState));
            defDashboardItemBehavior[index].onArrowRight = () => setState(prevState => moveDown(prevState));
        })
        // defDashboardItemBehavior.forEach((item, index) => {
        //     item.onKeyLeft = () => {
        //         if (viewIndex > 0) {
        //             navToView(viewIndex - 1);
        //         }
        //     };
        //     item.onKeyRight = () => {
        //         if (item.right === 'MENU') {
        //             setState(prevState => {
        //                 const newState = {
        //                     ...prevState,
        //                     activeView: 'menu',
        //                     showMenu: true,
        //                     prevActiveViewItem: prevState.activeViewItem,
        //                     activeViewItem: 0,
        //                 };
        //                 newState.dashboardNavItems[prevState.activeViewItem].focus = false;
        //                 newState.menuNavItems[newState.activeViewItem].focus = true;
        //                 return newState;
        //             })
        //         }
        //     };
        //     item.onKeyCenter = () => {
        //         setState({...initialState});
        //         setQb(index);
        //         navToView(1);
        //     };
        //     item.onArrowUp = () => setState(prevState => moveUp(prevState));
        //     item.onArrowLeft = () => setState(prevState => moveUp(prevState));
        //     item.onArrowDown = () => setState(prevState => moveDown(prevState));
        //     item.onArrowRight = () => setState(prevState => moveDown(prevState));
        // });


        setState(initialState => ({
            ...initialState,
            dashboardNavItems: defDashboardItemBehavior,
        }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function moveUp(prevState) {
        const newState = { ...prevState };
        if (newState.activeViewItem !== 0) {
            newState.dashboardNavItems[newState.activeViewItem].focus = false;
            newState.dashboardNavItems[newState.activeViewItem - 1].focus = true;
            newState.activeViewItem -= 1;
        }
        return newState;
    }

    function moveDown(prevState) {
        const newState = { ...prevState };
        if (newState.activeViewItem !== newState.dashboardNavItems.length - 1) {
            newState.dashboardNavItems[newState.activeViewItem].focus = false;
            newState.dashboardNavItems[newState.activeViewItem + 1].focus = true;
            newState.activeViewItem += 1;
        }
        
        return newState;
    }

    const navItemStyles = {
        width: '90%',
        height: '60px',
        borderRadius: '10px',
        border: '1px solid #E7E7E7',
        margin: '5px 10px',
    }
    const dashboardItems = state.dashboardNavItems.map((item, index) => <NavItem name={item.name} focus={item.focus} key={index} style={{...navItemStyles}}/>);
    const view = (
        <div className="dashboard">
            <div className="dashboard-header">
                <div className="dashboard-header-wrapper">
                    <span className="dashboard-header-title">Dashboard</span>
                    <span className="dashboard-header-sub">3 item(s)</span>
                </div>
                <img alt="icon" className="dashboard-icon" src={icon}></img>
            </div>
            <div style={{flexDirection: 'column'}} className="container">
                {dashboardItems}
            </div>
        </div>
    );
    return (
        <React.Fragment>
            <div className="background"></div>
            {view}
            <SoftKeys
                viewIndex={viewIndex}
                activeNavItem={state.dashboardNavItems[state.activeViewItem]}
            />
        </React.Fragment>
    );
}

Dashboard.propTypes = {
    viewIndex: PropTypes.number.isRequired,
    navToView: PropTypes.func.isRequired,
}