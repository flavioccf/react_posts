import PropTypes from "prop-types";
import styles from "./Post.module.css";
import { format, formatDistanceToNow } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { useState } from "react";

export function Post({ author, content, publishedAt = Date.now() }) {
  const [comments, setComments] = useState([
    {
      id: new Date().valueOf(), // Just a simple id creation
      content: "Nice post eh!",
    },
  ]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(publishedAt, "MMM do hh:mm a", {
    locale: enUS,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: enUS,
    addSuffix: true,
  });

  function handleCreateNewComment(e) {
    e.preventDefault();
    setComments([
      ...comments,
      {
        id: new Date().valueOf(),
        content: newCommentText,
      },
    ]);
    setNewCommentText("");
  }

  function handleNewCommentChange(e) {
    e.target.setCustomValidity("");
    setNewCommentText(e.target.value);
  }

  function handleNewCommentInvalid(e) {
    e.target.setCustomValidity("This is a mandatory field");
  }

  function deleteComment(commentId) {
    const commentsWithoutDeletedOne = comments.filter(
      (c) => c.id !== commentId
    );
    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = !newCommentText.length;

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
        {content.map((item) => {
          if (item.type === "paragraph")
            return <p key={item.content}>{item.content}</p>;
          if (item.type === "link")
            return (
              <p key={item.content}>
                <a href="#">{item.content}</a>
              </p>
            );
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Leave your comment</strong>
        <textarea
          name="comment"
          placeholder="Leave your comment"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Publish
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            content={comment.content}
            onDeleteComment={deleteComment}
          />
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
