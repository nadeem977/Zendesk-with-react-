import { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import "./index.css";
import CustomerProfile from "./components/CustomerProfile";
import ReplyEditor from "./components/ReplyEditor";
import TicketDetails from "./components/TicketDetails";
import PostsList from "./components/PostsList";

const FALLBACK_USER = {
  id: 1,
  name: "Ticket Requester",
  email: "",
  phone: "",
  company: { name: "Customer" },
  address: { city: "Unknown" },
};

const LOCAL_DUMMY_USER = {
  id: 999,
  name: "Dummy User",
  email: "dummy.user@example.com",
  phone: "123-456-7890",
  company: { name: "Dummy Corp" },
  address: { city: "Dummy City" },
};

const getAvatar = (email, name) => {
  try {
    const initials = name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
      : "CU";
    return `https://ui-avatars.com/api/?name=${initials}&background=0376ba&color=fff&size=150`;
  } catch {
    return `https://ui-avatars.com/api/?name=CU&background=0376ba&color=fff&size=150`;
  }
};

const safeFetch = async (url, options = {}) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000); // 7s timeout
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error(`Fetch failed for ${url}:`, err);
    throw err;
  }
};

export default function App() {
  const [ticket, setTicket] = useState(null);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tone, setTone] = useState("friendly");

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const client = window.ZAFClient.init();
      client.invoke("resize", { width: "100%", height: "650px" });
      const ticketData = await client.get([
        "ticket.requester.email",
        "ticket.subject",
        "ticket.description",
        "ticket.assignee.user.name",
        "ticket.status",
        "ticket.priority",
      ]);

      const ticketInfo = {
        requester: {
          email: ticketData["ticket.requester.email"],
        },
        subject: ticketData["ticket.subject"],
        description: ticketData["ticket.description"],
        assignee: {
          user: {
            name: ticketData["ticket.assignee.user.name"],
          },
        },
        status: ticketData["ticket.status"],
        priority: ticketData["ticket.priority"],
      };

      setTicket(ticketInfo);

      const requesterEmail = ticketInfo.requester.email || "";

      const fallbackUser = {
        ...FALLBACK_USER,
        name: requesterEmail.split("@")[0] || "Customer",
        email: requesterEmail,
        avatar: getAvatar(requesterEmail, requesterEmail.split("@")[0]),
      };

      let users = [];
      try {
        users = await safeFetch(
          `https://jsonplaceholder.typicode.com/users?email=${requesterEmail}`
        );
      } catch (fetchErr) {
        // If fetch fails, use dummy local user instead of breaking
        setError(
          "Could not fetch user data from server. Using fallback user info."
        );
        setUser({
          ...LOCAL_DUMMY_USER,
          avatar: getAvatar(LOCAL_DUMMY_USER.email, LOCAL_DUMMY_USER.name),
        });
        setPosts([]);
        setLoading(false);
        return;
      }

      if (!users.length) {
        setUser(fallbackUser);
        setPosts([]);
        setError("Customer not found.");
        setLoading(false);
        return;
      }

      const apiUser = users[0];
      setUser({ ...apiUser, avatar: getAvatar(apiUser.email, apiUser.name) });

      // Fetch posts
      let postsData = [];
      try {
        postsData = await safeFetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${apiUser.id}&_limit=3`
        );
      } catch {
        postsData = [];
        // optionally set error for posts fetch failure
      }
      setPosts(postsData);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      setUser(null);
      setPosts([]);
    } finally {
      setLoading(false);
      setReply("");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="app-container">
      <CustomerProfile user={user} error={error} />
      <TicketDetails ticket={ticket} />
      <PostsList posts={posts} />
      <ReplyEditor
        ticket={ticket}
        user={user}
        tone={tone}
        setTone={setTone}
        reply={reply}
        setReply={setReply}
        regenerate={() => setReply("")}
        refresh={loadData}
      />
    </div>
  );
}
