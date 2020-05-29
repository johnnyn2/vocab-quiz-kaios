export const moveUp = (prevState) => {
    const newState = {...prevState};
    if (newState.activeViewItem !== 0) {
        newState.navItems[newState.activeViewItem].focus = false;
        newState.navItems[newState.activeViewItem - 1].focus = true;
        newState.activeViewItem -= 1;
    }
    return newState;
}
export const moveDown = (prevState) => {
    const newState = {...prevState};
    if (newState.activeViewItem !== newState.navItems.length - 1) {
        newState.navItems[newState.activeViewItem].focus = false;
        newState.navItems[newState.activeViewItem + 1].focus = true;
        newState.activeViewItem += 1;
    }
    return newState;
}

function elementInViewport(myElement) {
    const bounding = myElement.getBoundingClientRect();
    if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
        return true;
    } else {
        return false;
    }
}

export const scrollIntoView = (target) => {
    if (!elementInViewport(target)) {
        target.scrollIntoView({ behavior: "smooth" });
    }
}
