import { useTheme } from "@mui/material/styles";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import "./LandingPage.css";

import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { FaUtensils } from "react-icons/fa";

import AnimateButton from "../../components/Buttons/AnimateButton";
import Section2 from "./Section2";

const LandingPage = () => {
  const theme = useTheme();
  const history = useHistory();
  const handleProducts = () => {
    history.push("/products");
  };

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          minHeight: "100vh",
          overflow: "hidden",
        }}
        className="landing-main"
      >
        <Grid
          container
          spacing={2}
          sx={{ pt: { md: 0, xs: 8 }, pb: { md: 0, xs: 5 } }}
        >
          <Grid item xs={12} lg={12} className="menu_center">
            <Grid
              container
              spacing={2}
              sx={{
                pr: 10,
                [theme.breakpoints.down("md")]: { pr: 0, textAlign: "center" },
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, translateY: 550 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 30,
                  }}
                >
                  <Typography
                    variant="h1"
                    color="white"
                    sx={{
                      fontSize: { xs: "1.825rem", sm: "2rem", md: "2.5rem" },
                      fontWeight: 700,
                      lineHeight: { xs: 1.3, sm: 1.3, md: 1.3 },
                      fontFamily: "'Arapey'",
                    }}
                  >
                    <span>Convenience and flavor delivered with </span>
                    <Box component="span" sx={{ color: "#ffa637" }}>
                      <span>Tiffin Express </span>
                    </Box>
                  </Typography>
                </motion.div>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, translateY: 550 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 30,
                    delay: 0.2,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    color="white"
                    sx={{
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      fontWeight: 400,
                      lineHeight: { xs: 1.4, md: 1.4 },
                    }}
                  >
                    Express your taste buds with the favourite Tiffin services
                    in the market.
                  </Typography>
                </motion.div>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  my: 3.25,
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, translateY: 550 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 30,
                    delay: 0.4,
                  }}
                >
                  <Grid
                    container
                    spacing={2}
                    sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
                  >
                    <Grid item>
                      <AnimateButton>
                        <Button
                          size="large"
                          className="btn_explore"
                          variant="outlined"
                        >
                          Explore More
                        </Button>
                      </AnimateButton>
                    </Grid>
                    <Grid item>
                      <AnimateButton>
                        <Button
                          target="_blank"
                          size="large"
                          variant="contained"
                          className="btn_view"
                          onClick={handleProducts}
                          startIcon={
                            <EyeOutlined style={{ fontSize: "1.15rem" }} />
                          }
                        >
                          View Products
                        </Button>
                      </AnimateButton>
                    </Grid>
                  </Grid>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            lg={7}
            md={6}
            sx={{ display: { xs: "none", md: "flex" } }}
          ></Grid>
        </Grid>
      </Container>
      <Grid>
        {/* <Section2 /> */}
      </Grid>
    </>
  );
};

export default LandingPage;
