import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const PasswordLogin = () => {
  const navigate = useNavigate();

  const passwordValidation = z.object({
    email: z.email(),
    password: z
      .string()
      .min(8, { message: "Password atleast 8 character long" }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof passwordValidation>>({
    resolver: zodResolver(passwordValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleForm = async (data: z.infer<typeof passwordValidation>) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/auth/login/password-login`,
        {
          email: data.email,
          password: data.password,
        }
      );

      if (response.data.success === false) {
        throw new Error("something went wrong");
      }

      navigate("/");
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  useEffect(() => {
    const email = sessionStorage.getItem("tempEmail");

    if (email) {
      setValue("email", email);
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
          Create your account
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            lineHeight: "15px",
            color: "text.white_32",
          }}
        >
          Set your password for Heyai to continue
        </Typography>

        <form
          onSubmit={handleSubmit(handleForm)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "25rem",
            marginTop: "2vh",
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            disabled
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              "& .MuiInputBase-root": {
                color: "#ffffffd9", // base text color
                borderRadius: "999px",
                backgroundColor: "#ffffff0f",

                "&.Mui-disabled": {
                  backgroundColor: "#ffffff0a", // slightly transparent background when disabled
                },
              },

              "& .MuiInputBase-input": {
                color: "#ffffffd9", // text color for normal state
                "&.Mui-disabled": {
                  WebkitTextFillColor: "white",
                },
              },

              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "white",
                },
                "&.Mui-disabled": {
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
                "&.Mui-disabled fieldset": {
                  borderColor: "#ffffff40",
                },
              },
            }}
          />

          <TextField
            label="password"
            variant="outlined"
            fullWidth
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
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
    </Container>
  );
};

export default PasswordLogin;
