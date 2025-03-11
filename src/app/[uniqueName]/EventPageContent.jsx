"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styled, { ThemeProvider } from "styled-components";

// Define our theme
const theme = {
  eerieBlack: "#1C2127",
  berkeleyBlue: "#0B385F",
  uclaBlue: "#3373B0",
  columbiaBlue: "#BED4E9",
  aliceBlue: "#E7F1FB",
};

// Styled Components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

const ImageSection = styled.div`
  background-color: #ebebeb;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  @media (min-width: 800px) {
    width: 40%;
    height: 100vh;
  }
  img {
    border-radius: 12px;
    object-fit: contain;
    max-width: 90%;
    height: auto;
  }
`;

const DetailsSection = styled.div`
  width: 100%;
  padding: 2rem;
  overflow-y: auto;
  background: white;
  @media (min-width: 800px) {
    width: 60%;
    height: 100vh;
    padding: 2rem 3rem;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: ${theme.berkeleyBlue};
  margin-top: 20px;
  margin-bottom: 1rem;
`;

// DetailCard wraps each detail in a card-like container
const DetailCard = styled.div`
  background: #fefefe;
  border: 1px solid ${theme.columbiaBlue};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  font-size: 20px;
  color: ${theme.eerieBlack};
  line-height: 1.4;
  & > span.label {
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background: ${theme.uclaBlue};
  color: white;
  border: 2px solid ${theme.berkeleyBlue};
  border-radius: 8px;
  cursor: pointer;
  z-index: 10;
  &:hover {
    background: ${theme.berkeleyBlue};
  }
`;

export default function EventPageContent({ event }) {
  const router = useRouter();
  const scrollRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Construct image URLs using the event's uniqueName
  const baseUrl = "https://clement2004.blob.core.windows.net/techutsav25";
  const jpgUrl = `${baseUrl}/${event.uniqueName}.jpg`;
  const pngUrl = `${baseUrl}/${event.uniqueName}.png`;

  // Start with JPG; if it fails, switch to PNG, else fallback to placeholder.
  const handleImageError = (e) => {
    if (e.currentTarget.src === jpgUrl) {
      e.currentTarget.src = pngUrl;
    } else {
      e.currentTarget.src = "/images/placeholder.png";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container ref={scrollRef}>
        <Wrapper>
          <ImageSection>
            <BackButton onClick={() => router.back()}>⬅ Back</BackButton>
            <Image
              src={jpgUrl}
              alt={event.eventName}
              width={600}
              height={600}
              style={{ maxWidth: "100%", height: "auto", borderRadius: "12px" }}
              onError={handleImageError}
            />
          </ImageSection>
          <DetailsSection>
            <Title>{event.eventName} 🎉</Title>
            <DetailCard>
              <span className="label">📍 Department:</span> {event.department}
            </DetailCard>
            <DetailCard>
              <span className="label">🕒 Timing:</span> {event.eventTiming}
            </DetailCard>
            <DetailCard>
              <span className="label">📝 Summary:</span> {event.eventAbstract}
            </DetailCard>
            <DetailCard>
              <span className="label">📞 Queries:</span> {event.incharge} - {event.inchargeNumber}
            </DetailCard>
            <DetailCard>
              <span className="label">📰 Description:</span> {event.eventDesp}
            </DetailCard>
            <DetailCard>
              <span className="label">⭐ Flagship Event:</span> {event.flagship ? "Yes" : "No"}
            </DetailCard>
          </DetailsSection>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}
