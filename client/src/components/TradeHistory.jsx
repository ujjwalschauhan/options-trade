import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Navbar.jsx";

function TradeHistory() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      const res = await axios.get("http://localhost:8000/api/trade/history");
      setTrades(res.data);
    };
    fetchTrades();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4">
        <h3>Trade History</h3>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Security ID</th>
              <th>LTP</th>
              <th>Stop Loss</th>
              <th>Target 1</th>
              <th>Target 2</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, index) => (
              <tr key={index}>
                <td>{trade.security_id}</td>
                <td>{trade.ltp}</td>
                <td>{trade.stop_loss}</td>
                <td>{trade.target1}</td>
                <td>{trade.target2}</td>
                <td>{trade.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TradeHistory;
