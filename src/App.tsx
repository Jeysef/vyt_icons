import React, { useEffect, useState } from "react";
import "./App.css";
import { IconGallery } from "./iconGallery";
import { Image, getIconSrc } from "./Image";

interface IUsedIcon {
  id: number;
  name: string;
  src: string;
}
export interface IconProps {
    id: string;
    name: string;
    filename: string;
    parent: string;
    editor: string;
  }

function App() {
  const iconsCount = 4;
  const iconsRef = [...Array(iconsCount)].map((_, index) =>
    React.createRef<HTMLButtonElement>()
  );
  const svgIconAdd = (
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-32 w-32"
      style={{ color: "rgb(0, 0, 0)" }}
    >
      <path
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75Z"
        fill="currentColor"
        fill-opacity="1"
      ></path>
    </svg>
  );
  const [open, setOpen] = useState(false);
  const [openedWith, setOpenedWith] = useState(NaN);
  const [usedIcons, setusedIcons] = useState<IUsedIcon[] | undefined[]>(
    [...Array(iconsCount)].map((_, index) => undefined)
  );
  const iconData = React.useRef<IconProps[]>([]);

  useEffect(() => {
    fetch("http://82.142.87.102/extAPI/api/icon/read.php?parent=2")
      .then((response) => response.json())
      .then((json) => {
        iconData.current = json as IconProps[];
      });
  }, []);

  const handleOnSelectedIcon = (index: number) => {
    console.log(index);
    const icon = iconData.current[index];
    iconsRef[openedWith].current?.setAttribute("data-id", icon.id);
    console.log(iconsRef[openedWith].current?.getAttribute("data-id"));
    setusedIcons((prev) => {
      prev[openedWith] = {
        id: index,
        name: icon.name,
        src: getIconSrc(icon),
      };
      return prev;
    });
    setOpen(false);
  };
  const handleOnOpen = (index: number) => {
    setOpenedWith(index);
    setOpen(true);
  };
  const getSelectIcon = (index: number) => {
    const icon = usedIcons[index];
    if (!icon) {
      return svgIconAdd;
    }
    return <Image src={icon.src} alt={icon.name} className="me_selectedIcon" />;
  };

  return (
    <div className="App">
      <div className="me_container">
        <h1>Icony</h1>
        <div className="me_row">
          {[...Array(iconsCount)].map((_, index) => (
            <button
              type="button"
              className="me_iconItem btn btn-light"
              key={index}
              ref={iconsRef[index]}
              onClick={() => handleOnOpen(index)}
            >
              {getSelectIcon(index)}
            </button>
          ))}
        </div>
      </div>
      {open && (
        <IconGallery
          icons={iconData.current}
          onSelected={handleOnSelectedIcon}
        />
      )}
    </div>
  );
}

export default App;
