import { FC, useState } from "react";
import "./IconGallery.css";
import { Image, getIconSrc } from "./Image";
import { debounce } from "lodash";
interface IconProps {
  id: string;
  name: string;
  filename: string;
  parent: string;
  editor: string;
}

export interface IconGalleryProps {
  onSelected: (index: number) => void;
  icons: IconProps[];
}

export const IconGallery: FC<IconGalleryProps> = (props) => {
  const [visibleIcons, setVisibleIcons] = useState<IconProps[]>(props.icons);

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toLocaleLowerCase();
    // search for `search` in props.icons as icon.name
    const filteredIcons = props.icons.filter((icon) =>
      icon.name.toLocaleLowerCase().includes(search)
    );
    setVisibleIcons(filteredIcons);
  };

  return (
    <div className="me_container">
      <h1>Icony</h1>
      <div className="me_search">
        <label className="form-label">
          Search
          <input
            type="text"
            id="inputPassword5"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            placeholder="Search for icon"
            onChange={debounce(handleOnSearch, 200)}
          />
        </label>
      </div>
      <div className="me_galery">
        {visibleIcons.map((icon, index) => (
          <button
            type="button"
            className="me_iconItem btn btn-light"
            key={index}
            style={{ height: "10rem", width: "5rem" }}
            onClick={() => props.onSelected(index)}
          >
            <div className="card" style={{ width: "100%", height: "100%" }}>
              <Image
                src={getIconSrc(icon)}
                alt={icon.name}
                className="me_icon card-img-top"
              />
              <div className="card-body" style={{padding: 8}}>
                {/* <h5 className="card-title">Card title</h5> */}
                <p className="card-text">
                  {/* <div className="row"> */}
                    <div className="text-truncate" style={{whiteSpace: "normal"}}>{icon.name}</div>
                  {/* </div> */}
                </p>
                {/* <a href="#" className="btn btn-primary">
                    Go somewhere
                    </a> */}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
