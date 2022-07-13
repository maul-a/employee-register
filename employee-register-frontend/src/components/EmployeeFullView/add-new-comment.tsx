import React, { useState } from "react";
import { TextareaAutosize, Box, Button } from "@mui/material";

interface AddNewCommentProps {
  handleCreateComment: (text: string) => void
}

export default function AddNewComment({
  handleCreateComment,
}: AddNewCommentProps) {
  const [commentText, setCommentText] = useState('')
  return (
    <Box>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        style={{ width: 200 }}
        value={commentText}
        onChange={(e) => {setCommentText(e.currentTarget.value)}}
      />
      <Box>
        <Button 
          variant="contained" 
          component="button"
          onClick={() => {
            if (commentText) {
              setCommentText('')
              handleCreateComment(commentText)
            }
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  )
}