"use client";
import { useState } from "react";

const apiData = {
  "JavaScript Fetch API": [
    {
      name: "Basic GET Request",
      desc: "Simple fetch to retrieve data",
      code: `fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,
    },
    {
      name: "GET with Headers",
      desc: "Fetch with custom headers",
      code: `fetch('https://api.example.com/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  }
})
  .then(response => response.json())
  .then(data => console.log(data));`,
    },
    {
      name: "POST Request",
      desc: "Send data to server",
      code: `fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log('Created:', data));`,
    },
    {
      name: "PUT Request",
      desc: "Update existing resource",
      code: `fetch('https://api.example.com/users/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Jane Doe',
    email: 'jane@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log('Updated:', data));`,
    },
    {
      name: "PATCH Request",
      desc: "Partial update of resource",
      code: `fetch('https://api.example.com/users/123', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'newemail@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log('Patched:', data));`,
    },
    {
      name: "DELETE Request",
      desc: "Delete a resource",
      code: `fetch('https://api.example.com/users/123', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
})
  .then(response => {
    if (response.ok) {
      console.log('Deleted successfully');
    }
  });`,
    },
    {
      name: "Async/Await Pattern",
      desc: "Modern async/await syntax",
      code: `async function fetchUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchUsers();`,
    },
    {
      name: "Multiple Requests (Promise.all)",
      desc: "Make multiple API calls in parallel",
      code: `async function fetchMultiple() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('https://api.example.com/users').then(r => r.json()),
      fetch('https://api.example.com/posts').then(r => r.json()),
      fetch('https://api.example.com/comments').then(r => r.json())
    ]);
    
    console.log({ users, posts, comments });
  } catch (error) {
    console.error('Error:', error);
  }
}`,
    },
    {
      name: "FormData Upload",
      desc: "Upload files using FormData",
      code: `const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('name', 'Upload Name');

fetch('https://api.example.com/upload', {
  method: 'POST',
  body: formData
})
  .then(response => response.json())
  .then(data => console.log('Uploaded:', data));`,
    },
    {
      name: "Abort Controller",
      desc: "Cancel fetch requests",
      code: `const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/users', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    }
  });

// Cancel the request
setTimeout(() => controller.abort(), 1000);`,
    },
  ],
  "React API Patterns": [
    {
      name: "useEffect with Fetch",
      desc: "Fetch data on component mount",
      code: `import { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}`,
    },
    {
      name: "Custom useFetch Hook",
      desc: "Reusable fetch hook",
      code: `import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
function App() {
  const { data, loading, error } = useFetch('/api/users');
  // ... render logic
}`,
    },
    {
      name: "POST with useState",
      desc: "Submit form data to API",
      code: `import { useState } from 'react';

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      
      if (!response.ok) throw new Error('Failed to create');
      
      const user = await response.json();
      console.log('Created:', user);
      
      // Reset form
      setName('');
      setEmail('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}`,
    },
    {
      name: "Cleanup with AbortController",
      desc: "Prevent memory leaks when component unmounts",
      code: `import { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/users', { signal: controller.signal })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      });

    // Cleanup: abort fetch if component unmounts
    return () => controller.abort();
  }, []);

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
    },
    {
      name: "React Query Pattern",
      desc: "Modern data fetching pattern (conceptual)",
      code: `// Install: npm install @tanstack/react-query
import { useQuery, useMutation } from '@tanstack/react-query';

// Fetch users
function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json())
  });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error.message;

  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// Create user with mutation
function CreateUser() {
  const mutation = useMutation({
    mutationFn: (newUser) => 
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      }).then(r => r.json())
  });

  return (
    <button onClick={() => mutation.mutate({ name: 'John' })}>
      Create User
    </button>
  );
}`,
    },
    {
      name: "SWR Pattern",
      desc: "Stale-While-Revalidate strategy",
      code: `// Install: npm install swr
import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

function Users() {
  const { data, error, isLoading } = useSWR('/api/users', fetcher, {
    refreshInterval: 3000 // Poll every 3s
  });

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}`,
    },
  ],
  "Axios Library": [
    {
      name: "Basic GET",
      desc: "Axios GET request",
      code: `// Install: npm install axios
import axios from 'axios';

axios.get('https://api.example.com/users')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`,
    },
    {
      name: "POST Request",
      desc: "Axios POST with data",
      code: `import axios from 'axios';

axios.post('https://api.example.com/users', {
  name: 'John Doe',
  email: 'john@example.com'
})
  .then(response => console.log('Created:', response.data))
  .catch(error => console.error(error));`,
    },
    {
      name: "Axios Instance",
      desc: "Create reusable axios instance with defaults",
      code: `import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});

