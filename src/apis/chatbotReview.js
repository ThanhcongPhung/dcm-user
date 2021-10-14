export async function getUerSays() {
  return {
    data: {
      status: 1,
      result: {
        metadata: { total: 3 },
        usersays: [
          {
            id: '63ae13c0-0928-4cf1-90fd-25b87155d1d2',
            usersay: 'Hi',
            botIntent: 'Hỏi thăm sức khỏe',
            editIntent: 'Chào hỏi',
            status: true,
            comment: 'Cách hỏi này chưa phù hợp',
          },
          {
            id: '6092bf08772364402a63d8c6',
            usersay: 'BTC có tuyển ctv cho chương trình không ạ',
            botIntent: 'Đăng kí CTV',
            status: false,
            comment: 'Những câu như này bạn không nên hỏi như thế này',
          },
          {
            id: '3',
            usersay: 'Em muốn hỏi cách đăng kí làm ctv cho cuộc thi này ad ạ',
            botIntent: 'Đăng kí CTV',
            status: false,
          },
        ],
      },
    },
  };
}
