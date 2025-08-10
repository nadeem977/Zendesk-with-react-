const  CustomerProfile =({ user, error })=> {
  return (
    <div className="card">
      <div className="card-header"><h3>Customer Profile</h3></div>
      <div className="card-body">
        {user ? (
          <>
            <div className="customer-profile">
              <img src={user.avatar} alt={user.name} className="avatar" />
              <div>
                <h4>{user.name}</h4>
                <p>{user.email}</p>
              </div>
            </div>
            {error && <div className="error-notice">{error}</div>}
            <div className="detail-grid">
              <div className="detail-item">
                <strong>Company</strong>
                <p>{user.company?.name || "Unknown"}</p>
              </div>
              <div className="detail-item">
                <strong>Location</strong>
                <p>{user.address?.city || "Unknown"}</p>
              </div>
              <div className="detail-item">
                <strong>Website</strong>
                <p>
                  {user.website ? (
                    <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                      {user.website}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p>Customer not found.</p>
        )}
      </div>
    </div>
  );
}

export default CustomerProfile;