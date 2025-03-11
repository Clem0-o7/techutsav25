'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import MainLoader from '@/components/MainLoader';
import { motion } from 'framer-motion';
import { IconButton, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import TiltedCard from '@/components/TiltedCard';
import Particles from '@/components/Particles';
import Image from 'next/image';

export default function EventDetails({ params }) {
    const { uniqueName } = params;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState(false);
    const [expanded, setExpanded] = useState(false); // For collapsible sections
    const mobileCheck = useMediaQuery('(min-width: 800px)');
    const router = useRouter();
    const scrollUp = useRef(null);

    // Color theme
    const theme = {
        eerieBlack: '#1C2127',
        berkeleyBlue: '#0B385F',
        uclaBlue: '#3373B0',
        columbiaBlue: '#BED4E9',
        aliceBlue: '#E7F1FB'
    };

    useEffect(() => {
        scrollUp.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch('/api/events/getSingleEvent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uniqueName }),
                });
                
                const result = await response.json();
                
                if (!response.ok || !result) {
                    setError(true);
                    setLoading(false);
                } else {
                    setData(result);
                    setLoading(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        if (uniqueName) {
            fetchEvent();
        }
    }, [uniqueName]);

    if (loading || err) {
        return <MainLoader />;
    }

    if (!data) {
        return <div>Event not found</div>;
    }

    return (
        <div ref={scrollUp} style={{ backgroundColor: 'rgb(235 245 255)' }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`${
                    mobileCheck ? 'h-screen' : 'h-fit'
                } w-full flex items-center justify-evenly ${
                    mobileCheck ? 'overflow-hidden' : 'overflow-y-scroll'
                } ${!mobileCheck ? 'flex-col' : 'flex-row'} min-h-screen`}
            >
                {/* Left Side - Image Section */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className={`${
                        mobileCheck ? 'w-[40%]' : 'w-full'
                    } h-full flex flex-col items-center justify-center relative ${
                        mobileCheck ? 'pt-0' : 'pt-10'
                    }`}
                    style={{ backgroundColor: 'rgb(235 245 255)' }}
                >
                    <div className='absolute inset-0 z-0'>
                        <Particles
                            particleCount={200}
                            particleSpread={10}
                            speed={0.1}
                            particleColors={['#ffffff', '#a2d2ff', '#bde0fe']} // Customize particle colors
                            moveParticlesOnHover={true}
                            particleHoverFactor={0.1}
                            alphaParticles={true}
                            particleBaseSize={200}
                            sizeRandomness={1}
                            cameraDistance={20}
                            disableRotation={false}
                            className='w-full h-full'
                        />
                    </div>
                    
                    {!mobileCheck ? (
                        <div className="relative w-[80%] rounded-lg shadow-lg mb-10 hover:scale-105 z-10 transition-transform duration-300">
                            <Image
                                src="https://th.bing.com/th/id/R.918e4e1862b90b9298780a86de85bc00?rik=8KmCajyGGoiwdg&riu=http%3a%2f%2fstatic.dnaindia.com%2fsites%2fdefault%2ffiles%2f2015%2f08%2f11%2f364392-sundar-pichai-3-afp-crop.jpg&ehk=dt20eQYfLB5FdaFGHEY%2fJCZoOIJaUIyjFwnYgLPivn8%3d&risl=&pid=ImgRaw&r=0"
                                alt="Sundar Pichai"
                                width={500}
                                height={300}
                                className="w-full h-auto object-contain rounded-lg"
                                priority
                            />
                        </div>
                    ) : (
                        <TiltedCard
                            imageSrc="https://th.bing.com/th/id/R.918e4e1862b90b9298780a86de85bc00?rik=8KmCajyGGoiwdg&riu=http%3a%2f%2fstatic.dnaindia.com%2fsites%2fdefault%2ffiles%2f2015%2f08%2f11%2f364392-sundar-pichai-3-afp-crop.jpg&ehk=dt20eQYfLB5FdaFGHEY%2fJCZoOIJaUIyjFwnYgLPivn8%3d&risl=&pid=ImgRaw&r=0"
                            altText="Sundar Pichai"
                            captionText=""
                            containerHeight="70%"
                            containerWidth="70%"
                            imageHeight="100%"
                            imageWidth="100%"
                            rotateAmplitude={12}
                            scaleOnHover={1.1}
                            showMobileWarning={false}
                            showTooltip={false}
                            displayOverlayContent={false}
                        />
                    )}
                </motion.div>

                {/* Right Side - Event Details Section */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className={`${mobileCheck ? 'w-[60%]' : 'w-full'} ${
                        mobileCheck ? 'h-screen' : 'h-fit'
                    } overflow-y-scroll ${!mobileCheck ? 'p-8' : 'px-12 pb-12'}`}
                    style={{
                        background: theme.columbiaBlue
                    }}
                >
                    {/* Header */}
                    <div
                        className="w-full flex items-center justify-between sticky top-0 p-4"
                        style={{ backgroundColor: theme.columbiaBlue }}
                    >
                        <Typography
                            fontSize={mobileCheck ? '60px' : '40px'}
                            fontWeight="bold"
                            style={{ color: theme.berkeleyBlue }}
                        >
                            {data.eventName}
                        </Typography>
                        {mobileCheck && (
                            <motion.button
                                onClick={() => router.back()}
                                className="px-7 py-1 rounded-md hover:text-white transition-all"
                                whileHover={{ scale: 1.1 }}
                                style={{
                                    border: '2px solid #3373B0',
                                    color: theme.berkeleyBlue,
                                    backgroundColor: theme.aliceBlue
                                }}
                            >
                                Back
                            </motion.button>
                        )}
                    </div>

                    {/* Event Details */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Collapsible Section */}
                        <div
                            className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            style={{ backgroundColor: theme.aliceBlue }}
                        >
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => setExpanded(!expanded)}
                            >
                                <Typography
                                    fontSize={'20px'}
                                    fontWeight={'bold'}
                                    style={{ color: theme.berkeleyBlue }}
                                >
                                    Event Overview
                                </Typography>
                                <IconButton>
                                    {expanded ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </div>
                            <Collapse in={expanded} style={{ color: theme.berkeleyBlue }}>
                                <Typography marginTop={'10px'} fontSize={'18px'}>
                                    <strong>Department:</strong> {data.department}
                                </Typography>
                                <Typography marginTop={'10px'} fontSize={'18px'}>
                                    <strong>Abstract:</strong> {data.eventAbstract}
                                </Typography>
                                <Typography marginTop={'10px'} fontSize={'18px'}>
                                    <strong>Timing:</strong> {data.eventTiming}
                                </Typography>
                                {data.incharge && data.inchargeNumber && (
                                    <Typography marginTop={'10px'} fontSize={'18px'}>
                                        <strong>Queries:</strong> {data.incharge} - {data.inchargeNumber}
                                    </Typography>
                                )}
                            </Collapse>
                        </div>

                        {/* Description Section */}
                        <div
                            className="p-6 rounded-lg shadow-lg hover:shadow-xl text-justify transition-shadow duration-300"
                            style={{
                                backgroundColor: theme.aliceBlue,
                                color: theme.berkeleyBlue
                            }}
                        >
                            <Typography fontSize={'24px'} fontWeight={'bold'}>
                                Description
                            </Typography>
                            <Typography
                                marginTop={'24px'}
                                fontSize={'18px'}
                                className="whitespace-pre-wrap"
                            >
                                {data.eventDesp}
                            </Typography>
                        </div>

                        {/* Additional Interactive Elements */}
                        <div
                            className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            style={{
                                backgroundColor: theme.aliceBlue,
                                color: theme.berkeleyBlue
                            }}
                        >
                            <Typography fontSize={'20px'} fontWeight={'bold'}>
                                Additional Information:
                            </Typography>
                            <Typography marginTop={'10px'}>
                                This event is part of a series of futuristic tech talks aimed at
                                inspiring the next generation of innovators.
                            </Typography>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
