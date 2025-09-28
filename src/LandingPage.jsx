import React, { useEffect, useRef, useState } from 'react';
import './LandingPage.css';
import smile from './assets/smile.png';
import logo from './assets/logo.png';

// 1. Accept `onNavigate` as a prop
const LandingPage = ({ onNavigate }) => {
    const ball1Ref = useRef(null);
    const ball2Ref = useRef(null);
    const faceRef = useRef(null);
    const cloudContainerRef = useRef(null); 
    const cardsRef = useRef(null);
    const faceMoveScale = 0.2;
    const [isIdle, setIsIdle] = useState(false);
    const idleActionRef = useRef(null);
    const [isBlinking, setIsBlinking] = useState(false);
    const blinkIntervalRef = useRef(null);

    // This useEffect is no longer needed because the '.cloud-container' is now 
    // position: relative and part of the normal document flow. The '.cards'
    // container will automatically appear after it without needing a calculated margin.
    
    useEffect(() => {
        const setCardsMargin = () => {
            if (cloudContainerRef.current && cardsRef.current) {
                const cloudContainerHeight = cloudContainerRef.current.offsetHeight + window.innerHeight/25;
                cardsRef.current.style.marginTop = `${cloudContainerHeight}px`;
            }
        };

        setCardsMargin();
        window.addEventListener('resize', setCardsMargin);

        return () => {
            window.removeEventListener('resize', setCardsMargin);
        };
    }, []); 
    

    useEffect(() => {
        const blinkAction = () => {
            setIsBlinking(true);
            setTimeout(() => {
                setIsBlinking(false);
            }, 700);
        };

        const initialTimeout = setTimeout(() => {
            blinkAction();
            blinkIntervalRef.current = setInterval(blinkAction, 3700);
        }, 3000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(blinkIntervalRef.current);
        };
    }, []);

    useEffect(() => {
        const balls = [ball1Ref.current, ball2Ref.current];
        const faceContainer = faceRef.current;
        if (!balls[0] || !balls[1] || !faceContainer) return;

        const scheduleRandomMove = () => {
            const maxOffsetPercent = 25;
            const angle = Math.random() * 2 * Math.PI;
            const radius = maxOffsetPercent * Math.sqrt(Math.random());
            const xOffset = radius * Math.cos(angle);
            const yOffset = radius * Math.sin(angle);
            const finalX = 50 + xOffset;
            const finalY = 50 + yOffset;
            const randomDuration = (0.7 + Math.random() * 0.8).toFixed(2);

            balls.forEach((ball) => {
                if (ball) {
                    ball.style.transitionDuration = `${randomDuration}s`;
                    ball.style.left = `${finalX}%`;
                    ball.style.top = `${finalY}%`;
                }
            });

            faceContainer.style.transitionDuration = `${randomDuration}s`;
            faceContainer.style.transform = `translate(${xOffset * faceMoveScale}%, ${yOffset * faceMoveScale}%)`;

            const randomDelay = 1000 + Math.random() * 1500;
            idleActionRef.current = setTimeout(scheduleRandomMove, randomDelay);
        };

        if (isIdle) {
            balls.forEach((ball) => ball?.classList.add('idle-transition'));
            faceContainer.classList.add('idle-transition');
            scheduleRandomMove();
        } else {
            balls.forEach((ball) => ball?.classList.remove('idle-transition'));
            faceContainer.classList.remove('idle-transition');
        }

        return () => clearTimeout(idleActionRef.current);
    }, [isIdle]);

    useEffect(() => {
        const balls = [ball1Ref.current, ball2Ref.current];
        const faceContainer = faceRef.current;

        const handleMouseMove = (event) => {
            clearTimeout(idleActionRef.current);
            setIsIdle(false);

            const xRatio = event.clientX / window.innerWidth - 0.5;
            const yRatio = event.clientY / window.innerHeight - 0.5;
            const maxOffset = 1.2;
            const xOffset = Math.max(-maxOffset, Math.min(maxOffset, xRatio * 5));
            const yOffset = Math.max(-maxOffset, Math.min(maxOffset, yRatio * 5));

            balls.forEach((ball) => {
                if (ball) {
                    ball.style.transitionDuration = '0s';
                    ball.style.left = `calc(50% + ${xOffset}vw)`;
                    ball.style.top = `calc(50% + ${yOffset}vw)`;
                    ball.style.transform = 'translate(-50%, -50%)';
                }
            });

            if (faceContainer) {
                faceContainer.style.transitionDuration = '0s';
                faceContainer.style.transform = `translate(${xOffset * faceMoveScale}vw, ${yOffset * faceMoveScale}vw)`;
            }

            idleActionRef.current = setTimeout(() => setIsIdle(true), 2000);
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(idleActionRef.current);
        };
    }, []);

    return (
        <>
            <div className="clouds"></div>
            <div className='body cloud-container' ref={cloudContainerRef}>
                <div className="top">
                    <span>Smiles World</span>
                    <img className='logo' src={logo} alt="" />
                </div>

                <div className="tagline">
                    Explore More. Smile Wider
                </div>

                <main className='earth'>

                    <div className={`face-container ${isBlinking ? 'blinking-face' : ''}`} ref={faceRef}>

                        <div className="eyes">

                            <div className={`eye ${isBlinking ? 'blinking' : ''}`}>
                                <div className="ball" ref={ball1Ref}></div>
                            </div>

                            <div className={`eye ${isBlinking ? 'blinking' : ''}`}>
                                <div className="ball" ref={ball2Ref}></div>
                            </div>
                            
                        </div>

                        <div className="smile">
                            <img src={smile} alt="smile graphic" />
                        </div>
                    </div>

                </main>
                
                {/* <div className="btn"> */}
                    {/* 2. Call the onNavigate function when the button is clicked */}
                    {/* <button onClick={onNavigate}>Book Now</button> */}
                {/* </div> */}
                
            </div>

            <div className="cards" ref={cardsRef}>
                <div className="card subcard">
                    We offer all types of tours international or domestic
                </div>
                <div className="card subcard">
                    We offer all types of tours international or domestic
                </div>
                <div className="card subcard">
                    We offer all types of tours international or domestic
                </div>
                <div className="card subcard">
                    We offer all types of tours international or domestic
                </div>

                <div className="btn">
                    {/* 2. Call the onNavigate function when the button is clicked */}
                    <button onClick={onNavigate}>Book Now</button>
                </div>
            </div>
            
        </>
    );
};

export default LandingPage;