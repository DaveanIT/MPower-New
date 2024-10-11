import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'; 


const SubNav = () => {
    const navigate = useNavigate();


    const [error, setError] = useState(null); // State to handle errors
    const [menuItems, setMenuItems] = useState([]); // State to store fetched menu items
    const username = sessionStorage.getItem('UserName'); // Simulate the logged-in user name
    const userid = sessionStorage.getItem('UserId');
    const mnuId = sessionStorage.getItem('MnuId');

    useEffect(() => {
        const fetchNav = async () => {
            if (userid) {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/v1/sub-nav/?user_id=${userid}&mnu_id=${mnuId}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    if (data.status === "success") {
                        setMenuItems(data.data); // Set the fetched menu items
                    } else {
                        setError('Failed to fetch menu items');
                    }
                } catch (err) {
                    setError(err.message);
                }
            } else {
                setError('User ID is not available in session storage');
            }
        };
        fetchNav();
    }, [userid]);

    const handleHome = async (e) => {
        e.preventDefault();
        navigate("/main-nav")
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            // Call the Django logout API
            const response = await fetch('http://127.0.0.1:8000/api/v1/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include credentials like cookies in the request
            });
    
            if (response.ok) {
                // If the logout is successful, remove session data and redirect
                sessionStorage.removeItem('UserName');
                sessionStorage.removeItem('UserId');
                navigate('/login'); // Assuming you have a login route to redirect to after logout
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("An error occurred while logging out", error);
        }
    };

  return (
    <div className="container-fluid">
        <header className="d-flex justify-content-between align-items-center p-3">
            <h1 className="h5">{username.toLowerCase()}</h1> {/* Use Bootstrap h5 class for smaller size */}
            <form onSubmit={handleLogout}>
                <button type="submit" className="btn btn-outline-danger">Logout</button>
            </form>
        </header>

        {/* Full viewport height for centering */}
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <div className="container">
                <div className="row justify-content-center">
                    {menuItems.map((item) => (
                        <div key={item.MnuId} className="col-6 col-md-3 mb-3">
                            <button 
                                className="btn btn-primary w-100" 
                                data-baseid={item.BaseId} 
                                data-mnuid={item.MnuId}  // Pass MnuId in data attribute
                                style={{ backgroundColor: item.Colr }}
                                 // Use onClick to handle button click
                            >
                                {item.MnuName}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
    
    
        <button onClick={handleHome}
        className="next-button"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: '60px',  // Make the button a square
          height: '60px', // Equal width and height for round shape
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50%', // Make the button round
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', // Center the icon
          fontSize: '24px', // Increase the icon size
        }}
      >
        <FontAwesomeIcon icon={faHome} />
      </button>
    </div>
  )
}

export default SubNav