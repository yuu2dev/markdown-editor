export enum IPC_APP_CHANNEL {
    EXIT = 'app:exit',
    UPDATE_OVERLAY_VIDEOS = 'app:update-overlay-videos',
    INSTALL_UPDATE = 'app:install-update',
    AVAILABLE_UPDATE = 'app:available-update',
}
export enum IPC_SETTING_CHANNEL {
    LOAD_PASSCODE = 'setting:load-passcode',
    UPDATE_PASSCODE = 'setting:update-passcode',
    VERIFY_PASSCODE = 'setting:verify-passcode',
    ACTIVATE_PASSCODE = 'setting:activate-passcode',
    LOAD_OVERLAY_VIDEOS = 'setting:load-overlay-videos',
    UPDATE_OVERLOAY_VIDEO = 'setting:update-overlay-video',
}
export enum IPC_DIARY_CHANNEL {
    LOAD = 'diary:load',
    READ = 'diary:read',
    WRITE = 'diary:write',
    OPEN_DIR = 'diary:open-dir',
    WRITE_DIR = 'diary:write-dir',
    REMOVE = 'diary:remove',
    RENAME = 'diary:rename',
    MOVE = 'diary:move',
}
export enum IPC_TODO_CHANNEL {
    LOAD = 'todo:load',
    SAVE = 'todo:save',
    DELETE = 'todo:delete',
    LOAD_SPRINT = 'todo:load-sprint',
    DELETE_SPRINT = 'todo:delete-sprint',
}
export enum IPC_CRAWLER_CHANNEL {
    LOAD_WORKERS = 'crawler:load-workers',
    SAVE_WORKER = 'crawler:save-workers',
    LOAD_HISTORIES = 'crawler:load-histories',
    SCRAPING_SELECTOR = 'crawler:scraping-selector',
}
