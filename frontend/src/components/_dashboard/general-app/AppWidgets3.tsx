import { Icon } from '@iconify/react';
import peopleOutline from '@iconify/icons-eva/people-outline';

// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Box, Typography } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.error.light
}));

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.black
}));

// ----------------------------------------------------------------------

const TOTAL = 10;

export default function AppWidgets2() {
  const theme = useTheme();

  return (
    <RootStyle>
      <Box sx={{ ml: 3, color: 'grey.800' }}>
        <Typography variant="h4"> {fNumber(TOTAL)}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.72 }}>
          Total Batches
        </Typography>
      </Box>
      <IconStyle icon={peopleOutline} />
    </RootStyle>
  );
}
