const TicketDetails =({ ticket })=> {
  if (!ticket) return null;
  return (
    <div className="card">
      <div className="card-header">
        <h3>Ticket Details</h3>
        {ticket.status && (
          <span className={`status ${ticket.status.toLowerCase()}`}>{ticket.status}</span>
        )}
      </div>
      <div className="card-body">
        <div className="ticket-meta">
          <div>
            <strong>Subject</strong>
            <p>{ticket.subject || "No subject"}</p>
          </div>
          <div>
            <strong>Priority</strong>
            <p>{ticket.priority || "Normal"}</p>
          </div>
        </div>
        <div className="ticket-description">
          <strong>Description</strong>
          <p>
            {ticket.description?.length > 150
              ? ticket.description.substring(0, 147) + "..."
              : ticket.description || "No description available"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;