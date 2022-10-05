import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import SessionContext from "../../context/Session";
import { useEffect } from "react";
import NewSession from "../../components/session/NewSession";
import DeleteSession from "../../components/session/DeleteSession";
import EditSession from "../../components/session/EditSession";
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import {Link} from 'react-router-dom'

export default function Session() {
  const {categoryId} = useParams()
  const { getSessionsReiki, setPageState, pageState } = useContext(SessionContext);
 const history = useNavigate()
  const pushToVideosBySession = (sessionId ) => {
    return () => history(`/videos/${sessionId}`)
  };
  useEffect(() => {
    getSessionsReiki(categoryId);
  }, [categoryId]);
  useEffect(() => {
    getSessionsReiki(categoryId);
  
  }, [pageState.page])


  const columns = [
    { field: "name", headerName: "Nome", width: 180 },
    { field: "sessionCategoryId", headerName: "Sessão", width: 150 },
    { field: "description", headerName: "Descrição", width: 300 },
    { field: "active", headerName: "Ativo", width: 150, renderCell: (params) => (
      <span>{params.row.active ? 'Sim': 'Não'}</span>
    ) },
    {
      field: "Ações",
      headerName: "Ediar",
      width: 160,
      type: "actions",
      renderCell: (params) => (
        <div style={{ display: "flex", pading: "5px" }}>
          <EditSession sessionEditable={params.row} />
          <DeleteSession videos={params.row.videousCount} id={params.row.id} />
        </div>
      ),
    },
    {
      field: "Videos",
      headerName: "Videos",
      width: 140,
      type: "actions",
      renderCell: (params) => (

          <Button size="small" variant="text"  color="success" onClick={pushToVideosBySession(params.row.id)}>Ver Todos</Button>

      ),
    },
  ];
  return (
    <div
      style={{
        width: "1200px",
        marginTop: 80,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >

      <NewSession></NewSession>
      <DataGrid
      autoHeight
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          pagination
          page={pageState.page }
          pageSize={pageState.pageSize}
          paginationMode="server"
          onPageChange={(newPage) =>setPageState(old => ({...old, page: newPage  }))}
          onPageSizeChange={(newPageSize) => {
            setPageState(old => ({...old, pageSize:newPageSize}))
            getSessionsReiki()
          }
        }
          columns={columns}
      />
    </div>
  );
}
