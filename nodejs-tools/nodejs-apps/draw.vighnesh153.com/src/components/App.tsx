import { Canvas } from './Canvas';
import { Toolbar } from './Toolbar';
import { About } from './About';

export function App(): JSX.Element {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        padding: '0 1rem',
      }}
    >
      <About />
      <Toolbar />
      <Canvas />
    </div>
  );
}
