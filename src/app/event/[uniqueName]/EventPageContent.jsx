"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled, { ThemeProvider } from "styled-components";

const theme = {
  eerieBlack: "#1C2127",
  berkeleyBlue: "#0B385F",
  uclaBlue: "#3373B0",
  columbiaBlue: "#BED4E9",
  aliceBlue: "#E7F1FB",
};

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
  background-color: ${theme.aliceBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  padding: 2rem;

  @media (min-width: 800px) {
    width: 40%;
    height: 100vh;
  }

  img {
    max-width: 90%;
    height: auto;
    border-radius: 12px;
    object-fit: contain;
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
    padding: 3rem;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: ${theme.berkeleyBlue};
  margin-bottom: 2rem;
`;

const DetailCard = styled.div`
  background: #fefefe;
  border: 1px solid ${theme.columbiaBlue};
  border-radius: 10px;
  padding: 1rem 1.2rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  font-size: 18px;
  color: ${theme.eerieBlack};
  line-height: 1.6;
  white-space: pre-line;

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
  border: none;
  border-radius: 8px;
  cursor: pointer;
  z-index: 10;
  font-weight: 500;

  &:hover {
    background: ${theme.berkeleyBlue};
  }
`;

export default function EventPageContent({ event }) {
  const router = useRouter();
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const baseUrl = "https://clement2004.blob.core.windows.net/techutsav25";

  const imageUrl = `${baseUrl}/${event.uniqueName.toLowerCase()}.jpg`;

  return (
    <ThemeProvider theme={theme}>
      <Container ref={scrollRef}>
        <Wrapper>
          <ImageSection>
            <BackButton onClick={() => router.back()}>⬅ Back</BackButton>

            <Image
              src={imageUrl}
              alt={event.eventName}
              width={600}
              height={600}
            />
          </ImageSection>

          <DetailsSection>
            <Title>{event.eventName} 🎉</Title>

            {event.department && (
              <DetailCard>
                <span className="label">📍 Department:</span>
                {event.department}
              </DetailCard>
            )}

            {event.eventTiming && (
              <DetailCard>
                <span className="label">🕒 Timing:</span>
                {event.eventTiming}
              </DetailCard>
            )}

            {event.eventAbstract && (
              <DetailCard>
                <span className="label">📝 Summary:</span>
                {event.eventAbstract}
              </DetailCard>
            )}

            {(event.incharge || event.inchargeNumber) && (
              <DetailCard>
                <span className="label">📞 Queries:</span>
                {event.incharge} {event.inchargeNumber}
              </DetailCard>
            )}

            {event.eventDesp && (
              <DetailCard>
                <span className="label">📰 Description:</span>
                {event.eventDesp}
              </DetailCard>
            )}
          </DetailsSection>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}
