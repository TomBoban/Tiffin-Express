import { useTheme } from "@mui/material/styles";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import "./LandingPage.css";

import { motion } from "framer-motion";
import { Link, useHistory } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import {FaUtensils} from "react-icons/fa";

import AnimateButton from "../../components/Buttons/AnimateButton";

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
                    lineHeight: { xs: 1.4, md: 1.4 }
                  }}
                >
                  Express your taste buds with the favourite Tiffin services in
                  the market.
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
      <Grid>
      
      </Grid>
    </Container>
    <main id="main">


<section id="about" className="about">
  <div className="container-fluid">

    <div className="row">

      <div className="col-lg-5 align-items-stretch video-box">
        <img src="/images/foodImage.jpg" width="633px" height="470px" alt="image1"/>
      </div>

      <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch">

        <div className="content">
          <h3>Eum ipsam laborum deleniti <strong>velit pariatur architecto aut nihil</strong></h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
          </p>
          <p className="fst-italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.
          </p>
          <ul>
            <li><i><FaUtensils /></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
            <li><i><FaUtensils /></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
            <li><i><FaUtensils /></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
          </ul>
          <p>
            Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
        </div>

      </div>

    </div>

  </div>
</section>
</main>
    </>
   
    
     
  );
};

export default LandingPage;
