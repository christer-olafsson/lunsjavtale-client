import { Box, Container, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SlideAnimation } from '../animation/Animation';
import { CLIENT_DETAILS, FOLLOW_US_LIST } from '../../graphql/query';
import { useQuery } from '@apollo/client';
import Loader from '../../common/loader/Index';
import ErrorMsg from '../../common/ErrorMsg/ErrorMsg';
import CButton from '../../common/CButton/CButton';
import { ArrowOutward } from '@mui/icons-material';

const InstagramSec = () => {
  const [links, setLinks] = useState([]);
  const [clientDetails, setClientDetails] = useState({});
  const [socialLinkJson, setSocialLinkJson] = useState({});
  const [socialLink, setSocialLink] = useState({
    facebook: '',
    instagram: '',
    linkedIn: ''
  });

  useQuery(CLIENT_DETAILS, {
    onCompleted: (res) => {
      setClientDetails(res.clientDetails);
    },
  });

  useEffect(() => {
    setSocialLinkJson(JSON.parse(clientDetails?.socialMediaLinks ?? '{}'));
  }, [clientDetails]);

  useEffect(() => {
    setSocialLink({
      facebook: socialLinkJson?.facebook ?? '',
      instagram: socialLinkJson?.instagram ?? '',
      linkedIn: socialLinkJson?.linkedIn ?? ''
    });
  }, [socialLinkJson]);

  const { loading, error } = useQuery(FOLLOW_US_LIST, {
    onCompleted: (res) => {
      setLinks(res.followUsList.edges.map(item => item.node));
    }
  });

  if (links.length === 0) {
    return
  }

  return (
    <Container maxWidth='lg'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        my: 10,
        overflowX: 'hidden',
      }}>
      <Typography sx={{ fontSize: { xs: '44px', md: '64px' }, fontFamily: 'Forum', textAlign: 'center', }}>
        <SlideAnimation direction='up' delay={100}>
          Se hva som skjer
        </SlideAnimation>
      </Typography>
      <Typography sx={{ textAlign: 'center' }} alignSelf='center' mb={3}>
        <SlideAnimation direction='up' delay={200}>
          lunsjavtale er en digital kantine som gjør lunsjen enklere (og smartere)!
        </SlideAnimation>
      </Typography>
      <a style={{ textDecoration: 'none', color: 'inherit', alignSelf: 'center' }} href={socialLink?.instagram} target='blank'>
        <CButton endIcon={<ArrowOutward />} variant='outlined'>Følg oss på Instagram</CButton>
      </a>
      <Stack direction='row' gap={{ xs: 0, md: 6 }} mt={4} flexWrap='wrap' justifyContent='center'>
        {
          loading ? <Loader /> : error ? <ErrorMsg /> :
            links.length === 0 ? <Typography textAlign='center'>=============</Typography> :
              links.map((item, id) => {
                return (
                  <Box key={id} sx={{ maxWidth: '320px', mb: 2 }}>
                    <iframe
                      src={`${item.link}/embed`}
                      width="320"
                      height="400"
                      frameBorder="0"
                      scrolling="no"
                      allowtransparency="true"
                    ></iframe>
                  </Box>
                )
              })
        }
      </Stack>
    </Container>
  );
}

export default InstagramSec;
