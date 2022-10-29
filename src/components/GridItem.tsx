import { GridItemType } from "../types/GridItemType";
import b7Svg from '../svgs/b7.svg';
import { items } from "../data/items";

interface Props {
    item: GridItemType;
    onClick: () => void;
}


export const GridItem = ({ item, onClick }: Props) => {

    const showBackground = item.permanetShown || item.shown;

    return (
        <div className={`${showBackground ? 'bg-[#1550FF]' : 'bg-[#E2E3E3]'}
            h-24 rounded-2xl flex justify-center items-center cursor-pointer
        `}
            onClick={onClick}
        >
            {item.permanetShown === false && item.shown === false &&
                <img className={`w-10 h-40 ${'opacity-10' ?? 1}`}
                    src={b7Svg}
                    alt=""
                />
            }
            {(item.permanetShown || item.shown) && item.item !== null &&
                <img className="w-10 h-10"
                    src={items[item.item].icon}
                    alt=""
                />
            }
        </div>
    )
}