import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const UserDetails = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const passwordValidation = z.object({
    name: z
      .string()
      .min(2, { message: "Name atleast 2 character long" })
      .max(55),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof passwordValidation>>({
    resolver: zodResolver(passwordValidation),
    defaultValues: {
      name: "",
    },
  });

  const handleForm = async (data: z.infer<typeof passwordValidation>) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/auth/login/user-details`,
        { email: email, name: data.name }
      );

      if (response.data.success === false) {
        throw new Error("something went wrong");
      }

      const session = {
        name: response.data.user.name,
        profilePicture: response.data.user.profilePicture,
        email: response.data.user.email,
        id: response.data.user.id,
      };

      sessionStorage.setItem("session", JSON.stringify(session));

      navigate("/");
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  useEffect(() => {
    const email = sessionStorage.getItem("tempEmail");

    if (email) {
      setEmail(email);
    }
  }, [setValue]);

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
          Personal Details
        </Typography>

        {/* <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            lineHeight: "15px",
            color: "text.white_32",
          }}
        >
          You’ll get smarter responses and can upload files, <br /> images, and
          more.
        </Typography> */}

        <Box
          sx={{
            mt: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <form
            onSubmit={handleSubmit(handleForm)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "25rem",
            }}
          >
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              type="text"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                "& .MuiInputBase-root": {
                  color: "#ffffffd9",
                  borderRadius: "999px",
                  backgroundColor: "#ffffff0f",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                  "&.Mui-focused": {
                    color: "white",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ffffff52",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffffff80",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffffcc",
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

export default UserDetails;
