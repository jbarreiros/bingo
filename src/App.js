import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAppName } from './app/appSlice';
import { Counter } from './features/counter/Counter';
import { BingoCard } from './features/bingocard/BingoCard';
import './App.css';

function App() {
  const appName = useSelector(selectAppName);

  return (
    <div className="App">
      <header className="App-header">
        <Counter />
      </header>

      <div className="page-wrapper">
        <header className="page-header">
          {/*<Tabs>
            <TabItem key="card" label="My Card"/>
            <TabItem key="opponents" label="Opponents">
              <OpponentsBadge/>
            </TabItem>
          </Tabs>
          <BingoPlayer/>*/}
        </header>
        {/*<TabContainer key="card">*/}
          <BingoCard/>
        {/*</TabContainer>*/}
        {/*<TabContainer key="opponents">
          <Opponents/>
        </TabContainer>*/}

        <footer className="page-footer">
          <p>&#10803;</p>
          <p>{appName} is fictional and does not depict anything real or imagined.</p>
        </footer>      
      </div>
    </div>
  );
}

export default App;
