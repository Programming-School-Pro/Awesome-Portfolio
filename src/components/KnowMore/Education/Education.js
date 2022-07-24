import {
  makeStyles,
  useMediaQuery,
  useTheme,
  Typography,
  Link,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { educations } from "../../../data";
import classes from "./Education.module.css";

function Education() {
  const theme = useTheme();
  const localStyle = useStyles();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [loadedEducations, setLoadedEducations] = useState([]);
  useEffect(() => {
    setLoadedEducations(educations.sort((a, b) => b.id - a.id));
  }, []);

  const webView = () => (
    <div className={localStyle.body}>
      <div className={classes.content}>
        <ul className={classes.timeline}>
          {loadedEducations.map((education) => (
            <li
              className={classes.event}
              data-date={`${education.duration.start} - ${education.duration.end}`}
            >
              <Typography
                variant="h5"
                style={{ color: theme.palette.text.secondary }}
              >
                {education.degreeTitle} <br />
                <Link
                  href={
                    education.links.website ||
                    education.links.facebook ||
                    education.links.instagram
                  }
                  color="primary"
                  target={"_blank"}
                >
                  {education.school}
                </Link>
              </Typography>
              <Typography
                variant="h6"
                style={{ color: theme.palette.text.secondary }}
              >
                {education.location}
              </Typography>
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const mobileView = () => (
    <ul style={{ listStyle: "none" }}>
      {loadedEducations.map((education) => (
        <li>
          <Typography
            variant="h7"
            style={{ color: theme.palette.text.primary }}
          >{`${education.duration.start} - ${education.duration.end}`}</Typography>
          <Typography
            variant="h5"
            style={{ color: theme.palette.text.secondary }}
          >
            {education.degreeTitle} <br />
            <Link
              href={
                education.links.website ||
                education.links.facebook ||
                education.links.instagram
              }
              color="primary"
              target={"_blank"}
            >
              {education.school}
            </Link>
          </Typography>
          <Typography
            variant="h6"
            style={{ color: theme.palette.text.secondary }}
          >
            {education.location}
          </Typography>
          <br />
        </li>
      ))}
    </ul>
  );
  return isSmallMobile ? mobileView() : webView();
}

const useStyles = makeStyles((theme) => ({
  body: {
    textAlign: "left",
  },
}));

export default Education;
