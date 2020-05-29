import React, { useRef, useEffect } from 'react';
import {KaiAd} from '../ads/KaiAd';
export const Question = ({n, q, o, a, showAns, opt, score, currentRef}) => {
    const qRef = useRef(null);
    const oRef = useRef(null);
    const aRef = useRef(null);
    useEffect(() => {
        if (currentRef === 0) {
            qRef.current.scrollIntoView({behavior: 'smooth'});
        } else if (currentRef === 1) {
            oRef.current.scrollIntoView({behavior: 'smooth'});
        } else {
            aRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [currentRef])
    return (
        <React.Fragment>
        <KaiAd/>
        <div style={{height: 'calc(100% - 30px)', flexDirection: 'column', overflow: 'scroll'}}>
            <div ref={qRef} style={{textAlign: 'center', padding: '20px 0', backgroundColor:'red', borderRadius:'10px', margin: '10px'}}>{`${n}. ${q}`}</div>
            <div ref={oRef} style={{justifyContent: 'center', padding: '20px 20px', display: 'flex', backgroundColor: 'blue', flexDirection: 'column', borderRadius: '10px', margin: '10px'}}>
                {o.map((option, i) => <div style={{backgroundColor: opt === option ? 'yellow' : ''}} key={i}>{`${i+1}. ${option}`}</div>)}
            </div>
            {showAns ?
                <div ref={aRef} style={{display: 'flex', backgroundColor: 'green', padding: '10px 20px', borderRadius: '10px', margin: '10px'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div>{a === opt ? 'Correct!' : 'Wrong!'}</div>
                        <div>{`Correct Answer: ${a}`}</div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {`Score: ${score}`}
                    </div>
                </div> :
                <span/>
            }
        </div>
        </React.Fragment>
    );
}