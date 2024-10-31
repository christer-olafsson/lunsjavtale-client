import { Box, Container, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SlideAnimation } from '../animation/Animation';
import { InstagramEmbed } from 'react-social-media-embed';
import { CLIENT_DETAILS, FOLLOW_US_LIST } from '../../graphql/query';
import { useQuery } from '@apollo/client';
import Loader from '../../common/loader/Index';
import ErrorMsg from '../../common/ErrorMsg/ErrorMsg';

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
      <Box sx={{
        alignSelf: 'center',
        maxWidth: '288px',
        overflowX: 'hidden',
        bgcolor: 'light.main',
        py: '12px', px: '24px',
        borderRadius: '8px', mb: 2
      }}>
        <a style={{ textDecoration: 'none', color: 'inherit' }} href={socialLink?.instagram} target='blank'>Følg oss på Instagram</a>
      </Box>
      <Typography sx={{ fontSize: { xs: '24px', md: '32px' }, fontWeight: 600, alignSelf: 'center', mb: 2 }}>
        <SlideAnimation direction='up' delay={100}>
          Se hva som skjer
        </SlideAnimation>
      </Typography>
      <Typography sx={{ textAlign: 'center' }} alignSelf='center' mb={6}>
        <SlideAnimation direction='up' delay={200}>
          lunsjavtale er en digital kantine som gjør lunsjen enklere (og smartere)!
        </SlideAnimation>
      </Typography>
      <Stack direction='row' gap={{ xs: 0, md: 6 }} flexWrap='wrap' justifyContent='center'>
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
