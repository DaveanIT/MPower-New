import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faDeleteLeft, faLongArrowLeft, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../assets/static/css/tmp.css';

const Tmp3 = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Search Items</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      {/* Purchase Order Selection */}
      <div className="container-fluid mb-3">
        <div className="row">
          <div className="col-md-4">
            <select className="form-select purchase" aria-label="Select Purchase Order">
              <option selected>Purchase Order</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </div>
          <div className="col-md-8 text-end">
            <h6>Base Document</h6>
          </div>
        </div>
      </div>
      {/* Search Bar */}
      <div className="search-bar container-fluid d-flex justify-content-center mt-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <input type="text" className="form-control search-input" placeholder="Search..." />
          </div>
          <div className="col-md-1 d-flex justify-content-center">
            <button className="btn btn-primary btn-sm" style={{ width: '100px' }}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <div className="col-md-1 d-flex justify-content-center">
            <button className="btn btn-danger btn-sm" style={{ width: '100px' }}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content container mt-3 d-flex justify-content-center align-items-center" style={{ minHeight: '50vh', backgroundColor: '#f8f9fa', border: '1px solid #ddd', position: 'relative', overflow: 'hidden' }}>
        <img src="path_to_image" alt="background" style={{ opacity: 0.1, position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="content-text text-center">
          <h1 className="display-6">Search for Items</h1>
          <p className="lead">You can search, browse, and manage your purchase orders.</p>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="footer-nav">
        <a href="#" className="home-btn position-fixed" style={{ bottom: '20px', left: '20px', backgroundColor: '#007bff', color: 'white', borderRadius: '50%', padding: '10px', fontSize: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
          <FontAwesomeIcon icon={faLongArrowLeft} />
        </a>
        <a href="#" className="next-btn position-fixed" style={{ bottom: '20px', right: '20px', backgroundColor: '#007bff', color: 'white', borderRadius: '50%', padding: '10px', fontSize: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
    </div>
  );
}

export default Tmp3;
