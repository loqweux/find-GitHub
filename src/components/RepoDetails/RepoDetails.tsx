import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import type { Repo } from "../../types";
import styles from "./RepoDetails.module.scss";

interface Props {
  repo: Repo;
}

const RepoDetails: React.FC<Props> = ({ repo }) => (
  <Card className={styles.root}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">{repo.name}</Typography>
        {repo.stargazers_count && <Chip label={`★ ${repo.stargazers_count}`} />}
      </Box>
      <Typography variant="body2" gutterBottom>
        {repo.description || "Описание отсутствует"}
      </Typography>
      <Typography variant="caption">
        Лицензия: {repo.license?.name || "нет"}
      </Typography>
    </CardContent>
  </Card>
);

export default RepoDetails;
