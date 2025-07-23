import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import SearchBar from "./components/SearchBar/SearchBar";
import RepoTable from "./components/RepoTable/RepoTable";
import RepoDetails from "./components/RepoDetails/RepoDetails";
import type { Repo } from "./types";
import styles from "./App.module.scss";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<Repo | null>(null);

  return (
    <Box className={styles.root}>
      <Box className={styles.header}>
        <SearchBar onSearch={setQuery} />
      </Box>
      {query === "" ? (
        <Box className={styles.welcomeBox}>
          <Typography variant="h4">Добро пожаловать</Typography>
        </Box>
      ) : (
        <Box className={styles.content}>
          <Box className={styles.tableWrapper}>
            <RepoTable query={query} onSelect={setSelected} />
          </Box>
          <Box className={styles.detailsWrapper}>
            {selected ? (
              <RepoDetails repo={selected} />
            ) : (
              <Typography variant="h6" className={styles.chooseText}>
                Выберите репозиторий
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default App;
