import { simpleCodeToHtml } from "./index.ts";

test("integration", () => {
  const html = simpleCodeToHtml(`
import React from "react";
import ReactDOM from "react-dom";

// pikachu is the best
import { isPrime } from "@vighnesh153/utils@0.4.4/dist/main.js";

function App() {
  return (
    <div>
      <h1>Hi world from my React application.</h1>
    </div>
  );
};

const appRoot = document.getElementById("root");
ReactDOM.render(<App />, appRoot);
`);

  expect(html).toBe(
    // eslint-disable-next-line max-len
    '<br><span class="code-reserved-word">import</span> React <span class="code-reserved-word">from</span> <span class="code-string">"react"</span><span class="code-operator">;</span><br><span class="code-reserved-word">import</span> ReactDOM <span class="code-reserved-word">from</span> <span class="code-string">"react-dom"</span><span class="code-operator">;</span><br><br><span class="code-comment">// pikachu is the best<br></span><span class="code-reserved-word">import</span> <span class="code-operator">{</span> isPrime <span class="code-operator">}</span> <span class="code-reserved-word">from</span> <span class="code-string">"@vighnesh153/utils@0.4.4/dist/main.js"</span><span class="code-operator">;</span><br><br><span class="code-reserved-word">function</span> App<span class="code-operator">()</span> <span class="code-operator">{</span><br>  <span class="code-reserved-word">return</span> <span class="code-operator">(</span><br>    <span class="code-operator">&lt;</span>div<span class="code-operator">&gt;</span><br>      <span class="code-operator">&lt;</span>h1<span class="code-operator">&gt;</span>Hi world <span class="code-reserved-word">from</span> my React application<span class="code-operator">.&lt;/</span>h1<span class="code-operator">&gt;</span><br>    <span class="code-operator">&lt;/</span>div<span class="code-operator">&gt;</span><br>  <span class="code-operator">);</span><br><span class="code-operator">};</span><br><br><span class="code-reserved-word">const</span> appRoot <span class="code-operator">=</span> <span class="code-reserved-word">do</span>cument<span class="code-operator">.</span><span class="code-reserved-word">get</span>ElementById<span class="code-operator">(</span><span class="code-string">"root"</span><span class="code-operator">);</span><br>ReactDOM<span class="code-operator">.</span>render<span class="code-operator">(&lt;</span>App <span class="code-operator">/&gt;,</span> appRoot<span class="code-operator">);</span><br>',
  );
});
