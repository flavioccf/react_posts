import PropTypes from "prop-types";
import styles from "./Avatar.module.css";

export function Avatar({
  src = "https://github.com/flavioccf.png",
  hasBorder = true,
}) {
  return (
    <img
      className={hasBorder ? styles.avatar : styles.avatarWithoutBorder}
      src={src}
      alt="Flavio Carvalho"
    />
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  hasBorder: PropTypes.bool,
};
