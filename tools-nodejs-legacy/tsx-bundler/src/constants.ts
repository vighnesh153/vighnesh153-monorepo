export const baseIframeHtmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Iframe html</title>
</head>
<body>
    <div id="root"></div>
    <script type="application/javascript">
        function handleError(error) {
          console.log(error.message);
          const errorMessage = error.message;
          document.body.innerHTML = \`
            <div style="color: red; padding: 1rem">
              \${errorMessage}
            </div>
          \`;
        }
    
        window.addEventListener("message", (e) => {
          try {
            eval(e.data);            
          } catch (e) {
            console.error(e);
            handleError(e);
          }
        })
    </script>
</body>
</html>
`;

export const starterCode = `
import React from "react@19";
import { createRoot } from 'react-dom@19/client';

import axios from "axios";

import sum from "lodash.sum";

function App() {
  const [users, setUsers] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(res => setUsers(res.data))
  }, []);

  return (
    <div>
      <h1>Pikachu supremacy ✌️ ϞϞ(๑⚈ ․̫ ⚈๑)∩ ⚡️⚡️</h1>
      <p>Sum(1, 3, 5, 7): <strong>{sum([1, 3, 5, 7])}</strong></p>
      <h2>Users</h2>
      <p>User count: {users?.length ?? 'Loading...'}</p>
      <ul>
        {users?.map((user) => (
           <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

const appRoot = createRoot(document.getElementById('root'));
appRoot.render(<App />);
`;
