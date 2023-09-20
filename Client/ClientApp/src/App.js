import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {

    const [users, setUsers] = useState({ users: [] });

    useEffect(() => {
        axios.get("https://localhost:7020/api/User")
            .then(response => {
                setUsers(response.data.data); // Perubahan ini
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="container">
            <h1>Users</h1>
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(users) ? (
                                users.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No user data available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default App;