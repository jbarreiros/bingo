import React from 'react';
import { useSelector } from 'react-redux';
import { selectAppName } from './app/appSlice';
import { Counter } from './features/counter/Counter';
import { BingoCard } from './features/bingocard/BingoCard';
import { TabContainer } from './features/tabcontainer/TabContainer';
import { Tabs } from './features/tabs/Tabs';
import { TabItem } from './features/tabs/TabItem';
import { OpponentsBadge } from './features/opponentsbadge/OpponentsBadge';
import './App.css';

function App() {
  const appName = useSelector(selectAppName);

  return (
    <div className="App">
      {/*<header className="App-header">
        <Counter />
      </header>*/}

      <div className="page-wrapper">
        <header className="page-header">
          <Tabs>
            <TabItem name="card" label="My Card"/>
            <TabItem name="opponents" label="Opponents">
              <OpponentsBadge/>
            </TabItem>
          </Tabs>
          {/*<BingoPlayer/>*/}
        </header>
        <TabContainer name="card">
          <BingoCard/>
        </TabContainer>
        <TabContainer key="opponents">
          {/*<Opponents/>*/}
        </TabContainer>

        <footer className="page-footer">
          <p>&#10803;</p>
          <p>{appName} is fictional and does not depict anything real or imagined.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
