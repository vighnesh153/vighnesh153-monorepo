export const defaultHtml = `
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

export const defaultEditorCode = `import React from "react";
import ReactDOM from "react-dom";

import axios from "axios";

// Learn more about my library here:
// https://github.com/vighnesh153/vighnesh153-monorepo/tree/main/nodejs-tools/nodejs-packages/utils/src/utils
import { isPrime } from "@vighnesh153/utils@0.4.4/dist/main.js";

const is42Prime = isPrime(42).toString();
const is43Prime = isPrime(43).toString();

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
      <p>Is 42 Prime: <strong>{is42Prime}</strong></p>
      <p>Is 43 Prime: <strong>{is43Prime}</strong></p>
      <h2>Users</h2>
      <p>User count: {users?.length ?? 'Loading...'}</p>
    </div>
  );
};

const appRoot = document.getElementById("root");
ReactDOM.render(<App />, appRoot);
`;

export const namespaces = {
  root: 'tsx.vighnesh153.com',
};
