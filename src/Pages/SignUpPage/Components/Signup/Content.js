import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import HealingRoundedIcon from '@mui/icons-material/HealingRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';

import { SitemarkIcon } from './CustomIcons';

const items = [
  {
    icon: <RestaurantMenuRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Personalized Diet Plans',
    description:
      'Customized nutrition plans designed to meet individual health needs and dietary preferences.',
  },
  {
    icon: <HealingRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Holistic Health Approach',
    description:
      'Focusing on comprehensive wellness by integrating diet with overall health management.',
  },
  {
    icon: <LocalHospitalRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Medical Expertise',
    description:
      'Expert guidance backed by medical knowledge, helping you make informed health decisions.',
  },
  {
    icon: <MedicalServicesRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Continuous Support',
    description:
      'Ongoing health monitoring and diet adjustments to support long-term wellness goals.',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <SitemarkIcon /> ( icon with site name)
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
