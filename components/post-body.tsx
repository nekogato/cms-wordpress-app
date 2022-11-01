import styles from './post-body.module.css'

export default function PostBody({ content,post_content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post_content?.freetext }}
      />
    </div>
  )
}
