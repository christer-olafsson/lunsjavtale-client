import { Box, Container, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Tabs, Typography, tabsClasses, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import PropTypes from 'prop-types';
import CButton from "../../common/CButton/CButton";
import { Link } from "react-router-dom";
import { FadeAnimation, SlideAnimation } from "../animation/Animation";
import { ArrowOutward, CheckCircle } from "@mui/icons-material";

const TabItem = styled(Tab)(({ theme }) => ({
  position: "relative",
  // borderRadius: "30px",
  textAlign: "center",
  textTransform: 'none',
  transition: "all .5s",
  padding: "10px 15px",
  color: "#555555",
  height: "auto",
  // margin: "10px 0",
  float: "none",
  fontSize: "14px",
  fontWeight: "500",
  [theme.breakpoints.up("md")]: {
    minWidth: 120,
  },
  [`&.${tabClasses.selected}`]: {
    // color: "#FFFFFF",
    // backgroundColor: theme.palette.secondary.main,
    // border: `1px solid gray`,

  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function WhoAreYou() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Container maxWidth='lg' sx={{ my: { xs: 10, md: 15 } }}>
      <Typography sx={{
        fontSize: { xs: '22px', md: '64px' },
        fontWeight: 400,
        textAlign: 'center',
        fontFamily: 'Forum'
      }}>
        <FadeAnimation damping={.1} cascade={'cascade'}>
          Hvem er du?
        </FadeAnimation>
      </Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: 500, textAlign: 'center', mb: 6 }}>
        <FadeAnimation damping={.05} cascade={'cascade'}>
          lunsjavtale gir deg kantinen rett i lomma
        </FadeAnimation>
      </Typography>
      <Divider />
      <Stack direction='row' my={1} sx={{
        justifyContent: 'center',
      }}>
        <Tabs
          value={tabIndex}
          onChange={(e, index) => setTabIndex(index)}
          sx={{
            width: "fit-content",
            // border: `1px solid ${theme.palette.secondary.main}`,
            // px: 2,
            borderRadius: '50px',
            [`& .${tabsClasses.indicator}`]: {
              display: "none",
            },
          }}
        >
          <TabItem style={{ borderRadius: "30px", marginRight: '10px' }} disableRipple label={"Sjefen"} />
          <TabItem style={{ borderRadius: "30px", marginRight: '10px' }} disableRipple label={"Ansatt"} />
          {/* <TabItem style={{ borderRadius: "30px" }} disableRipple label={"Lunsjsjef"} /> */}
        </Tabs>
      </Stack>
      <Divider sx={{ mb: 6 }} />

      <CustomTabPanel value={tabIndex} index={0}>
        <Stack direction={{ xs: 'column', lg: 'row' }} gap={6} alignItems='center' >
          <Stack alignItems={{ md: 'center', lg: 'start', }} justifyContent='center' sx={{
            flex: 1,
            border: '1px solid lightgray',
            p: 3, borderRadius: '16px'
          }}>
            {/* <SlideAnimation direction='up'>
              <Typography color='primary' sx={{ fontSize: '18px', fontWeight: 700 }}>Sjefen</Typography>
            </SlideAnimation> */}
            <SlideAnimation direction='up' delay={200}>
              <Typography sx={{ fontSize: '48px', lineHeight: '50px', mb: 2, fontFamily: 'Forum' }}>Kutt kostnader og få mer for dine penger.</Typography>
              {/* <Typography sx={{ fontSize: '32px', fontWeight: 600, mb: 2 }}>Kutt kostnader  <br style={{display:isMobile ? 'block' : 'none'}} /> og få mer for <br /> dine Penger.</Typography> */}
            </SlideAnimation>
            <SlideAnimation direction='up' delay={400}>
              <Typography sx={{ maxWidth: '700px' }} mb={1}>Vi har ingen driftskostnader og du betaler selvfølgelig ingenting for lunsj som ingen skal spise. Kundene våre kutter i gjennomsnitt 25 % av lunsjkostnadene sine!</Typography>
            </SlideAnimation>
            <List>
              {
                [
                  'Oppdag næringsrike måltidsalternativer skreddersydd for dine smakspreferanser.',
                  'Varierte måltider hver uke. Dine ansatte kan selv velge hva de ønsker å spise.',
                  'Fordel enkelt lunsjbidraget mellom bedriften og den ansatte.',
                  'Få tilgang til et bredt utvalg deilige og sunne måltider.',
                ].map((text, id) => (
                  <FadeAnimation key={id} damping={.1} cascade={'cascade'} delay={300 * id}>
                    <ListItem sx={{ mb: 2 }} disablePadding >
                      <ListItemIcon>
                        <CheckCircle color='primary' />
                      </ListItemIcon>
                      <ListItemText sx={{ ml: -3 }}>
                        <Typography>{text}</Typography>
                      </ListItemText>
                    </ListItem>
                  </FadeAnimation>
                ))
              }
            </List>
            <SlideAnimation direction='up' delay={400}>
              <Link to='/search'>
                <CButton endIcon={<ArrowOutward />} variant='outlined'>Bli kunde</CButton>
              </Link>
            </SlideAnimation>
          </Stack>
          <Stack sx={{
            flex: 1,
            gap: 2,
            alignItems: { xs: '', md: 'center' }
          }}>
            <SlideAnimation direction='right'>
              <Box sx={{
                width: { xs: '100%', md: '713px' },
                height: { xs: '404px', md: '416px' },
              }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} src="/dish1.jpeg" alt="" />
              </Box>
            </SlideAnimation>
            <Stack direction='row' gap={2} justifyContent={{ xs: 'center', sm: 'start', lg: 'space-between' }}>
              <SlideAnimation direction='left'>
                <Box sx={{
                  width: { xs: '106px', md: '221px' },
                  height: '180px'
                }}>
                  <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} src="/dish2.jpeg" alt="" />
                </Box>
              </SlideAnimation>
              <SlideAnimation direction='left' delay={100}>
                <Box sx={{
                  width: { xs: '106px', md: '221px' },
                  height: '180px'
                }}>
                  <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} src="/dish3.jpeg" alt="" />
                </Box>
              </SlideAnimation>
              <SlideAnimation direction='left' delay={200}>
                <Box sx={{
                  width: { xs: '106px', md: '221px' },
                  height: '180px'
                }}>
                  <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} src="/dish4.jpeg" alt="" />
                </Box>
              </SlideAnimation>
            </Stack>
          </Stack>
        </Stack>
      </CustomTabPanel>

      <CustomTabPanel value={tabIndex} index={1}>
        <Stack direction={{ xs: 'column-reverse', md: 'row' }} gap={6} >
          <Stack sx={{
            flex: 1,
            gap: 2,
            alignItems: { xs: '', md: 'center' },
          }}>
            <SlideAnimation direction='left'>
              <Box sx={{
                width: { xs: '100%', lg: '713px' },
                height: { xs: '404px', lg: '580px' },
              }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} src="/image 7.png" alt="" />
              </Box>
            </SlideAnimation>
          </Stack>
          <Stack alignItems={{ md: 'center', lg: 'start', }} justifyContent='center' sx={{
            flex: 1,
            border: '1px solid lightgray',
            p: 3, borderRadius: '16px'
          }}>
            {/* <SlideAnimation direction='up'>
              <Typography color='primary' sx={{ fontSize: '18px', fontWeight: 700 }}>Ansatt</Typography>
            </SlideAnimation> */}
            <SlideAnimation direction='up' delay={100}>
              <Typography sx={{ fontSize: '48px', lineHeight: '50px', mb: 2, fontFamily: 'Forum' }}>Velg mellom ulike lunsjretter hver dag</Typography>
            </SlideAnimation>
            <SlideAnimation direction='up' delay={200}>
              <Typography mb={1}>Her er det garantert noe alle liker – og nye retter på menyen hver eneste dag! Vi kan ikke fikse alt, men vi kan arrangere en stressfri pause og sørge for at du får mat som ikke bare er bra, men også bra for kroppen.</Typography>
            </SlideAnimation>
            <List>
              {
                [
                  'Oppdag næringsrike måltidsalternativer skreddersydd for dine smakspreferanser.',
                  'Velg hva du vil spise de dagene du selv ønsker lunsj fra oss.',
                  'Stort utvalg av varmretter, salater, brødmat, yoghurt, smoothie, snacks og drikkevarer',
                  'Levert til din arbeidsplass hver dag før kl. 11.00.',
                ].map((text, id) => (
                  <FadeAnimation key={id} damping={.1} cascade={'cascade'} delay={300 * id}>
                    <ListItem sx={{ mb: 1 }} disablePadding >
                      <ListItemIcon>
                        <CheckCircle color='primary' />
                      </ListItemIcon>
                      <ListItemText sx={{ ml: -3 }}>
                        <Typography>{text}</Typography>
                      </ListItemText>
                    </ListItem>
                  </FadeAnimation>
                ))
              }
            </List>
            <Stack direction='row ' gap={2}>
              <SlideAnimation direction='up' delay={200}>
                <Link to='/search'>
                  <CButton endIcon={<ArrowOutward />} variant='outlined'>Bli kunde</CButton>
                </Link>
              </SlideAnimation>
              {/* <CButton variant='outlined' style={{ height: { xs: '45px', md: '56px' }, width: '136px' }}>Tips sjefen</CButton> */}
            </Stack>
          </Stack>
        </Stack>
      </CustomTabPanel>

      {/* <CustomTabPanel value={tabIndex} index={2}>
        <Stack direction={{ sm: 'column', md: 'row' }} gap={6} >
          <Stack alignItems={{ md: 'center', lg: 'start', }} justifyContent='center' sx={{
            flex: 1,
            border: '1px solid lightgray',
            p: 3, borderRadius: '16px'
          }}>
            <SlideAnimation direction='up' delay={100}>
              <Typography sx={{ fontSize: '48px', lineHeight: '50px', mb: 2, fontFamily: 'Forum' }}>Bruker du unødvendig tid på å organisere lunsj for alle?</Typography>
            </SlideAnimation>
            <SlideAnimation direction='up' delay={200}>
              <Typography mb={1}>Fleksibel arbeidshverdag krever fleksible løsninger. La ansatte selv holde orden på hva de skal spise og når de har hjemmekontor.</Typography>
            </SlideAnimation>
            <FadeAnimation delay={300}>
              <List>
                <ListItem sx={{ mb: 1 }} disablePadding>
                  <ListItemIcon>
                    <CheckCircle color='primary' />
                  </ListItemIcon>
                  <ListItemText sx={{ ml: -3 }}>
                    <Typography >Stressfri teknologi lar deg administrere ansatte, ha full kostnadskontroll og bestemme hvor mye selskapet skal betale.</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ mb: 2 }} disablePadding>
                  <ListItemIcon>
                    <CheckCircle color='primary' />
                  </ListItemIcon>
                  <ListItemText sx={{ ml: -3 }}>
                    <Typography >Vi fikser til og med lønnstrekk og har full kontroll på skattereglene😇</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ mb: 2 }} disablePadding>
                  <ListItemIcon>
                    <CheckCircle color='primary' />
                  </ListItemIcon>
                  <ListItemText sx={{ ml: -3 }}>
                    <Typography>La oss fikse lunsj. Da kan du fokusere på alt annet!</Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </FadeAnimation>
            <Stack direction='row ' gap={2}>
              <SlideAnimation direction='up' delay={200}>
                <Link to='/search'>
                  <CButton endIcon={<ArrowOutward />} variant='outlined'>Bli kunde</CButton>
                </Link>
              </SlideAnimation>
            </Stack>
          </Stack>
          <Stack sx={{
            flex: 1,
            gap: 2,
            alignItems: { xs: '', md: 'center' }
          }}>
            <Box sx={{
              width: { xs: '100%', lg: '713px' },
              height: { xs: '404px', lg: '580px' },
              position: 'relative',
              mt: { xs: 5, md: 0 }
            }}>
              <SlideAnimation direction='right'>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} src="/lunch.png" alt="" />
              </SlideAnimation>
              <Box sx={{
                position: 'absolute',
                top: '-50px', left: '-50px',
                width: { xs: '120px', md: '160px' }
              }}>
                <SlideAnimation direction='left'>
                  <img style={{ width: '100%', height: '100%' }} src="/image 26.png" alt="" />
                </SlideAnimation>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </CustomTabPanel> */}

    </Container>
  );
}

export default WhoAreYou;