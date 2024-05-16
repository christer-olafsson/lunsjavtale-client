import { ExpandMore, RemoveCircleOutline } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Divider, Stack, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

const FAskedQ = () => {
  const match = useMediaQuery('(max-width:600px)')
  return (
    <Container maxWidth='lg' sx={{ display: 'flex', flexDirection: 'column', my: 10 }}>
      <Box sx={{
        alignSelf: 'center',
        maxWidth: '288px',
        bgcolor: 'light.main',
        py: '12px', px: '24px',
        borderRadius: '8px', mb: 2
      }} >
        Se om vi leverer til deg
      </Box>
      <Typography sx={{ fontSize: { xs: '24px', md: '32px' }, fontWeight: 600, alignSelf: 'center', mb: 2 }}>Ofte stilte spørsmål</Typography>
      <Typography alignSelf='center'>Lunsjavtalen er en digital kantine som gjør lunsjen enklere (og smartere)!</Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 0, md: 5 }} mt={{ xs: 2, md: 10 }}>
        <Box sx={{ flex: 1 }}>
          <Accordion sx={{ mb: 4, boxShadow: 'none' }} defaultExpanded={!match}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ fontWeight: 'bold', color: 'primary.main', p: 0 }}
            >
              Firmaavtale - Administrator
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
            Er du en bedriftsadministrator og ønsker å administrere bedriftens profil? Logg inn på din profil > velg firmaavtale i den blå sirkelen i høyre hjørne. / Legg til ansatte: Firmaavtale > innstillinger > ansatte i avtalen. Lim inn e-postadressen til den ansatte i feltet nederst > legg til. / Endre bestillinger for en eller flere av de ansatte: Firmaavtale > innstillinger > ansatte i avtalen > velg den eller de som ikke skal spise lunsj > velg din handling og dato fra - til > bekreft. Her kan du også si opp abonnement for ansatte som har sluttet eller skal være borte i en lengre periode.
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mb: 4, boxShadow: 'none' }} >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ fontWeight: 'bold', color: 'primary.main', p: 0 }}
            >
              Betaling - 100% spons eller splitt betaling mellom bedrift og ansatt?
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              Ønsker dere å splitte lunsjkostnaden mellom bedrift og ansatt? Ikke noe problem! Dette er integrert i løsningen vår, og vi skreddersyr betalingen etter ønsket splitt. / Ansatt med delvis spons: Når du oppretter profilen din må du registrere et gyldig betalingskort. Kortinformasjonen er det kun du som kan se. Vi belaster kortet for ukens lunsjer hver helg. Dersom du ikke hadde dekning, eller har fått nytt kort og glemt å oppdatere vil du få en faktura fra oss. Vi sender ut faktura via Svea som krever bostedsadresse til alle vi sender faktura til. Derfor er det viktig at du fyller ut adressefeltet når du legger inn betalingskort. Fakturagebyr må påberegnes ved kontinuerlig fakturering.
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mb: 4, boxShadow: 'none' }} >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ fontWeight: 'bold', color: 'primary.main', p: 0 }}
            >
              Bedriftsavtale - Administrator
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              Er du bedriftsadministrator og vil administrere bedriftens profil? Logg inn i profilen din > velg bedriftsavtale i den blå sirkelen i høyre hjørne. / Legge til ansatte: Bedriftsavtale > innstillinger > ansatte i avtalen. Lim inn mailadressen til den ansatte i feltet nederst > legg til. / Endre bestillinger for én eller flere av de ansatte: Bedriftsavtale > innstillinger > ansatte i avtalen > velg den eller de som ikke skal ha lunsj > velg din handling og dato fra - til > bekreft. Her kan du også avslutte abonnement for ansatte som har sluttet eller skal være borte i en lengre periode.
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{boxShadow: 'none' }} >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ fontWeight: 'bold', color: 'primary.main', p: 0 }}
            >
              Bedriftsavtale - Bedriftsbestilling
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              Bestilling til bedriften legger du inn i Lunsjkalenderen. Velg dagen du vil bestille, og legg inn riktig antall av produktene du ønsker. Trykk lagre nederst når du er ferdig! / Allergitilpasset: Vi tilpasser dagens salat, vegetar og vegansk til registrerte allergier. Velg dagen du vil bestille > rull ned til bunnen av siden > trykk på legg til allergitilpasset > velg salat, vegetar eller vegansk > velg allergien(e) > legg til. Er det flere som skal ha tilpasset salat? Da gjør du det samme for hver person som trenger tilpasset.
            </AccordionDetails>
          </Accordion>
        </Box>
        {/* <Box sx={{flex:1}}>
            <Accordion sx={{mb:4,boxShadow:'none'}} defaultExpanded={!match}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{fontWeight:'bold', color:'primary.main',p:0}}
              >
                Bedriftsavtale - Administrator
              </AccordionSummary>
              <AccordionDetails sx={{p:0}}>
              Er du bedriftsadministrator og vil administrere bedriftens profil? Logg inn i profilen din > velg bedriftsavtale i den blå sirkelen i høyre hjørne. / Legge til ansatte: Bedriftsavtale > innstillinger > ansatte i avtalen. Lim inn mailadressen til den ansatte i feltet nederst > legg til. / Endre bestillinger for én eller flere av de ansatte: Bedriftsavtale > innstillinger > ansatte i avtalen > velg den eller de som ikke skal ha lunsj > velg din handling og dato fra - til > bekreft. Her kan du også avslutte abonnement for ansatte som har sluttet eller skal være borte i en lengre periode.
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{mt:4,boxShadow:'none'}} >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{fontWeight:'bold', color:'primary.main',p:0}}
              >
                Bedriftsavtale - Bedriftsbestilling
              </AccordionSummary>
              <AccordionDetails sx={{p:0}}>
              Bestilling til bedriften legger du inn i Lunsjkalenderen. Velg dagen du vil bestille, og legg inn riktig antall av produktene du ønsker. Trykk lagre nederst når du er ferdig! / Allergitilpasset: Vi tilpasser dagens salat, vegetar og vegansk til registrerte allergier. Velg dagen du vil bestille > rull ned til bunnen av siden > trykk på legg til allergitilpasset > velg salat, vegetar eller vegansk > velg allergien(e) > legg til. Er det flere som skal ha tilpasset salat? Da gjør du det samme for hver person som trenger tilpasset.
              </AccordionDetails>
            </Accordion>
          </Box> */}
      </Stack>

    </Container>
  )
}

export default FAskedQ