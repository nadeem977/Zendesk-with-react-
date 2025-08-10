import { FiRefreshCw, FiCopy, FiRefreshCw as FiReload, FiRepeat } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import { useState } from "react";
import CustomSelect from "./CustomSelect";

const ReplyEditor =({ ticket, user, tone, setTone, reply, setReply, regenerate, refresh })=> {
  const [copied, setCopied] = useState(false);

  const generateReply = () => {
    if (!ticket || !user) return "";

    const greeting =
      tone === "friendly"
        ? `Hi ${user.name || "there"},\n\n`
        : `Dear ${user.name || "Customer"},\n\n`;

    const body =
      tone === "friendly"
        ? `Thank you for contacting us about "${
            ticket.subject || "your inquiry"
          }"${user.company ? ` from ${user.company.name}` : ""}${
            user.address?.city ? ` in ${user.address.city}` : ""
          }.\n\n` +
          `Here's how I can help:\n` +
          `1. First solution option\n` +
          `2. Alternative approach\n\n` +
          `Please let me know which option works best for you!`
        : `Regarding "${ticket.subject || "your inquiry"}":\n\n` +
          `Available solutions:\n` +
          `- Option 1\n` +
          `- Option 2\n\n` +
          `Please confirm your preference.`;

    return (
      greeting +
      body +
      `\n\nBest regards,\n${ticket.assignee?.user?.name || "Customer Support"}`
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reply || generateReply());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card">
      <div className="card-header" style={{ alignItems: "center" }}>
        <h3>Suggested Reply</h3>
        <CustomSelect
          options={["friendly", "concise"]}
          value={tone}
          onChange={setTone}
        />
      </div>
      <div className="card-body">
        <textarea
          className="reply-textarea"
          value={reply || generateReply()}
          onChange={(e) => setReply(e.target.value)}
          rows={6}
          placeholder="Type your reply here..."
        />
        <div className="action-buttons">
          <button className="btn primary" onClick={regenerate} title="Regenerate reply">
            <FiRepeat size={18} /> Regenerate
          </button>
          <button className="btn secondary" onClick={handleCopy} title="Copy reply">
            {copied ? <><AiOutlineCheck /> Copied</> : <><FiCopy /> Copy Reply</>}
          </button>
          <button className="btn secondary" onClick={refresh} title="Refresh data">
            <FiRefreshCw size={18} /> Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}


export default ReplyEditor;