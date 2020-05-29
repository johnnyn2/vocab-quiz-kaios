import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {scrollIntoView} from '../services/navigation';

export const KaiAd = ({banner, focus, focusStyles, handleAdErr}) => {
    const navRef = useRef(null);
    useEffect(() => {
        function setStyles() {
            document.getElementById('ad-container').style.margin = 'auto';
            if (focus) {
                Object.keys(focusStyles).forEach(key => {
                    document.getElementById('ad-container').style[key] = focusStyles[key];
                })
            }
        }
        if(window.isKaiAdLoad) {
            if (banner) {
                window.loadKaiAd('ad-container', setStyles, handleAdErr);
            } else {
                window.loadKaiAd();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (focus) {
            scrollIntoView(navRef.current);
        }
    }, [focus]);
    const adContainer = banner ?
    <div id='ad-container' ref={navRef} style={focus && window.ads ? {...focusStyles} : {opacity: 0.3}}></div> :
    <span/>;
    return adContainer;
}

KaiAd.propTypes = {
    banner: PropTypes.bool,
    focus: PropTypes.bool,
    focusStyles: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    handleAdErr: PropTypes.func,
}
KaiAd.defaultProps = {
    banner: false,
    focus: false,
    focusStyles: {},
    handleAdErr: () => {},
}