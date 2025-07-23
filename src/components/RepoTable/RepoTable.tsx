import React, { useState } from "react";
import type {
  GridColDef,
  GridSortModel,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useSearchReposQuery } from "../../api/githubApi";
import type { Repo } from "../../types";
import { formatDate } from "../../utils/date";
import styles from "./RepoTable.module.scss";

interface Props {
  query: string;
  onSelect(repo: Repo): void;
}

const RepoTable: React.FC<Props> = ({ query, onSelect }) => {
  const [page, setPage] = useState<number>(1);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: "stargazers_count", sort: "desc" },
  ]);

  const { data, isLoading } = useSearchReposQuery({
    q: query || "react",
    page: page,
    per_page: paginationModel.pageSize,
    sort: (sortModel[0]?.field as "stars" | "forks" | "updated") || "stars",
    order: (sortModel[0]?.sort as "asc" | "desc") || "desc",
  });

  const cols: GridColDef[] = [
    { field: "name", headerName: "Название", flex: 1 },
    { field: "language", headerName: "Язык", width: 130 },
    { field: "forks_count", headerName: "Форки", type: "number", width: 110 },
    {
      field: "stargazers_count",
      headerName: "Звёзды",
      type: "number",
      width: 110,
    },
    {
      field: "updated_at",
      headerName: "Обновлено",
      width: 140,
      valueFormatter: ({ value }) => formatDate(value as string),
    },
  ];

  return (
    <div className={styles.root}>
      <DataGrid
        autoHeight
        rows={data?.items || []}
        columns={cols}
        loading={isLoading}
        rowCount={data?.total_count || 0}
        paginationMode="server"
        sortingMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => {
          setPaginationModel(model);
          setPage(model.page + 1);
        }}
        sortModel={sortModel}
        onSortModelChange={(model: GridSortModel) => {
          setSortModel(model);
        }}
        onRowClick={(params) => onSelect(params.row as Repo)}
      />
    </div>
  );
};

export default RepoTable;
