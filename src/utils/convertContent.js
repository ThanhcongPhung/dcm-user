import sanitizeHtml from 'sanitize-html';

export function convertContent(content) {
  return {
    __html: sanitizeHtml(
      content.replace(
        /(\b(https?|):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi,
        "<a href='$1' style='color: #0000FF' target='_blank'>$1</a>",
      ),
    ),
  };
}
