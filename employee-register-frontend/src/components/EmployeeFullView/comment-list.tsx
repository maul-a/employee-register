import React, { useEffect } from 'react';
import List from '@mui/material/List';

import { useAppDispatch, useAppSelector } from '@app/hooks';
import { requestCommentList } from '@app/features/comments/commentsRequests';
import { selectCommentList, setCommentList } from '@app/features/comments/commentsSlice';
import { selectJwtToken } from '@app/features/auth/authSlice';

import CommentListItem from './comment-list-item'

export default function CommentList() {
  const comments = useAppSelector(selectCommentList)
  return (
    <List sx={{ 
        width: '100%', 
        // maxWidth: 560, 
        bgcolor: 'background.paper',
        maxHeight: 500,
        // position: 'relative',
        overflow: 'auto',
    }}>
      {comments.map(comment => (
        <CommentListItem 
          key={comment.id}
          fullName={`${comment.author.firstName} ${comment.author.lastName}`}
          date={comment.date}
          text={comment.text}
        />
      ))}
    </List>
  );
}