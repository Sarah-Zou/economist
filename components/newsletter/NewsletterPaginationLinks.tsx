type NewsletterPaginationLinksProps = {
  prev?: string | null
  next?: string | null
}

/** Renders rel=prev/next link tags for newsletter pagination SEO. */
export default function NewsletterPaginationLinks({
  prev,
  next,
}: NewsletterPaginationLinksProps) {
  return (
    <>
      {prev ? <link rel="prev" href={prev} /> : null}
      {next ? <link rel="next" href={next} /> : null}
    </>
  )
}
