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
      <Typography alignSelf='center'>Lunsjkollektivet er en digital kantine som gjør lunsj enklere (og smartere)!</Typography>

      <Stack direction={{xs:'column',md:'row'}} gap={{xs:0,md:5}} mt={{xs:2,md:10}}>
        <Box sx={{flex:1}}>
          <Accordion sx={{mb:4,boxShadow:'none'}} defaultExpanded={match}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{fontWeight:'bold', color:'primary.main',p:0}}
            >
              Bedriftsavtale - Administrator
            </AccordionSummary>
            <AccordionDetails sx={{p:0}}>
            Er du en bedriftsadministrator og ønsker å administrere bedriftens profil? Logg inn på profilen din > velg bedriftsavtale i den blå sirkelen i høyre hjørne. / Legg til ansatte: Bedriftsavtale > innstillinger > ansatte i avtalen. Lim inn e-postadressen til den ansatte i feltet nederst > legg til. / Endre bestillinger for én eller flere av de ansatte: Bedriftsavtale > innstillinger > ansatte i avtalen > velg den eller de som ikke skal ha lunsj > velg handlingen din og datoen fra - til > bekreft. Her kan du også avslutte abonnementer for ansatte som har sluttet eller skal være borte i en lengre periode.
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{mt:4,boxShadow:'none'}} defaultExpanded={!match}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{fontWeight:'bold', color:'primary.main',p:0}}
            >
              Betaling - 100% spons eller splitt betaling mellom bedrift og ansatt?
            </AccordionSummary>
            <AccordionDetails sx={{p:0}}>
            Ønsker dere å dele lunsjkostnadene mellom bedrift og ansatt? Ikke noe problem! Dette er integrert i løsningen vår, og vi tilpasser betalingen etter ønsket delt beløp. / Ansatt med delvis sponsing: Når du oppretter profilen din, må du registrere et gyldig betalingskort. Kortinformasjonen er kun synlig for deg. Vi belaster kortet ditt for ukens lunsjer hver helg. Hvis du ikke har dekning, eller har fått et nytt kort og glemt å oppdatere det, vil du motta en faktura fra oss. Vi sender faktura via Svea, som krever bostedsadressen til alle mottakere av fakturaen. Derfor er det viktig at du fyller ut adressefeltet når du legger inn betalingskortet. Det kan påløpe faktureringsgebyr ved kontinuerlig fakturering.
            </AccordionDetails>
          </Accordion>
        </Box>
          <Box sx={{flex:1}}>
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
              Er du bedriftsadministrator og vil administrere bedriftens profil? Logg inn på profilen din > velg bedriftsavtale i den blå sirkelen i høyre hjørne. / Legg til ansatte: Bedriftsavtale > innstillinger > ansatte i avtalen. Lim inn e-postadressen til den ansatte i feltet nederst > legg til. / Endre bestillinger for én eller flere av de ansatte: Bedriftsavtale > innstillinger > ansatte i avtalen > velg den eller de som ikke skal ha lunsj > velg handlingen din og datoen fra - til > bekreft. Her kan du også avslutte abonnementer for ansatte som har sluttet eller skal være borte i en lengre periode.
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
              Bestillinger for bedriften legger du inn i Lunsjkalenderen. Velg dagen du vil bestille, og legg inn riktig antall av produktene du ønsker. Trykk på lagre nederst når du er ferdig! / Allergitilpasset: Vi tilpasser dagens salat, vegetar og vegansk til registrerte allergier. Velg dagen du vil bestille > rull ned til bunnen av siden > trykk på legg til allergitilpasset > velg salat, vegetar eller vegansk > velg allergien(e) > legg til. Hvis flere personer trenger tilpasset salat, gjør du det samme for hver enkelt.
              </AccordionDetails>
            </Accordion>
          </Box>
      </Stack>

    </Container>
  )
}

export default FAskedQ
