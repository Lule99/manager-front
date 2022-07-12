import { useState } from "react";
import { napraviIzvestaj } from "../../services/IzvestajService";

import "./Report.css";

export const Report = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [id, setId] = useState("");

  const pregledaj = () => {
    const link = document.createElement("a");
    link.href = `http://localhost:8081/api/izvestaj/html/${id}`;
    link.target = "_blank";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const skini = () => {
    const link = document.createElement("a");
    link.href = `http://localhost:8081/api/izvestaj/pdf/${id}`;
    link.target = "_blank";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const potvrda = () => {
    if (start && end) {
      napraviIzvestaj(start, end).then((res) => {
        setId(res.data);
      });
    }
  };

  return (
    <div className="col align-items-center justify-content-center">
      <h1>Izdavanje izvestaja</h1>
      <div className="col">
        <div className="form-group">
          <label>
            <strong>Od</strong>
          </label>
          <input
            type="date"
            class="form-control"
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            <strong>Do</strong>
          </label>
          <input
            type="date"
            class="form-control"
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-block" onClick={potvrda}>
          Potvrda
        </button>
      </div>
      {id && (
        <>
          <hr />
          <div className="w-80 donji-deo">
            <strong>Izvestaj napravljen</strong>
            <button className="btn btn-primary btn-block" onClick={pregledaj}>
              Pregledaj
            </button>
            <button className="btn btn-primary btn-block" onClick={skini}>
              Skini
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
