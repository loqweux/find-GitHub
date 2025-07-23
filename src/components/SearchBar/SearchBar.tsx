import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import type { InputLabelProps } from "@mui/material";
import styles from "./SearchBar.module.scss";

interface Props {
  onSearch(q: string): void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [q, setQ] = useState("");
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    setShowLabel(q.trim() !== "");
  }, [q]);

  return (
    <Box className={styles.root}>
      <TextField
        fullWidth
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Введите поисковый запрос"
        label={showLabel ? "Поисковый запрос" : undefined}
        InputProps={{
          sx: {
            backgroundColor: "#00838F",
            "& input::placeholder": {
              fontStyle: "italic",
              color: "#fff",
            },
            color: "#fff",
          },
        }}
        InputLabelProps={
          showLabel
            ? { sx: { fontWeight: 700, fontStyle: "normal", color: "#000" } }
            : ({ shrink: false } as InputLabelProps)
        }
        variant="filled"
      />
      <Button
        variant="contained"
        onClick={() => onSearch(q)}
        disabled={q.trim() === ""}
      >
        Искать
      </Button>
    </Box>
  );
};

export default SearchBar;
