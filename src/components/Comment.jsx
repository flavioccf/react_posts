import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";
import { Trash, ThumbsUp } from "@phosphor-icons/react";

export function Comment() {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
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
            <button title="Delete Commnent">
              <Trash size={24} />
            </button>
          </header>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ex
            consequatur ipsam non expedita deserunt, perferendis voluptates eius
            nostrum, culpa sit eveniet incidunt recusandae vitae cupiditate
            quaerat aperiam illo. Animi!
          </p>
        </div>
        <footer>
          <button>
            <ThumbsUp size={20} /> Like <span>03</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
