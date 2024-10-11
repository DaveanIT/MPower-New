import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../assets/static/css/branch.css';
import { useNavigate } from 'react-router-dom';

const Branch = () => {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branches, setBranches] = useState([]); // State to hold branches
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch userid from sessionStorage
    const userid = sessionStorage.getItem('UserId');

    // Function to fetch branches
    const fetchBranches = async () => {
      if (userid) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/v1/branch/?userid=${userid}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data.status === 'success') {
            setBranches(data.data); // Accessing the data array inside the response
          } else {
            setError(data.message); // Handle error message
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError('User ID is not available in session storage');
        setLoading(false);
      }
    };

    fetchBranches();
  }, []); // Empty dependency array to run once on component mount

  const handleChange = (event) => {
    const selectedBranchCode = event.target.dataset.branchCode;
    const selectedPhntmCd = event.target.dataset.phntmCd;
    const selectedPhntmDesc = event.target.dataset.phntmDesc;
    const selectedWhsCode = event.target.dataset.whsCode;

    setSelectedBranch(event.target.value);
    console.log(event.target.value); // Selected branch
    console.log(selectedBranchCode, selectedPhntmCd, selectedPhntmDesc, selectedWhsCode); // Log additional values

    // Store values in sessionStorage
    sessionStorage.setItem('BranchCode', selectedBranchCode);
    sessionStorage.setItem('PhntmCd', selectedPhntmCd);
    sessionStorage.setItem('PhntmDesc', selectedPhntmDesc);
    sessionStorage.setItem('WhsCode', selectedWhsCode);
  };

  const handleNextClick = () => {
    if (selectedBranch) {
      sessionStorage.setItem('SelectedBranch', selectedBranch); // Save selected branch to sessionStorage
      console.log('Branch saved to session storage:', selectedBranch);
      navigate('/main-nav');
    } else {
      alert('Please select a branch before proceeding.');
    }
  };

  return (
    <div className="container branch-selection my-5">
      <h2 className="text-center mb-4">Select a Branch</h2>
      {loading ? (
        <p className="text-center">Loading branches...</p>
      ) : error ? (
        <p className="text-danger text-center">Error: {error}</p>
      ) : (
        <form>
          <div className="form-group">
            <div id="row" className="row">
              {branches.map((branch, index) => (
                <div className="col-md-12 mb-3" key={index}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="branch"
                      id={`branch-${index}`}
                      data-branch-code={branch.BranchCode}
                      data-phntm-cd={branch.PhntmCd}
                      data-phntm-desc={branch.PhntmDesc}
                      data-whs-code={branch.WhsCode}
                      value={branch.Branch}
                      required
                      checked={selectedBranch === branch.Branch}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`branch-${index}`}>
                      {branch.Branch} ({branch.BranchCode}) {/* Display the branch name and code */}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      )}

      {/* Round "Next" button with FontAwesome icon */}
      <button
        className="btn btn-primary rounded-circle position-fixed"
        onClick={handleNextClick}
        style={{
          bottom: '20px',
          right: '20px',
          width: '60px',  // Make the button a square
          height: '60px', // Equal width and height for round shape
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', // Center the icon
          fontSize: '24px', // Increase the icon size
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for a 3D effect
        }}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Branch;
