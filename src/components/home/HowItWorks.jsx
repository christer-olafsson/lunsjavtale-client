import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CardMedia, Container } from '@mui/material';
import { SlideAnimation } from '../animation/Animation';

const HowItWorks = () => {
  const images = [
    '/howItWorks (1).png',
    '/howItWorks (2).png',
    '/howItWorks (3).png'
  ];

  const texts = [
    {
      t1: '1. Lag en profil',
      t2_part1: 'Å registrere seg hos oss er superenkelt og helt uforpliktende. Med en utfylt bedriftsprofil får du tilgang til bestillingssystem og menyer.',
      t2_part2: 'Når du har opprettet profilen din, kontakter vi deg for å gi deg en rask introduksjon, og svarer gjerne på spørsmålene dine.'
    },
    {
      t1: '2. Inviter ansatte',
      t2_part1: 'Det går raskt å komme i gang uansett hvor mange dere er. Vi vet hvor viktig det er både for den som administrerer og den som skal få noe nytt «kastet» på seg at det ikke føles som en «belastning».',
      t2_part2: 'Vi har laget et system som gjør at uansett hvor stor eller liten bedriften din er, er det like enkelt å komme i gang.'
    },
    {
      t1: '3. Levering',
      t2_part1: 'Alle ansatte får en stressfri og god lunsj som er god for kroppen, levert på døra innen kl 11:15 hver dag.',
      t2_part2: 'Bedriften sparer tid på administrasjon og får en fleksibel lunsjordning, hvor du selvfølgelig ikke betaler for lunsj de dagene som er avlyst. Ha en fin lunsj!'
    },
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const handleMouseEnter = (index) => {
    setFade(true);
    setActiveImageIndex(index);
    setIsHovered(true);
    setTimeout(() => setFade(false), 500);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Container maxWidth='lg'>
      <SlideAnimation direction='up'>
        <Typography sx={{
          mb: 4, fontSize: { xs: '44px', md: '64px' }, lineHeight: { xs: '50px', md: '70px' }, fontFamily: 'Forum'
        }}>
          Hvordan funker det?
        </Typography>
      </SlideAnimation>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4,
          borderRadius: '20px',
          overflow: 'hidden',
          maxWidth: '100%',
          height: { xs: '200px', sm: '300px', md: '570px' },
        }}
      >
        <CardMedia
          component="img"
          image={images[activeImageIndex]}
          alt="How it works step"
          sx={{
            width: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.5s ease-in-out',
            opacity: fade ? 0 : 1,
          }}
        />
      </Box>

      <Grid container spacing={2} sx={{ maxWidth: 'lg', mx: 'auto' }}>
        {
          texts.map((t, i) => (
            <Grid
              sx={{ color: i === activeImageIndex ? 'grayn' : 'lightgray', transition: 'color 0.5s ease-in-out', cursor: 'pointer' }}
              key={i}
              item xs={12} sm={4}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              <Typography sx={{ fontFamily: 'Forum', fontSize: '32px', mb: 2 }}>
                {t.t1}
              </Typography>
              <Typography mb={2}>
                {t.t2_part1}
              </Typography>
              <Typography>
                {t.t2_part2}
              </Typography>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
};

export default HowItWorks;
