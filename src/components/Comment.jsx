import PropTypes from "prop-types";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";
import { Trash, ThumbsUp } from "@phosphor-icons/react";
import { useState } from "react";

export function Comment({ id, content, onDeleteComment }) {
  const [likeCount, setLikeCount] = useState(0);

  const oneHourAgo = Date.now() - 60 * 60 * 1000;

  function handleDeleteComment() {
    onDeleteComment(id);
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Flavio Carvalho</strong>
              <time title={new Date(oneHourAgo)} dateTime={oneHourAgo}>
                Published 1h ago
              </time>
            </div>
            <button title="Delete Commnent" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} /> Like <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};
