"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const Card = styled.div`
  position: relative;
  overflow: hidden;
  border: 2px solid #3373B0;
  border-radius: 16px;
  padding: 1.5rem;
  background: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 700px;
  margin: 2rem auto;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  /* Spotlight effect using a pseudo-element */
  &::before {
    content: "";
    position: absolute;
    top: var(--mouse-y, 50%);
    left: var(--mouse-x, 50%);
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 80%);
    transition: width 0.3s ease, height 0.3s ease;
    pointer-events: none;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }
`;

const BannerImageWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #0B385F;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #1C2127;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  background: #3373B0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #0B385F;
  }
`;

const Flagship = ({ uniqueName, eventName, eventDescription, image }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Card
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BannerImageWrapper>
        <Image
          src={image}
          alt={eventName}
          width={700}
          height={400}
          style={{ borderRadius: "12px" }}
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder.png";
          }}
        />
      </BannerImageWrapper>
      <Title>{eventName} 🎉</Title>
      <Description>{eventDescription}</Description>
      <Link href={`/${uniqueName}`} passHref legacyBehavior>
        <Button>See More ➡</Button>
      </Link>
    </Card>
  );
};

export default Flagship;
