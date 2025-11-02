import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const OtpVerification = () => {
  const navigate = useNavigate();

  const passwordValidation = z.object({
    email: z.email(),
    otp: z.string().min(6, { message: "Enter Your 6 digit OTP" }).max(6),
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
      otp: "",
    },
  });

  const handleForm = async (data: z.infer<typeof passwordValidation>) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/auth/login/verify-otp`,
        {
          email: data.email,
          userOtp: data.otp,
        }
      );

      if (response.data.success === false) {
        throw new Error("something went wrong");
      }

      navigate("/auth/user-details");
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
      <Toolbar />
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
          Enter OTP
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            lineHeight: "15px",
            color: "text.white_32",
          }}
        >
          One Time Password (OTP) has been sent via Email
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

          <TextField
            label="Otp"
            variant="outlined"
            fullWidth
            type="otp"
            {...register("otp", {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                const regexValue = value.replace(/\D/g, "");
                const splitedVal = regexValue.slice(0, 6);
                setValue("otp", splitedVal);
              },
              required: "Username is required",
            })}
            error={!!errors.otp}
            helperText={errors.otp?.message}
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

export default OtpVerification;
