import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

interface CommentListItemProps {
  fullName: string
  text: string
  date: Date
}

export default function CommentListItem({
  fullName,
  text,
  date
}: CommentListItemProps) {
    return (
        <React.Fragment>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar src="no-image" alt={fullName} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography>
                {fullName}
              </Typography>
            }
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {date.toLocaleDateString("de-DE")}
                </Typography>
                <Typography 
                  component="span"
                  sx={{ marginLeft: '10px', whiteSpace: 'pre-line' }}
                >
                  {text}
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider />
      </React.Fragment>
    )
}