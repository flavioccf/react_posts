import PropTypes from "prop-types";
import styles from "./Post.module.css";
import { format, formatDistanceToNow } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { useState } from "react";

export function Post({ author, content, publishedAt = Date.now() }) {
  const [comments, setComments] = useState([1, 2]);

  const publishedDateFormatted = format(publishedAt, "MMM do hh:mm a", {
    locale: enUS,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: enUS,
    addSuffix: true,
  });

  function handleCreateNewComment() {
    event.preventDefault();

    setComments([...comments, comments.length + 1]);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((item, index) => {
          if (item.type === "paragraph")
            return <p key={index}>{item.content}</p>;
          if (item.type === "link")
            return (
              <p key={index}>
                <a href="#">{item.content}</a>
              </p>
            );
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Leave your comment</strong>
        <textarea placeholder="Leave your comment" />
        <footer>
          <button type="submit">Publish</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment key={comment} />
        ))}
      </div>
    </article>
  );
}

Post.propTypes = {
  author: PropTypes.object.isRequired,
  content: PropTypes.array.isRequired,
  publishedAt: PropTypes.instanceOf(Date),
};
