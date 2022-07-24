import React, { Component, useState } from "react";
import classes from "./KnowMore.module.css";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Certifications from "./Certifications/index";
import Education from "./Education/index";

const tabs = {
  Certifications: {
    index: 1,
    component: <Certifications />,
  },
  Education: {
    index: 0,
    component: <Education />,
  },
};

const KnowMore = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTab, setSelectedTab] = useState(tabs.Education);
  const localStyles = useStyles();

  const onTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const webView = () => {
    return (
      <>
        <div class={classes.wrapper}>
          <ul id={classes.tab}>
            {Object.keys(tabs).map((tab) => {
              return (
                <li>
                  <div
                  style={{color: theme.palette.text.primary}}
                    className={
                      selectedTab.index === tabs[tab].index
                        ? localStyles.selectedTab
                        : null
                    }
                    onClick={() => onTabChange(tabs[tab])}
                  >
                    {tab.toUpperCase()}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div class={classes.body}>{selectedTab.component}</div>
      </>
    );
  };

  const mobileView = () => {
    return (
      <>
        {Object.keys(tabs)
          .reverse()
          .map((tab) => {
            return (
              <Accordion style={{ marginBottom: "10px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{color: theme.palette.text.secondary}}/>}
                  aria-controls={`${tab}-content`}
                  id={`${tab}-header`}
                >
                  <Typography variant="h6">{tab.toUpperCase()}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{display: "block"}}>{tabs[tab].component}</AccordionDetails>
              </Accordion>
            );
          })}
      </>
    );
  };
  return <>{isMobile ? mobileView() : webView()}</>;
};

const useStyles = makeStyles((theme) => ({
  selectedTab: {
    "border-bottom-style": "solid",
    "border-color": theme.palette.primary.main,
  },
}));

export default KnowMore;
