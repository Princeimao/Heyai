import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import googleImg from "../../public/google.svg";

const Login = () => {
  const emailValidation = z.object({
    email: z.email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof emailValidation>>({
    resolver: zodResolver(emailValidation),
    defaultValues: {
      email: "",
    },
  });

  const handleForm = (data: z.infer<typeof emailValidation>) => {
    console.log(data);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "60vh",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            letterSpacing: "-1px",
            mb: "5px",
          }}
        >
          Log in or sign up
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            lineHeight: "15px",
            color: "text.white_32",
          }}
        >
          You’ll get smarter responses and can upload files, <br /> images, and
          more.
        </Typography>

        <Box
          sx={{
            mt: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Button
            sx={{
              bgcolor: "text.white_06",
              border: 1,
              borderColor: "text.white_32",
              borderRadius: "999px",
              color: "white",
              px: "5vw",
              py: "10px",
              ":hover": {
                bgcolor: "text.white_32",
              },
            }}
          >
            <img src={googleImg} alt="google Logo" />
            <Typography
              sx={{
                fontWeight: "600",
                letterSpacing: "1px",
              }}
            >
              Continue with Google
            </Typography>
          </Button>

          <Divider
            sx={{
              "&::before, &::after": {
                borderColor: "text.white_32",
              },
              color: "white",
            }}
          >
            or
          </Divider>

          <form
            onSubmit={handleSubmit(handleForm)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiInputBase-root": {
                  color: "#ffffffd9",
                  borderRadius: "999px",
                  backgroundColor: "#ffffff0f",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ffffff52",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffffff52",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff52",
                  },
                },
              }}
            />
            <Button
              sx={{
                bgcolor: "white",
                border: 1,
                borderColor: "text.white_32",
                borderRadius: "999px",
                color: "black",
                px: "5vw",
                py: "10px",
                ":hover": {
                  bgcolor: "text.white_64",
                },
              }}
              type="submit"
            >
              <Typography
                variant="button"
                sx={{
                  fontWeight: "600",
                  letterSpacing: "1px",
                }}
              >
                Continue
              </Typography>
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
