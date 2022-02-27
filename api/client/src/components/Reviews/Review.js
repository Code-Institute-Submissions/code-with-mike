import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardHeader, Rating } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Review = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!review) return null

  return (
    <Card sx={{ display: 'grid', maxWidth: '350px', justifySelf: 'center' }}>
      <CardHeader
        avatar={
          <Avatar alt="user's avatar" src={review.customer.image} />
        }
        title={review.customer.user.username}
      />
      <CardContent>
        <Typography sx={{ mb: 3, fontWeight: 'bold' }} variant="body1">
          {review.product.name}
        </Typography>
        <Typography variant="body2">
          <Rating name="read-only" value={review.rating} readOnly />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="outlined">
          View Course
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>
          {review.description}
        </Typography>
      </CardContent>
      </Collapse>
    </Card>
  )
}

export default Review;