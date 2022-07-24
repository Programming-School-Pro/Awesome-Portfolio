import {
  Grid,
  makeStyles,
  useTheme,
  useMediaQuery,
  Button,
  Box,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "./Card";
import { certificates } from "../../../data";

function Certifications() {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [loadedCertificates, setLoadedCertificates] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [pageSize, setPageSize] = useState(6);

  function loadCertificates() {
    const startIndex = pageNo * pageSize;
    const endIndex = startIndex + pageSize;
    let newCertificates = certificates
      .sort((a, b) => b.id - a.id)
      .filter((value, index) => {
        return index >= startIndex && index < endIndex;
      });
    setLoadedCertificates((prevCertificates) => [
      ...prevCertificates,
      ...newCertificates,
    ]);
    setPageNo((prevPageNo) => prevPageNo + 1);
  }

  useEffect(() => {
    if (isMobile) setPageSize(3);
    loadCertificates();
  }, []);

  return (
    <>
      <Grid container spacing={4} className={classes.galleryContainer}>
        {loadedCertificates.map((item, k) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            key={item.id}
            classes={{ item: classes.item }}
          >
            <Card
              id={item.id}
              title={item.title}
              issuedBy={item.issuedBy}
              nature={item.nature}
              date={item.date}
              onClick={() => {}}
              image={item.image}
              url={item.url}
            />
          </Grid>
        ))}
      </Grid>
      {loadedCertificates.length < certificates.length && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            className={classes.loadBtn}
            onClick={loadCertificates}
            variant="contained"
            color="primary"
            projectList
          >
            {t("project_load_btn")}
          </Button>
        </Box>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  galleryContainer: {
    overflow: "visible",
    width: "100%",
    margin: "0 auto",
  },
  item: {
    overflow: "visible",
  },
  loadBtn: {
    width: "200px",
  },
}));

export default Certifications;
