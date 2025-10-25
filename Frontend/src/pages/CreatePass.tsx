import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreatePass = () => {
  const passwordValidation = z.object({
    email: z.email(),
    password: z
      .string()
      .min(8, { message: "Password atleast 8 character long" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof passwordValidation>>({
    resolver: zodResolver(passwordValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleForm = (data: z.infer<typeof passwordValidation>) => {
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
            gap: "10px",
            width: "30vw",
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

export default CreatePass;
