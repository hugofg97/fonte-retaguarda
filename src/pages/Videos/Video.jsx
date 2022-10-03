import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import VideoContext from "../../context/Video";
import { useEffect } from "react";
import NewSession from "../../components/session/NewSession";
import DeleteVideo from "../../components/video/DeleteVideo";
import EditSession from "../../components/session/EditSession";
import { useParams } from "react-router-dom";
import NewVideo from "../../components/video/NewVideo";
import EditVideo from "../../components/video/EditVideo";

export default function Video(props) {
  const { getVideos, setPageState, pageState } = useContext(VideoContext);

  const {sessionId} = useParams()

  useEffect(() => {

    getVideos(sessionId);
  }, [sessionId]);
  useEffect(() => {
    getVideos(sessionId);
  
  }, [pageState.page])


  const columns = [
    { field: "name", headerName: "Nome", width: 180 },
    { field: "description", headerName: "Descrição", width: 300 },
    { field: "active", headerName: "Status", width: 150 },
    {
      field: "Ações",
      headerName: "Ediar",
      width: 160,
      type: "actions",
      renderCell: (params) => (
        <div style={{ display: "flex", pading: "5px" }}>
          <EditVideo videoEditable={params.row} />
          <DeleteVideo  id={params.row.id} />
        </div>
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
      <NewVideo></NewVideo>
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
            getVideos(sessionId)
          }
        }
          columns={columns}
      />
    </div>
  );
}
