import { useQuery } from '@apollo/client'
import { ExpandMore, RemoveCircleOutline } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Divider, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { FAQ_LIST } from '../../graphql/query'
import Loader from '../../common/loader/Index'
import ErrorMsg from '../../common/ErrorMsg/ErrorMsg'

const FAskedQ = () => {
  const [FAQList, setFAQList] = useState([])
  const match = useMediaQuery('(max-width:600px)')

  const { loading, error } = useQuery(FAQ_LIST, {
    onCompleted: (res) => {
      setFAQList(res.FAQList.edges.map(item => item.node))
    }
  })
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
          {
            loading ? <Loader /> : error ? <ErrorMsg /> :
              FAQList.map((item,id) => (
                <Accordion key={item.id} sx={{ mb: 4, boxShadow: 'none' }} defaultExpanded={id === 0 ? !match : null}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ fontWeight: 'bold', color: 'primary.main', p: 0 }}
                  >
                    {item.question}
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>{item.answer}</AccordionDetails>
                </Accordion>
              ))
          }
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