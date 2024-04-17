import { ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

export function Avatar({
  src = "https://github.com/flavioccf.png",
  hasBorder = true,
  alt = 'Flavio Carvalho',
  ...props
}: AvatarProps) {
  return (
    <img
      className={hasBorder ? styles.avatar : styles.avatarWithoutBorder}
      src={src}
      alt={alt}
      {...props}
    />
  );
}
