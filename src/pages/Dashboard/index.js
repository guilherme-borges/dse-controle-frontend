import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "../../global.css";
import "./styles.css";
import Menu from "../../components/Menu";

export default function Dashboard() {
  const [id, setId] = useState(0);
  const [hours_sold, setHoursSold] = useState(0);
  const [value, setValue] = useState(0);
  const [client_id, setClientId] = useState(0);
  const [project_id, setProjectId] = useState(0);
  const [sales, setSales] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const token = "Bearer " + localStorage.getItem("Token");

  useEffect(() => {
    loadSales();
  }, []);

  async function loadSales() {
    const response = await api.get("/sales", {
      headers: {
        Authorization: token,
      },
    });
    setSales(response.data);
  }

  return (
    <div className="dashboard-container">
      <Menu />

      <main>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cliente</th>
              <th scope="col">Projeto</th>
              <th scope="col">Horas Vendidas</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <th scope="row">{sale.id}</th>
                <td>{sale.client}</td>
                <td>{sale.project}</td>
                <td>{sale.hours_sold}</td>
                <td>{sale.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
