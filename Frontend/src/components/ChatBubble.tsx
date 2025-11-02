import { Avatar, Box, Typography } from "@mui/material";

interface Props {
  content: string;
  profilePic: string;
}

const ChatBubble = ({ content, profilePic }: Props) => {
  return (
    <Box
      display="flex"
      alignItems="flex-end"
      justifyContent="flex-end"
      gap={1}
      sx={{ my: 1 }}
    >
      <Box
        sx={{
          bgcolor: "text.white_32",
          color: "white",
          px: 2,
          py: 1,
          borderRadius: "18px 18px 4px 18px",
          maxWidth: "60%",
          boxShadow: 2,
        }}
      >
        <Typography variant="body1">{content}</Typography>
      </Box>

      <Avatar
        alt="User"
        src={profilePic !== null ? profilePic : ""}
        sx={{ width: 40, height: 40 }}
      />
    </Box>
  );
};

export default ChatBubble;
