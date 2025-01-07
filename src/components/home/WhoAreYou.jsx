import { Box, Container, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FadeAnimation, SlideAnimation } from "../animation/Animation";
import { ArrowOutward, CheckCircle } from "@mui/icons-material";
import CButton from "../../common/CButton/CButton";

function WhoAreYou() {
  return (
    <Container maxWidth="lg" sx={{ my: { xs: 10, md: 15 } }}>
      <Box
        sx={{
          fontSize: { xs: "22px", md: "64px" },
          fontWeight: 400,
          textAlign: "center",
          fontFamily: "Forum",
        }}
      >
        <FadeAnimation damping={0.1} cascade={"cascade"}>
          Hvem er du?
        </FadeAnimation>
      </Box>
      <Box
        sx={{ fontSize: "16px", fontWeight: 500, textAlign: "center", mb: 6 }}
      >
        <FadeAnimation damping={0.05} cascade={"cascade"}>
          lunsjavtale gir deg kantinen rett i lomma
        </FadeAnimation>
      </Box>

      {/* Section 1: Sjefen */}
      <Stack direction={{ xs: "column", lg: "row" }} mt={{ xs: 5, md: 10 }} gap={6} alignItems="center">
        <Stack
          alignItems={{ md: "center", lg: "start" }}
          justifyContent="center"
          sx={{
            flex: 1,
            border: "1px solid lightgray",
            p: 3,
            borderRadius: "16px",
          }}
        >
          <SlideAnimation direction="up" delay={200}>
            <Typography
              sx={{
                fontSize: "48px",
                lineHeight: "50px",
                mb: 2,
                fontFamily: "Forum",
              }}
            >
              Kutt kostnader og få mer for dine penger.
            </Typography>
          </SlideAnimation>
          <SlideAnimation direction="up" delay={400}>
            <Typography sx={{ maxWidth: "700px" }} mb={1}>
              Vi har ingen driftskostnader og du betaler selvfølgelig ingenting
              for lunsj som ingen skal spise. Kundene våre kutter i gjennomsnitt
              25 % av lunsjkostnadene sine!
            </Typography>
          </SlideAnimation>
          <List>
            {[
              "Oppdag næringsrike måltidsalternativer skreddersydd for dine smakspreferanser.",
              "Varierte måltider hver uke. Dine ansatte kan selv velge hva de ønsker å spise.",
              "Fordel enkelt lunsjbidraget mellom bedriften og den ansatte.",
              "Få tilgang til et bredt utvalg deilige og sunne måltider.",
            ].map((text, id) => (
              <FadeAnimation
                key={id}
                damping={0.1}
                cascade={"cascade"}
                delay={300 * id}
              >
                <ListItem sx={{ mb: 2 }} disablePadding>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText sx={{ ml: -3 }}>
                    <Typography>{text}</Typography>
                  </ListItemText>
                </ListItem>
              </FadeAnimation>
            ))}
          </List>
          <SlideAnimation direction="up" delay={400}>
            <Link to="/search">
              <CButton endIcon={<ArrowOutward />} variant="outlined">
                Bli kunde
              </CButton>
            </Link>
          </SlideAnimation>
        </Stack>
        <Stack
          sx={{
            flex: 1,
            gap: 2,
            alignItems: { xs: "", md: "center" },
          }}
        >
          <SlideAnimation direction="right">
            <Box
              sx={{
                width: { xs: "100%", md: "713px" },
                height: { xs: "404px", md: "416px" },
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
                src="/dish1.jpeg"
                alt=""
              />
            </Box>
          </SlideAnimation>
          <Stack
            direction="row"
            gap={2}
            justifyContent={{
              xs: "center",
              sm: "start",
              lg: "space-between",
            }}
          >
            {[2, 3, 4].map((id) => (
              <SlideAnimation key={id} direction="left" delay={100 * id}>
                <Box
                  sx={{
                    width: { xs: "106px", md: "221px" },
                    height: "180px",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    src={`/dish${id}.jpeg`}
                    alt=""
                  />
                </Box>
              </SlideAnimation>
            ))}
          </Stack>
        </Stack>
      </Stack>

      {/* Section 2: Ansatt */}
      <Stack direction={{ xs: "column-reverse", md: "row" }} mt={{ xs: 5, md: 10 }} gap={6}>
        <Stack
          sx={{
            flex: 1,
            gap: 2,
            alignItems: { xs: "", md: "center" },
          }}
        >
          <SlideAnimation direction="left">
            <Box
              sx={{
                width: { xs: "100%", lg: "713px" },
                height: { xs: "404px", lg: "580px" },
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
                src="/image 7.png"
                alt=""
              />
            </Box>
          </SlideAnimation>
        </Stack>
        <Stack
          alignItems={{ md: "center", lg: "start" }}
          justifyContent="center"
          sx={{
            flex: 1,
            border: "1px solid lightgray",
            p: 3,
            borderRadius: "16px",
          }}
        >
          <SlideAnimation direction="up" delay={100}>
            <Typography
              sx={{
                fontSize: "48px",
                lineHeight: "50px",
                mb: 2,
                fontFamily: "Forum",
              }}
            >
              Velg mellom ulike lunsjretter hver dag
            </Typography>
          </SlideAnimation>
          <SlideAnimation direction="up" delay={200}>
            <Typography mb={1}>
              Her er det garantert noe alle liker – og nye retter på menyen hver
              eneste dag! Vi kan ikke fikse alt, men vi kan arrangere en
              stressfri pause og sørge for at du får mat som ikke bare er bra,
              men også bra for kroppen.
            </Typography>
          </SlideAnimation>
          <List>
            {[
              "Oppdag næringsrike måltidsalternativer skreddersydd for dine smakspreferanser.",
              "Velg hva du vil spise de dagene du selv ønsker lunsj fra oss.",
              "Stort utvalg av varmretter, salater, brødmat, yoghurt, smoothie, snacks og drikkevarer",
              "Levert til din arbeidsplass hver dag før kl. 11.00.",
            ].map((text, id) => (
              <FadeAnimation
                key={id}
                damping={0.1}
                cascade={"cascade"}
                delay={300 * id}
              >
                <ListItem sx={{ mb: 1 }} disablePadding>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText sx={{ ml: -3 }}>
                    <Typography>{text}</Typography>
                  </ListItemText>
                </ListItem>
              </FadeAnimation>
            ))}
          </List>
          <Stack direction="row" gap={2}>
            <SlideAnimation direction="up" delay={200}>
              <Link to="/search">
                <CButton endIcon={<ArrowOutward />} variant="outlined">
                  Bli kunde
                </CButton>
              </Link>
            </SlideAnimation>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

export default WhoAreYou;
