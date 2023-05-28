import { Link, Typography } from '@mui/material';
import { useState, useRef, useEffect } from 'react';

const TextTypographie = ({ text }) => {
    const [showMore, setShowMore] = useState(false);
    const textRef = useRef(null);
    const divRef = useRef(null);
    const words = text.split(' ');
    useEffect(() => {
        if (textRef.current.clientHeight > 3 * parseInt(getComputedStyle(textRef.current).lineHeight)) {
            setShowMore(false);
        }
    }, [text]);
    useEffect(() => {
        const divElement = divRef.current;
        const lineHeight = parseInt(window.getComputedStyle(divElement).lineHeight);
        const contentHeight = divElement.clientHeight;
        const numOfLines = Math.ceil(contentHeight / lineHeight);
        if(numOfLines < 2){
            setShowMore(true);
        }else if(numOfLines >= 2){
            setShowMore(false);
        }
    }, []);
    const handleShowMore = () => {
        setShowMore(true);
    };

    return (
        <div>
            <Typography
                variant='p'
                ref={textRef}
                style={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: showMore ? 'unset' : 3,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: '1.7',
                }}
            >
                <div
                    ref={divRef}
                >

                    {
                          

                          words.map((word, index) => {
                            if (word.startsWith('#')) {
                              return (
                                <span key={index} className="hashtag">
                                  {word}{' '}
                                </span>
                              );
                            }
                        
                            return <span key={index}>{word} </span>;
                          })
                    }
                </div>
            </Typography>
            {!showMore && <Link sx={{ cursor: 'pointer' }} onClick={handleShowMore}>Show More</Link>}
        </div>
    );
};

export default TextTypographie;