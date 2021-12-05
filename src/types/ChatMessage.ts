export type ChatMessage = {
  // eslint-disable-next-line
    chat_id: 'number',
    time: 'string',
    type: 'string',
    // eslint-disable-next-line
    user_id: 'string',
    content: 'string',
    file?: {
        id: 'number',
        // eslint-disable-next-line
        user_id: 'number',
        path: 'string',
        filename: 'string',
        // eslint-disable-next-line
        content_type: 'string',
        // eslint-disable-next-line
        content_size: 'number',
        // eslint-disable-next-line
        upload_date: 'string',
    }
}
