export enum TODO_STATUS {
    PREPARE = 0,
    PROCESS = 1,
    DONE = 2,
    HOLD = 3
}
export enum CRAWLER_COMMAND {
    REDIRECT = 'redirect',
    CLICK = 'click',
    WRITE = 'write',
    CURSOR = 'cursor'
}
export enum CRAWLER_STATUS {
    PREPARE, // 대기
    WAITING, // 중지
    RUNNING, // 실행중
    COMPLETE, // 완료
    FAILED // 실패
}
