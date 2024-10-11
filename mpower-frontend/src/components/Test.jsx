import React from 'react';
const Test = () => {
  return (
    <div className="container">
    <h1 className="text-center mb-4">Bootstrap Grid Example</h1>
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Column 1</h5>
            <p className="card-text">Content for column 1.</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Column 2</h5>
            <p className="card-text">Content for column 2.</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Column 3</h5>
            <p className="card-text">Content for column 3.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Test;
