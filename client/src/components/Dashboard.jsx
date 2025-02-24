import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Navbar.jsx";

function Dashboard() {
  const [ltp, setLTP] = useState(0);
  const [securityId, setSecurityId] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [target1, setTarget1] = useState("");
  const [target2, setTarget2] = useState("");
  const [instruments, setInstruments] = useState([]); // ✅ Stores all instruments
  const [filteredInstruments, setFilteredInstruments] = useState([]); // ✅ Filtered results
  const [searchTerm, setSearchTerm] = useState(""); // ✅ User input for search

  useEffect(() => {
    // Fetch available instruments from API
    axios.get("http://localhost:8000/api/instruments")
      .then((response) => {
        setInstruments(response.data);
        setFilteredInstruments(response.data); // Initialize filtered list
      })
      .catch((error) => console.error("Error fetching instruments:", error));
  }, []);

  useEffect(() => {
    if (securityId) {
      const ws = new WebSocket("ws://localhost:8000/api/ws/marketfeed");
      ws.onopen = () => ws.send(JSON.stringify({ security_id: securityId }));
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setLTP(data.ltp);
      };
      return () => ws.close();
    }
  }, [securityId]);

  // 🔍 Filter instruments as user types
  useEffect(() => {
    setFilteredInstruments(
      instruments.filter((inst) => inst.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, instruments]);

  const handleSubmit = async () => {
    await axios.post("http://localhost:8000/api/trade/submit", {
      security_id: securityId,
      ltp,
      stop_loss: stopLoss,
      target1,
      target2
    });
    alert("Trade submitted!");
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4">
        <h2 className="text-center">Stock Trader Options</h2>

        <div className="row mt-3">
          {/* ✅ Searchable Dropdown */}
          <div className="col-md-6">
            <label className="form-label">Instrument:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search & Select Instrument..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="form-select mt-2"
              onChange={(e) => setSecurityId(e.target.value)}
              size="6" // Makes it a scrollable dropdown
            >
              {filteredInstruments.map((instrument, index) => (
                <option key={index} value={instrument}>{instrument}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">LTP (Live Price):</label>
            <input type="text" className="form-control" value={ltp} readOnly />
          </div>

          <div className="col-md-4 mt-3">
            <label className="form-label">Stop Loss:</label>
            <input type="number" className="form-control" onChange={(e) => setStopLoss(e.target.value)} />
          </div>

          <div className="col-md-4 mt-3">
            <label className="form-label">Target 1:</label>
            <input type="number" className="form-control" onChange={(e) => setTarget1(e.target.value)} />
          </div>

          <div className="col-md-4 mt-3">
            <label className="form-label">Target 2:</label>
            <input type="number" className="form-control" onChange={(e) => setTarget2(e.target.value)} />
          </div>

          <div className="col-12 text-center mt-4">
            <button className="btn btn-success px-4" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
