import React, {useState, useEffect} from 'react';
import {qb} from '../qoa/qoa';
import {Question} from '../views/Question';
import {SoftKeys} from '../components/SoftKeys';

export const Easy = ({viewIndex, navToView, type}) => {
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [ans, setAns] = useState('');
    const [showAns, setShowAns] = useState(false);
    const [currentRef, setCurrentRef] = useState(0);

    useEffect(() => {
        if(showAns) {
            document.body.focus();
            document.body.click();
        } 
    }, [showAns])

    const qustionBank = qb[type];
    return (
    <React.Fragment>
        <Question
            n={currentQuestion + 1}
            q={qustionBank[currentQuestion].q}
            o={qustionBank[currentQuestion].o}
            a={qustionBank[currentQuestion].a}
            showAns={showAns}
            opt={ans}
            score={`${score}/${qustionBank.length}`}
            currentRef={currentRef}
        />
        <SoftKeys
                viewIndex={viewIndex}
                activeNavItem={{
                    name: '',
                    onArrowUp: () => {
                        if (currentRef === 1) {
                        setCurrentRef(0);
                        }
                        else if (currentRef === 2) {
                            setCurrentRef(1);
                        }
                    },
                    onArrowDown: () => {
                        if (currentRef === 0) {
                            setCurrentRef(1);
                        } else if (currentRef === 1) {
                            setCurrentRef(2);
                        }
                    },
                    onArrowLeft: () => {},
                    onArrowRight: () => {},
                    onKeyLeft: () => {
                        navToView(0);
                    },
                    onKeyCenter: () => {
                        if (!showAns) {
                            if (ans !== '') {
                                setShowAns(true);
                                if (qustionBank[currentQuestion].a === ans) {
                                    setScore(score + 1);
                                }
                            } else {
                                alert('Please answer!');
                            }
                        }
                    },
                    onKeyRight: currentQuestion !== qustionBank.length - 1 && showAns ? () => {
                        setAns('');
                        setCurrentQuestion(currentQuestion + 1);
                        setShowAns(false);
                    } : () => {},
                    setAns: !showAns ? (opt) => setAns(qustionBank[currentQuestion].o[opt]) : () => {},
                    center: 'SUBMIT',
                    right: currentQuestion !== qustionBank.length - 1 && showAns ? 'NEXT' : '',
                }}
            />
    </React.Fragment>
    );
}