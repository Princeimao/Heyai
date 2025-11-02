import { Box, Container, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const AiResponse = ({ content }: { content: string }) => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          color: "text.white_86",
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ ...props }) => (
              <Typography variant="h5" gutterBottom {...props} />
            ),
            h2: ({ ...props }) => (
              <Typography variant="h6" gutterBottom {...props} />
            ),
            h3: ({ ...props }) => (
              <Typography variant="subtitle1" gutterBottom {...props} />
            ),
            p: ({ ...props }) => (
              <Typography variant="body1" paragraph {...props} />
            ),
            li: ({ ...props }) => (
              <li>
                <Typography component="span" variant="body1" {...props} />
              </li>
            ),
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              if (match) {
                return (
                  <Box component="div">
                    <SyntaxHighlighter
                      language={match[1]}
                      PreTag="div"
                      style={vscDarkPlus}
                      customStyle={{
                        borderRadius: 10,
                        padding: "30px 20px",
                      }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </Box>
                );
              }
              // inline code
              return (
                <Box
                  component="code"
                  sx={{
                    bgcolor: "rgba(0,0,0,0.06)",
                    px: 0.5,
                    borderRadius: 0.5,
                    fontFamily: "monospace",
                  }}
                >
                  {children}
                </Box>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </Box>
    </Container>
  );
};

export default AiResponse;
