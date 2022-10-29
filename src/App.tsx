import logoImg from './assets/devmemory_logo.png';
import restartIcon from './svgs/restart.svg';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { useEffect, useState } from 'react';
import { GridItemType } from './types/GridItemType';
import { items } from './data/items';
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/FormatTimeElapsed';

export const App = () => {

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setshownCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => { resetAndCreateGrid(); }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer)
  }, [playing, timeElapsed]);

  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      if (opened.length === 2) {

        if (opened[0].item === opened[1].item) {
          let tempGrid = [...gridItems];

          for (let i in tempGrid) {

            if (tempGrid[i].shown) {
              tempGrid[i].permanetShown = true;
              tempGrid[i].shown = false;
            }
          }
          setGridItems(tempGrid);
          setshownCount(0);
        } else {
          setTimeout(() => {
            let tempGrid = [...gridItems];

            for (let i in tempGrid) {
              tempGrid[i].shown = false;
            }
            setGridItems(tempGrid);
            setshownCount(0);
          }, 1000)
        }


        setMoveCount(moveCount => moveCount + 1);
      }
    }
  }, [shownCount, gridItems])

  useEffect(() => {
    if (moveCount > 0 && gridItems.every(item => item.permanetShown === true)) {
      setPlaying(false);
    }
  }, [moveCount, gridItems])

  const resetAndCreateGrid = () => {

    setTimeElapsed(0);
    setMoveCount(0);
    setshownCount(0);

    let tempGrid: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++) {
      tempGrid.push({
        item: null,
        shown: false,
        permanetShown: false
      });
    }

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tempGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tempGrid[pos].item = i;
      }
    }

    setGridItems(tempGrid)

    setPlaying(true);

  }

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tempGrid = [...gridItems]

      if (tempGrid[index].permanetShown === false && tempGrid[index].shown === false) {
        tempGrid[index].shown = true;
        setshownCount(shownCount + 1);
      }
      setGridItems(tempGrid);
    }
  }

  return (
    <div className='box-content max-w-3xl m-auto flex px-12 py-12 max-md:flex max-md:flex-col max-md:px-6 max-sm:px-3'>
      <div className='flex flex-col w-auto max-md:mb-12 items-center'>

        <a className='block' href="">
          <img src={logoImg} width={200} alt="" />
        </a>

        <div className='w-full my-2 max-md:flex justify-around items-center'>
          <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label='Movimentos' value={moveCount.toString()} />
        </div>

        <Button label='Reiniciar' icon={restartIcon} onClick={resetAndCreateGrid} />
      </div>

      <div className='flex flex-1 justify-end max-md:justify-center mx-5'>
        <div className='grid grid-cols-4 gap-2 w-[430px] max-sm:grid-cols-3 max-[375px]:grid-cols-2'>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}