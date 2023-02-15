import { IconProps } from "./App";

export interface IImageProps  extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
}

export const Image: React.FC<IImageProps> = (props) => {
    return (
        <img {...props} alt={props.alt} />
    );
};

export const getIconSrc = (icon: IconProps) => {
    return `https://eletak.oresi.cz/files/Icons/CZ/${icon.filename}`;
}