// Use the instance
api.get('/users').then(res => console.log(res.data));
api.post('/users', { name: 'Jane' });`,
    },
    {
      name: "Axios Interceptors",
      desc: "Add request/response interceptors",
      code: `import axios from 'axios';

// Request interceptor
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + getToken();
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);`,
    },
    {
      name: "Concurrent Requests",
      desc: "Multiple requests with axios.all",
      code: `import axios from 'axios';

Promise.all([
  axios.get('/api/users'),
  axios.get('/api/posts'),
  axios.get('/api/comments')
])
  .then(([users, posts, comments]) => {
    console.log(users.data, posts.data, comments.data);
  })
  .catch(error => console.error(error));`,
    },
  ],
  GraphQL: [
    {
      name: "Basic GraphQL Query",
      desc: "Fetch data with GraphQL",
      code: `const query = \`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
\`;

fetch('https://api.example.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
})
  .then(res => res.json())
  .then(data => console.log(data.data.users));`,
    },
    {
      name: "GraphQL Mutation",
      desc: "Create/update data with mutation",
      code: `const mutation = \`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
\`;

const variables = {
  name: 'John Doe',
  email: 'john@example.com'
};

fetch('https://api.example.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: mutation, variables })
})
  .then(res => res.json())
  .then(data => console.log(data.data.createUser));`,
    },
    {
      name: "Apollo Client (React)",
      desc: "GraphQL client for React",
      code: `// Install: npm install @apollo/client graphql
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache()
});

const GET_USERS = gql\`
  query GetUsers {
    users {
      id
      name
    }
  }
\`;

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}`,
    },
  ],
  "WebSocket / Real-time": [
    {
      name: "WebSocket Connection",
      desc: "Real-time bidirectional communication",
      code: `const socket = new WebSocket('wss://api.example.com/socket');

socket.addEventListener('open', (event) => {
  console.log('Connected to WebSocket');
  socket.send('Hello Server!');
});

socket.addEventListener('message', (event) => {
  console.log('Message from server:', event.data);
});

socket.addEventListener('close', (event) => {
  console.log('Disconnected from WebSocket');
});

socket.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});`,
    },
    {
      name: "Socket.IO (React)",
      desc: "Real-time events with Socket.IO",
      code: `// Install: npm install socket.io-client
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = (text) => {
    socket?.emit('message', text);
  };

  return (
    <div>
      {messages.map((msg, i) => <div key={i}>{msg}</div>)}
      <button onClick={() => sendMessage('Hello!')}>Send</button>
    </div>
  );
}`,
    },
    {
      name: "Server-Sent Events (SSE)",
      desc: "One-way server push events",
      code: `const eventSource = new EventSource('https://api.example.com/events');

eventSource.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('New message:', data);
});

eventSource.addEventListener('error', (error) => {
  console.error('SSE error:', error);
  eventSource.close();
});

// Close connection
// eventSource.close();`,
    },
  ],
};

export default function APIPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Object.keys(apiData);

  const filteredData = Object.entries(apiData).reduce(
    (acc, [category, methods]) => {
      const filtered = methods.filter(
        (method) =>
          method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          method.desc.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    },
    {} as Record<string, typeof apiData["JavaScript Fetch API"]>,
  );

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>🌐 API Call Methods</h1>
      <p>
        Complete guide to making API calls in JavaScript and React - from basic
        fetch to advanced patterns
      </p>

      <input
        type="text"
        placeholder="Search API methods..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          fontSize: "16px",
          border: "2px solid #eaeaea",
          borderRadius: "8px",
        }}
      />

      <div style={{ marginBottom: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setActiveCategory(activeCategory === cat ? null : cat)
            }
            style={{
              padding: "8px 16px",
              marginRight: "10px",
              marginBottom: "10px",
              background: activeCategory === cat ? "#0070f3" : "#eaeaea",
              color: activeCategory === cat ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: activeCategory === cat ? "bold" : "normal",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {Object.entries(filteredData)
        .filter(([cat]) => !activeCategory || cat === activeCategory)
        .map(([category, methods]) => (
          <div key={category} style={{ marginBottom: "30px" }}>
            <h2
              style={{
                borderBottom: "2px solid #0070f3",
                paddingBottom: "10px",
              }}
            >
              {category}
            </h2>
            {methods.map((method) => (
              <div
                key={method.name}
                style={{
                  background: "#f9f9f9",
                  padding: "20px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  border: "1px solid #eaeaea",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", color: "#0070f3" }}>
                  {method.name}
                </h3>
                <p style={{ margin: "0 0 10px 0", color: "#666" }}>
                  {method.desc}
                </p>
                <pre
                  style={{
                    background: "#1e1e1e",
                    color: "#d4d4d4",
                    padding: "15px",
                    borderRadius: "5px",
                    overflow: "auto",
                    margin: 0,
                  }}
                >
                  <code>{method.code}</code>
                </pre>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
