import "./Dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";

const columns = [
    { value: "domain", label: "Domain" },
    { value: "niche1", label: "Niche 1" },
    { value: "traffic", label: "Traffic" },
    { value: "dr", label: "DR" },
    { value: "da", label: "DA" },
    { value: "language", label: "Language" },
    { value: "price", label: "Price" },
    { value: "spam_score", label: "Spam Score" },
];

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [domainSearch, setDomainSearch] = useState("");  // Search term
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("domain"); // default column to sort by

    // Fetch paginated data with optional search filter
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/domains`, {
                params: {
                    page: currentPage,
                    limit: perPage,
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                    search: domainSearch,  // Send search term in the request
                },
            })
            .then((response) => {
                setData(response.data.data);
                setTotalPages(response.data.meta.totalPages);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [currentPage, perPage, sortBy, sortOrder, domainSearch]);  // Added domainSearch as a dependency


    const handleSortChange = (e) => {
        setSortBy(e.target.value); // Set selected column
        setSortOrder("asc"); // Default to ascending order on column change
    };


    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div className="s-logo">
                    <img src="./logo.jpg" alt="logo" />
                    <span>Ful<span className="s-dot">●</span>io</span>
                </div>

                <h2 className="dashboard-title">Domain Analytics Dashboard</h2>

            </div>

            <div className="table_functinality">

                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search domain by name..."
                    value={domainSearch}
                    onChange={(e) => setDomainSearch(e.target.value)}  // Handle search input
                />

                <div className="sort-dropdown">
                    <label htmlFor="sortColumn">Sort</label>
                    <select
                        id="sortColumn"
                        value={sortBy}
                        onChange={handleSortChange}
                    >
                        {columns.map((col) => (
                            <option key={col.value} value={col.value}>
                                {col.label}
                            </option>
                        ))}
                    </select>

                    <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                        {sortOrder === "asc" ? "Ascending" : "Descending"}
                    </button>
                </div>

            </div>


            {/* Data Table */}
            <table className="data-table">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        {columns.map((col) => (
                            <th key={col.value}>
                                <div className="table-head">{col.label}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{index + 1 + (currentPage - 1) * perPage}</td>
                            <td>{row.domain}</td>
                            <td>{row.niche1}</td>
                            <td>{row.traffic}</td>
                            <td>{row.dr}</td>
                            <td>{row.da}</td>
                            <td>{row.language}</td>
                            <td>{row.price}</td>
                            <td>{row.spam_score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>

                <label>
                    Rows per page:
                    <select value={perPage} onChange={(e) => setPerPage(parseInt(e.target.value))}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default Dashboard;

