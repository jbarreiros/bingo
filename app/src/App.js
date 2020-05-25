import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAppName, setCurrentPlayerTiles } from './app/appSlice';
// import { Counter } from './features/counter/Counter';
import { BingoCard } from './features/bingocard/BingoCard';
import { TabContainer } from './features/tabcontainer/TabContainer';
import { Tabs } from './features/tabs/Tabs';
import { TabItem } from './features/tabs/TabItem';
import { OpponentsBadge } from './features/opponentsbadge/OpponentsBadge';
import { CurrentPlayer } from './features/currentplayer/CurrentPlayer';
import { Opponents } from './features/opponents/Opponents';
import { RegisterModal } from './features/registermodal/RegisterModal';
import './App.css';

function App(props) {
  const dispatch = useDispatch();
  const appName = useSelector(selectAppName);

  dispatch(setCurrentPlayerTiles(props.playerTiles));

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
          <CurrentPlayer/>
        </header>

        <TabContainer name="card">
          <BingoCard/>
        </TabContainer>

        <TabContainer name="opponents">
          <Opponents/>
        </TabContainer>

        <footer className="page-footer">
          <p>&#10803;</p>
          <p>{appName} is fictional and does not depict anything real or imagined.</p>
        </footer>
      </div>

      <RegisterModal/>
    </div>
  );
}

export default App;
