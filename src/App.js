import './App.css';
import About from './Components/About';
import Bottom from './Components/Bottom';
import Top from './Components/Top';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import Menu from './Components/Menu';

function App() {
  return (
    <Container className="App">
      
      <Top></Top>
      <Menu></Menu>
      <Bottom></Bottom>

    </Container>
  );
}

export default App;
